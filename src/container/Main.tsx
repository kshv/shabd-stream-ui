import * as React from 'react';
import AppHeader from './AppHeader';
import { connect } from 'react-redux';
import { BrowserRouter as Router} from "react-router-dom";
import { Backdrop, Box, CircularProgress, Stack } from '@mui/material';
import { UserActions } from '../reducerActions/UserActions';
import HttpWrapper from '../helpers/HttpWrapper';
import settings from '../appSettings.json';
import PageRoutes from './PageRoutes';
import { SystemActions } from '../reducerActions/SystemActions';
import { IdleTimerProvider } from 'react-idle-timer';
import Footer from './Footer';


export interface IMainProps
{
  loadingUser:boolean,
  userId:number,
  height:number
  EnableUserLoad: (status:boolean)=> void,
  SaveUserDetails: (user)=> Promise<void>,
  SaveDimensions: (width:number, height:number)=> Promise<void>,
}

export interface IMainState
{
  load:boolean
}

class Main extends React.Component<IMainProps,IMainState> {
  _httpWrapper:HttpWrapper = new HttpWrapper();

  constructor(props:IMainProps)
  {
    super(props);
    
    this._getData=this._getData.bind(this);
    this._isLoading = this._isLoading.bind(this);
    this._saveDimension = this._saveDimension.bind(this);

    this._saveDimension();
    window.addEventListener('resize',this._saveDimension);

    // window.addEventListener('error', e => {
    //   // prompt user to confirm refresh
    //   if (/Loading chunk [\d]+ failed/.test(e.message)) {
    //     window.location.reload();
    //   }
    // });

    const token = localStorage.getItem('token');
    if(token)
    {
      this.props.EnableUserLoad(true);
      this.state={
        load:false
      };
    }
    else
    {
      this.props.EnableUserLoad(false);
      this.state={
        load:true
      };
    }

  }

  private _saveDimension()
  {
    this.props.SaveDimensions(window.innerWidth,window.innerHeight);
  }

  componentDidUpdate(prevProps:IMainProps,prevState:IMainState)
  {
    if(this.props.loadingUser && !prevProps.loadingUser)
    {
      this.setState({load:true})
      this._getData();
    }
    
  }

  private _getData()
  {
    this._httpWrapper.getAuth(settings.user.getUserUrl,
      (response)=>{this.props.SaveUserDetails(response.user)},
      (response)=>this.props.EnableUserLoad(false)
      );
  }

  componentWillUnmount()
  {
    window.removeEventListener('resize',this._saveDimension);
  }


  private _isLoading()
  {
    return !this.state.load || this.props.loadingUser;
  }

  public render() {
    return (
      <IdleTimerProvider
        timeout={30*60*1000}
        onActive={()=>{
          this.props.userId && window.location.reload()
          }}>
        <Router>
          <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={this._isLoading()}>
                <CircularProgress color="inherit" />
          </Backdrop>
          
          {!this._isLoading()?
            <Stack direction="column" alignItems={'stretch'} sx={{display:'flex',margin:0}}>
              <AppHeader/>
              <Box sx={{minHeight:this.props.height-80, m:"0px !important"}}>
                <PageRoutes/>
              </Box>
              <Footer/>
            </Stack>
          :<></>}
        </Router>
      </IdleTimerProvider>
    );
  }
}


export const mapStateToProps = (state:any)=>{
  return {
    loadingUser:state.userDetailsReducer.loadingUser,
    userId:state.userDetailsReducer.user?.userId,
    height:state.systemReducer.height
  }
}  

export const mapDispatchToProps = (dispatch:any)=>{
  return {
    EnableUserLoad:(status:boolean)=>
    dispatch({
      type:UserActions.LOAD_USER_BOOT,
      status:status
    }),

    SaveUserDetails: (user)=>
      dispatch({
        type:UserActions.SAVE_USER_DETAILS,
        user:user
      }),
      
    SaveDimensions: (width:number, height:number)=> 
      dispatch({
        type:SystemActions.SAVE_DIMENSIONS,
        width:width,
        height:height
      }),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Main);