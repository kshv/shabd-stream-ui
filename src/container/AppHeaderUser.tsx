import {  Toolbar, IconButton, Menu, MenuItem, Tooltip, Avatar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/system';
import * as React from 'react';
import {logoTitle} from './LogoAndTitle'
import { Link } from 'react-router-dom';
import { UserActions } from '../reducerActions/UserActions';
import { connect } from 'react-redux';
import { SystemActions } from '../reducerActions/SystemActions';
import FeedbackIcon from '@mui/icons-material/Feedback';
import Routes from '../constants/Routes';
import { appInsights } from '../helpers/AppInsights';
import { Roles } from '../constants/Roles';

interface IAppHeaderUserProps{
  username?:string,
  userRole?:number,
  width:number,
  SignOut:()=>Promise<void>,
  OpenFeedbackDrawer: ()=>Promise<void>
}

class AppHeaderUser extends React.Component<IAppHeaderUserProps,any> {
    
    constructor(props:IAppHeaderUserProps){
        super(props);
        this.state={
            anchorElNav : null,
            anchorElUser : null
        }
        this.handleCloseNavMenu=this.handleCloseNavMenu.bind(this);
        this.handleCloseUserMenu=this.handleCloseUserMenu.bind(this);
        this.handleOpenNavMenu=this.handleOpenNavMenu.bind(this);
        this.handleOpenUserMenu=this.handleOpenUserMenu.bind(this);
        this.handleSignOut=this.handleSignOut.bind(this);
        this.handleFeedback=this.handleFeedback.bind(this);
    }

    handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      appInsights.trackEvent({name:'Header User nav open button clicked',properties:{component:'HeaderUserNavButton'}});
        this.setState({
            anchorElNav : event.currentTarget});
    }

    handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      appInsights.trackEvent({name:'Header User user open button clicked',properties:{component:'HeaderUserUserButton'}});
        this.setState({
            anchorElUser : event.currentTarget});
    }

    handleCloseNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      appInsights.trackEvent({name:'Header User nav close button clicked',properties:{component:'HeaderUserNavButton'}});

        this.setState({
            anchorElNav : undefined});
    }

    handleCloseUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      appInsights.trackEvent({name:'Header User user close button clicked',properties:{component:'HeaderUserUserButton'}});
        this.setState({
            anchorElUser : undefined});
    }

    

    public menuSmall()
    {
        return (
          <Box>
            <Box sx={{ justifyContent:"left", display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="medium"
                aria-label="menu options"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={this.handleOpenNavMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(this.state.anchorElNav)}
                onClose={this.handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
              </Menu>
            </Box>
          </Box>
        )
    }
    

    private _renderUserNav()
    {
      return (
        <Box sx={{ flexGrow: 0 }}>
            {this.props.width>=500 &&
              <Tooltip title="Support">
                <IconButton onClick={()=>{
                                    this.props.OpenFeedbackDrawer()
                                    appInsights.trackEvent({name:'Header User Feedback clicked',properties:{component:'HeaderUserFeedbackButton'}});
                                          }
                                    }>
                  <FeedbackIcon fontSize='medium'/>
                </IconButton>
              </Tooltip>
            }
            <Tooltip title="My Account">
              <IconButton onClick={this.handleOpenUserMenu}>
                <Avatar sx={{ml:4, height:{xs:30,md:40}, width:{xs:30,md:40}}}/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-account"
              anchorEl={this.state.anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(this.state.anchorElUser)}
              onClose={this.handleCloseUserMenu}
              >
                <MenuItem key={'account'} onClick={this.handleCloseUserMenu} sx={{textAlign:'center'}}>
                  <Link 
                    to={Routes.account}
                    onClick={()=>appInsights.trackEvent({name:'Header User Account clicked',properties:{component:'HeaderUserAccountButton'}})}
                    style={{ textDecoration: 'none',fontWeight:'bold', color:'inherit'}}>{'My Account'}</Link>
                </MenuItem>

                {this.props.width<500 &&
                  <MenuItem key={'support'} onClick={this.handleFeedback} sx={{textAlign:'center'}}>
                    <Typography sx={{ fontWeight:'bold', color:'inherit'}}>{'Support'}</Typography>
                  </MenuItem>
                }

                <MenuItem key={'signout'} onClick={this.handleSignOut} sx={{textAlign:'center'}}>
                  <Link to={Routes.signIn} style={{ textDecoration: 'none',fontWeight:'bold', color:'inherit' }}>{'Sign Out'}</Link>
                </MenuItem>
               
            </Menu>
          </Box>
      )
    }

    private handleFeedback(event: React.MouseEvent<HTMLElement>)
    {
      this.handleCloseUserMenu(event);
      this.props.OpenFeedbackDrawer();
      appInsights.trackEvent({name:'Header User Feedback small clicked',properties:{component:'HeaderUserFeedbackButton'}});
    }

    private handleSignOut(event: React.MouseEvent<HTMLElement>)
    {
      this.handleCloseUserMenu(event);
      localStorage.removeItem('token');
      this.props.SignOut();
      appInsights.trackEvent({name:'Header User Signout clicked',properties:{component:'HeaderUserSignOutButton'}});
    }

    public render() {
        return (
          <Toolbar disableGutters>
            <Box sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
              {logoTitle()}
            </Box>
            { this.props.userRole === Roles.ADMIN && this.menuSmall()}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent:'center' }}>
              {logoTitle()}
            </Box>
            {this._renderUserNav()}
          </Toolbar>
        )
    }
}


export const mapStateToProps = (state:any)=>{
  return {
    username:state.userDetailsReducer?.user?.FName,
    userRole:state.userDetailsReducer?.user?.role,
    width:state.systemReducer.width
  }
}  

export const mapDispatchToProps = (dispatch:any)=>{
  return {
    SignOut: ()=>
      dispatch({
        type:UserActions.SIGN_OUT
      }),
    OpenFeedbackDrawer: ()=>
      dispatch({
        type:SystemActions.OPEN_FEEDBACK_DRAWER,
        open:true
      }),
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (AppHeaderUser);