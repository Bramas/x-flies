
if (Meteor.isClient) {

//Iron.Location.configure({useHashPaths: true});
  /*Router.route('/', function () {
  this.response.end(React.renderToString(<App />));
}, {where: 'client'});Iron.Location.configure({
    linkSelector: "a[href][data-iron]"
  });*/

  // counter starts at 0
  Session.setDefault('path', '/Users/quentinbramas/Pictures');

  Meteor.startup(function () {
  });

}

  
var alias = {
  photos: '/Users/quentinbramas/Pictures',
  root: '/'
}
var defaultAlias = 'photos';



if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    //  React.render(<App />, document.getElementById("react-main"));
    //
  
  });

  Picker.route('/d/:alias/(.*)', function(params, req, res, next) {
    aliasKey = params.alias;
    path  = '/'+decodeURIComponent(params[0]);
    if(!alias[aliasKey])
    {
      console.log('alias not found: '+aliasKey);
      res.end('Alias \''+aliasKey+'\' does not exist');
      return;
    }
    console.log('serve: '+alias[aliasKey]+'/'+path);
    res.write(fs.readFileSync(alias[aliasKey]+path))
    res.end('');
  });

  Meteor.methods({
    list: function(path, fakePath)
    {
      Meteor._sleepForMs(1000);
      return FileManager.list(path, fakePath);
    }
  });


  fs = Npm.require('fs');


/*
  Router.route('/d/:alias/(.*)', function () {
    if(!alias[this.params.alias])
    {
      this.response.writeHead(404);
      this.response.end('Alias \''+this.params.alias+'\' does not exist');
      return;
    }
    //this.response.setHeader('X-Accel-Redirect', res.url.slice(4));
    this.response.write(fs.readFileSync(alias[this.params.alias]+'/'+this.params[0]))
    this.response.end('');
  }, {where: 'server'});*/
}




/*
FlowRouter.route('/d/:alias/(.*)', {
  action: function(params) {
  if(Meteor.isServer)
  {
    console.log('ok');
  }
  else{
    return;
  }

    aliasKey = params.alias;
    path  = '/'+params[0];
    if(!alias[aliasKey])
    {
      console.log('alias not found: '+aliasKey);
      throw new Error('Alias \''+aliasKey+'\' does not exist');
      return;
    }
    console.log(this);
    return;
    console.log('serve: '+alias[aliasKey]+'/'+path);
    this.response.write(fs.readFileSync(alias[aliasKey]+'/'+path))
    this.response.end('');
  }
});*/
FlowRouter.route('/cfs/(.*)', {
  action: function(params, o)
  {
    console.log('ignore cfs call');
  }
});


var appHistory = {};

function renderApp(url, files)
{
  return <App ref="app" files={files} url={url} />;
}
function action(params){
  if(!params.alias)
  {
    aliasKey = defaultAlias;
    path  = '/';
  }
  else
  {
    aliasKey = params.alias;
    path  = '/'+decodeURIComponent(params[0]);
  }
  if(!alias[aliasKey])
  {
    throw new Error('Alias \''+aliasKey+'\' does not exist');
    return;
  }
  console.log('render: '+aliasKey+' ('+alias[aliasKey]+') '+':'+path);
  
  if(Meteor.isServer)
  {
    f = FileManager.list(alias[aliasKey]+path, '/'+aliasKey+path);
    ReactLayout.render(MainLayout,  
        {
          content: function() {
            return <App ref="app" files={f} url={'/'+aliasKey+path} />
          }
        });
    return;
  }
  
  if(appHistory['/'+aliasKey+path])
  {
    ReactLayout.render(
        MainLayout, 
        {
          content: function() {
            return <App ref="app" files={appHistory['/'+aliasKey+path]} url={'/'+aliasKey+path} />
          }
        });
    console.log('loaded from history');
    return;
  }

  Meteor.call('list', 
    alias[aliasKey]+path, '/'+aliasKey+path, 
    function(error, files){
      appHistory['/'+aliasKey+path] = files;
      ReactLayout.render(
        MainLayout, 
        {
          content: renderApp.bind(this,'/'+aliasKey+path,files)
        });
    });
}

FlowRouter.route('/:alias/(.*)', {
  action: action
});
FlowRouter.route('/', {
  action: action
});




