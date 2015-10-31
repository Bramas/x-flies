
injectTapEventPlugin();

var {
    AppCanvas,
    AppBar,
    Styles,
    RaisedButton,
    DatePicker,
    LeftNav
    } = MUI;

var { ThemeManager, LightRawTheme } = Styles;

MainLayout = React.createClass({
  childContextTypes: {
      muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
      return {
          muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
      };
  },
  toogleLeftNav: function()
  {
    this.refs.leftNav.toggle();
  },

  render: function() {
    menuItems = [
      { route: 'get-started', text: 'Get Started' },
      { route: 'customization', text: 'Customization' },
      { route: 'components', text: 'Components' },
      { type: MUI.Libs.Menu.MenuItem.Types.SUBHEADER, text: 'Resources' },
      {
         type: MUI.Libs.Menu.MenuItem.Types.LINK,
         payload: 'https://github.com/callemall/material-ui',
         text: 'GitHub'
      },
      {
         text: 'Disabled',
         disabled: true
      },
      {
         type: MUI.Libs.Menu.MenuItem.Types.LINK,
         payload: 'https://www.google.com',
         text: 'Disabled Link',
         disabled: true
      },
    ];
    
    return <AppCanvas>
                <LeftNav ref="leftNav" docked={false} menuItems={menuItems} />
                <AppBar onLeftIconButtonTouchTap={this.toogleLeftNav} title="X-Flies" iconClassNameRight="muidocs-icon-navigation-expand-more"/>
                <div style={{padding: '80px',}}>
                    {this.props.content()}
                </div>
            </AppCanvas>
  }
});