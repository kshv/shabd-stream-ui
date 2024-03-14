import { Toolbar, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/system';
import * as React from 'react';
import {logoTitle} from './LogoAndTitle'
import { Link } from 'react-router-dom';
import Routes from '../constants/Routes';
import { appInsights } from '../helpers/AppInsights';

class AppHeaderGuest extends React.Component<any,any> {
    
    constructor(props){
        super(props);
        this.state={
            anchorElNav : undefined
        }
    }

    handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      appInsights.trackEvent({name:'Header Guest nav open button clicked',properties:{component:'HeaderGuestNavButton'}});

        this.setState({
            anchorElNav : event.currentTarget});
    }

    handleCloseNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      appInsights.trackEvent({name:'Header Guest nav close button clicked',properties:{component:'HeaderGuestNavButton'}});
        this.setState({
            anchorElNav : null});
    }


    public menuSmall()
    {
        return (
          <Box sx={{ flexGrow: 1, justifyContent:"right", display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
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
                <MenuItem key={'Contact'} onClick={this.handleCloseNavMenu} sx={{textAlign:'center'}}>
                  <Link 
                    to={Routes.contact}
                    onClick={()=>appInsights.trackEvent({name:'Header Guest Contact clicked',properties:{component:'HeaderGuestContactButton'}})}
                    style={{ textDecoration: 'none',fontWeight:'bold', color:'inherit' }}>
                      Contact Us
                  </Link>
                </MenuItem>
                <MenuItem key={'SignIn'} onClick={this.handleCloseNavMenu} sx={{textAlign:'center'}}>
                  <Link 
                    to={Routes.signIn}
                    onClick={()=>appInsights.trackEvent({name:'Header Guest SignIn clicked',properties:{component:'HeaderGuestSignInButton'}})}
                    style={{ textDecoration: 'none',fontWeight:'bold', color:'inherit' }}>
                      Sign In
                  </Link>
                </MenuItem>
                <MenuItem key={'Register'} onClick={this.handleCloseNavMenu} sx={{textAlign:'center'}}>
                  <Link 
                    to={Routes.register}
                    onClick={()=>appInsights.trackEvent({name:'Header Guest Register clicked',properties:{component:'HeaderGuestRegisterButton'}})}
                    style={{ textDecoration: 'none',fontWeight:'bold', color:'inherit' }}>
                      Join Now
                  </Link>
                </MenuItem>
            </Menu>
          </Box>
        )
    }

    public menuLarge()
    {
        return (
            <Box sx={{ flexGrow: 1, justifyContent:"right", display: { xs: 'none', md: 'flex' } }}>
              <Link
                to={Routes.contact}
                onClick={()=>appInsights.trackEvent({name:'Header Guest About Large clicked',properties:{component:'HeaderGuestContactButton'}})}
                style={{ textDecoration: 'none' }}
                >
                <Button  sx={{ m: 2,fontWeight:"bold" }}>
                  Contact Us
                </Button>
              </Link>
              <Link
                to={Routes.signIn}
                onClick={()=>appInsights.trackEvent({name:'Header Guest About Large clicked',properties:{component:'HeaderGuestSignInButton'}})}
                style={{ textDecoration: 'none' }}
               >
                <Button  sx={{ m: 2,fontWeight:"bold"}}>
                  Sign In
                </Button>
              </Link>
              <Link
                to={Routes.register}
                onClick={()=>appInsights.trackEvent({name:'Header Guest Register Large clicked',properties:{component:'HeaderGuestRegisterButton'}})}
                style={{ textDecoration: 'none' }}
                >
                  <Button variant='outlined' sx={{ m: 1.8, p:1, fontWeight:"bold" }}>
                  Join Now
                  </Button>
              </Link>
          </Box>
        )
    }

    public render() {
        return (

          <Toolbar disableGutters>
            {logoTitle()}
            {this.menuSmall()}
            {this.menuLarge()}
          </Toolbar>  
           
        )
    }
}
export default AppHeaderGuest;