import * as React from 'react';
import { withAITracking } from '@microsoft/applicationinsights-react-js';
import { appInsights, reactPlugin } from "../../helpers/AppInsights";
import { connect } from 'react-redux';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { Paper, TextField, Grid, Typography, Alert, Snackbar, Divider, Box, Button } from '@mui/material';
import {LoadingButton} from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import settings from '../../appSettings.json'
import HttpWrapper from '../../helpers/HttpWrapper';
import { validateEmail } from '../../helpers/utils';
import Routes from '../../constants/Routes';
import GoogleSignIn from './GoogleSignIn';
import { useEffect, useState } from 'react';
import { UserActions } from '../../reducerActions/UserActions';

export interface ISignInPageProps
{
  isUserLoggedIn:boolean,
  EnableLoad: (status:boolean)=> Promise<void>
}

export interface ISignInPageState
{
  signingIn:boolean,
  emailError:boolean,
  signInError:boolean,
  signInSuccess:boolean,
  email:string,
  pass:string,
  errorMessage:string
}

const _httpWrapper:HttpWrapper = new HttpWrapper();

function SignInPage(props:ISignInPageProps)
{
  const [signingIn,setSigningIn] = useState(false);
  const [emailError,setEmailError] = useState(false);
  const [signInError,setSignInError] = useState(false);
  const [signInSuccess,setSignInSuccess] = useState(false);
  const [email,setEmail] = useState('');
  const [pass,setPass] = useState('');
  const [errorMessage,setErrorMessage] = useState('');

  const location = useLocation();

  useEffect(() =>{
    appInsights.trackPageView({name:'SignInPage',uri:location.pathname});
    window.scrollTo(0, 0);
  },[location.pathname]);

  const _onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) =>
  {
    setEmail(event?.target?.value ?? '');
    setEmailError(false);
    setSignInError(false);
  }

  const _onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) =>
  {
    setPass(event?.target?.value ?? '');
    setSignInError(false);
  }

  
  const _onSignInClick = (): void => {
    setSignInError(false);
    if(!validateEmail(email))
    {
      setEmailError(true);
      return;
    }

    const body = {
      a:email,
      b:pass
    }
    setSigningIn(true)
    _httpWrapper.post(settings.user.signInUrl,body,_successSignIn,_failureSignIn);
  }

  const _successSignIn= (response)=>{
    localStorage.setItem('token',response.token);
    props.EnableLoad(true);
  }

  const _failureSignIn = (response)=>{
    setSigningIn(false);
    setSignInError(true);
    setErrorMessage(response?.message ?? 'Please try again later');
  }

  return(
    <Grid container minHeight="90vh" justifyContent="center" alignItems="center" p={1}>
      <Snackbar open={signInSuccess} autoHideDuration={6000} onClose={()=>setSignInSuccess(false)}>
        <Alert onClose={()=>setSignInSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Sign in successful!
        </Alert>
      </Snackbar>
      {props.isUserLoggedIn && <Navigate to={Routes.home}/>}
      <Grid item  xs={12} sm={11} md={9} lg={6} xl={5}>
        <Paper elevation={2} sx ={{px:"10%",py:"6%", display: "flex", flexDirection: "column", justifyContent:'center', alignItems:'center'}}>
          <Typography variant='h1'
                      align='center'
                      display={{xs:'block',sm:'none'}}
                      color='primary'
                      sx={{fontSize:{xs:'2rem',sm:'2.5rem'}}}
                      >
            Welcome to <br/> {settings.system.appName}
          </Typography>
          <Typography variant='h1'
                      align='center'
                      color='primary'
                      display={{xs:'none',sm:'block'}}
                      sx={{fontSize:{xs:'2rem',sm:'2.5rem'}}}
                      >
            Welcome to Shabd
          </Typography>
          <Box sx={{my:1}}></Box>
          {signInError && <Alert sx={{ width: '100%',margin:'12px' }} onClose={()=>{setSignInError(false)}} severity="error">{errorMessage}</Alert>}

          <Box sx={{maxWidth:350}}>
            <TextField  label="Email Address" 
                      type="email"
                      value={email}
                      onChange={_onEmailChange}
                      error={emailError}
                      helperText={emailError? 'Invalid email':''}
                      fullWidth
                      required
                      autoFocus
                      size='medium'
                      autoComplete='email' 
                      variant='outlined'
                      margin='normal'
                      />
          
            <TextField  label="Password"
                          type="password"
                          value={pass}
                          onChange={_onPasswordChange}
                          fullWidth 
                          required
                          margin='normal'
                          variant="outlined"
                          />

            <Link to={Routes.forgotPassword}
                  style={{ textDecoration: 'none', color:'grey' }}>
              <Typography variant={'caption'}> Forgot Password? </Typography>
            </Link>

            <LoadingButton variant='contained'
                      color="primary"
                      fullWidth
                      size="large"
                      endIcon={<SendIcon />}
                      loading={signingIn}
                      loadingPosition="end"
                      sx={{mt:2,fontWeight:'bold'}}
                      onClick={_onSignInClick}
                      >
                Sign in
            </LoadingButton>

            
            <Divider flexItem sx={{py:2}}>OR</Divider>
            <GoogleSignIn onSuccess={_successSignIn } onFailure={_failureSignIn}/>
              
            <Divider flexItem sx={{py:2}}/>

            <Button
                  variant='outlined'
                  sx={{my:2, width:'100%'}}
                  component={Link}
                  to={Routes.register}
                  style={{ textDecoration: 'none' }}>

              <Typography>
                New to {settings.system.appName}? Join Now
              </Typography>
            </Button>
          </Box>

        </Paper>
      </Grid>
    </Grid>
  )
}


export const mapStateToProps = (state:any)=>{
  return {
    isUserLoggedIn:state.userDetailsReducer.isUserLoggedIn
  }
}  
export const mapDispatchToProps = (dispatch:any)=>{
  return {
    EnableLoad:(status:boolean)=>
    dispatch({
      type:UserActions.LOAD_USER_BOOT,
      status:status
    })
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withAITracking(reactPlugin,SignInPage));