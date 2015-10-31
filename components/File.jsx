
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
    IconMenu,
    IconButton
    } = MUI;


File = React.createClass({
	handleClick: function(event)
	{
		event.preventDefault();
		console.log(this.props.info.filePath);
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
		</IconMenu>;
			

		return <ListItem 
			onTouchTap={this.props.onClick || this.handleClick}
			primaryText={this.props.info.fileName}
			rightIconButton={menu}
			leftAvatar={<Avatar 
					backgroundColor="#fdd835" 
					icon = {<SvgIcons.Editor.EditorInsertDriveFile color="#ffffff" />} />} />;
	}
});