import { AppBar, Container } from '@mui/material';

import * as React from 'react';
import AppHeaderGuest from './AppHeaderGuest';
import AppHeaderUser from './AppHeaderUser';
import { connect } from 'react-redux';

interface IAppHeaderProps{
  isUserLoggedIn:boolean
}

class AppHeader extends React.Component<IAppHeaderProps,any> {
    
    constructor(props:IAppHeaderProps){
        super(props);
        this.state={
        }
    }

    public render() {
        return (
          
        <AppBar position='sticky' 
                sx={{
                    background:"#FFFFFF",
                    width:"100%",
                    top:'0px'
                }}>
            <Container maxWidth="xl" sx={{px:'0px'}}>
              {this.props.isUserLoggedIn
              ?<AppHeaderUser/>
              :<AppHeaderGuest/>
              }
            </Container>
        </AppBar>
        )
    }
}

export const mapStateToProps = (state:any)=>{
  return {
    isUserLoggedIn:state.userDetailsReducer.isUserLoggedIn
  }
}  

export const mapDispatchToProps = (dispatch:any)=>{
  return {
  }
}

export default connect(mapStateToProps,mapDispatchToProps) ( AppHeader);