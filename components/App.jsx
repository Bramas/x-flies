
injectTapEventPlugin();

var {
    AppCanvas,
    AppBar,
    Styles,
    List,
    Paper,
    DatePicker,
    RefreshIndicator
} = MUI;

App = React.createClass({

	// Loads items from the Tasks collection and puts them on this.data.tasks
	updateList(error, list) {
		this.setState({
			isLoading: false,
			files: list
		});
	},
	getInitialState: function()
	{
		return {
			isLoading: false
		}
	},
	componentWillReceiveProps: function(nextProps){
		this.setState({isLoading: false});
	},
	handleClick: function(file, event)
	{
		//this.setState({isLoading: true});
		console.log('app: '+file.fileName);
		if(!file.folder)
		{
			this.downloadFile(file);
		}
		else
		{
			FlowRouter.go(file.filePath);
		}
	},
	downloadFile: function(file)
	{
		window.open('/d/'+file.filePath);
	},
	renderFile: function(file){
		if(file.folder)
		{
			return <Folder 
			onClick={this.handleClick.bind(this, file)} 
			key={file.filePath} 
			info={file} />
		}
		return <File 
			onClick={this.handleClick.bind(this, file)} 
			key={file.filePath}
			info={file} />
	},
	render: function()
	{
		loading = '';
		if(this.state.isLoading)
		{
			//loading = <RefreshIndicator size={50} left={80} top={110} status="loading" />;
		}
		//style={{position: "absolute", top:"110px", width:"50px" margin:"auto"}}
		return <Paper zDepth={2} >
			<List>
				{this.props.files.map(this.renderFile)}
			</List>
		</Paper>;
	}
});