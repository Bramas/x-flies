
injectTapEventPlugin();

var {
    AppCanvas,
    AppBar,
    Styles,
    ListItem,
    RaisedButton,
    DatePicker,
    Avatar,
    SvgIcons,
    RefreshIndicator,
    IconMenu,
    IconButton
    } = MUI;

Folder = React.createClass({
	getInitialState: function()
	{
		return {isLoading: false};
	},
	handleClick: function(event)
	{
		this.setState({isLoading: true});
		if(this.props.onClick)
		{
			this.props.onClick(event);
		}
	},
	render: function()
	{
		iconButtonElement = <IconButton tooltip="More" touch={true}>
			  <SvgIcons.Navigation.NavigationMoreVert />
			</IconButton>;
		menu = <IconMenu iconButtonElement={iconButtonElement}>
		  <MUI.Libs.Menus.MenuItem  primaryText="Refresh" />
		  <MUI.Libs.Menus.MenuItem  primaryText="Send feedback" />
		  <MUI.Libs.Menus.MenuItem  primaryText="Settings" />
		  <MUI.Libs.Menus.MenuItem  primaryText="Help" />
		  <MUI.Libs.Menus.MenuItem  primaryText="Sign out" />
		</IconMenu>
		
		var avatarIcon = <SvgIcons.File.FileFolder color="#ffffff" />;
		if(this.state.isLoading)
		{
			var avatarIcon = <RefreshIndicator size={40} left={-8} top={-8} status="loading" />;
		}
		return <ListItem 
			onTouchTap={this.handleClick}
			primaryText={this.props.info.fileName}
			rightIconButton={menu}
			leftAvatar={ <Avatar 
					backgroundColor="#bdbdbd" 
					icon = {avatarIcon} />} />;
			
	}
});