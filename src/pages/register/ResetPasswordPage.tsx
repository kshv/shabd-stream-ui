import * as React from 'react';
import { withAITracking } from '@microsoft/applicationinsights-react-js';
import { appInsights, reactPlugin } from "../../helpers/AppInsights";
import { Paper, TextField, Grid, Typography,Alert, Backdrop, CircularProgress } from '@mui/material';
import {LoadingButton} from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import settings from '../../appSettings.json'
import HttpWrapper from '../../helpers/HttpWrapper';
import Routes from '../../constants/Routes';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export interface IResetPasswordPageProps
{
  email:string,
  token:string
}

export interface IResetPasswordPageState
{
  loading:boolean,
  loadError:boolean,
  verified:boolean,
  resetting:boolean,
  passwordError:boolean,
  rePasswordError:boolean,
  resetSuccess:boolean,
  resetError:boolean,
  pass:string,
  rePass:string,
  errorMessage:string,
  redirectSignIn:boolean
}


class ResetPasswordClassPage extends React.Component<IResetPasswordPageProps,IResetPasswordPageState>
{
  _httpWrapper:HttpWrapper = new HttpWrapper();
  constructor(props:IResetPasswordPageProps)
  {
    super(props);
    this.state={
      loading:true,
      loadError:false,
      verified:false,
      resetting:false,
      passwordError:false,
      rePasswordError:false,
      resetSuccess:false,
      resetError:false,
      pass:'',
      rePass:'',
      errorMessage:'',
      redirectSignIn:false
    };
    this._onPasswordChange = this._onPasswordChange.bind(this);
    this._onRePasswordChange = this._onRePasswordChange.bind(this);
    this._onResetClick = this._onResetClick.bind(this);
    this._successReset = this._successReset.bind(this);
    this._failureReset = this._failureReset.bind(this);

    appInsights.trackPageView({name:'ResetPasswordPage',uri:Routes.resetPassword});
    window.scrollTo(0, 0);
  }

  componentDidMount()
  {
    const body = {
      a:this.props.email,
      t:this.props.token
    }
    this._httpWrapper.post(settings.user.verifyResetLinkUrl,body,
      (response)=>this.setState({loading:false,verified:response.verified,loadError:false}),
      (response)=>this.setState({loading:false,verified:false,loadError:true,errorMessage:response?.message })
      );
  }

  public render() {
    return(

      <Grid container minHeight="90vh" justifyContent="center" alignItems="center" p={1}>
         <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={this.state.loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
       
        {!this.state.loading && this.state.verified &&
          <Grid item  xs={12} sm={11} md={9} lg={6} xl={5}>
            <Paper elevation={2} sx ={{px:"10%",py:"6%", display: "flex", flexDirection: "column", alignItems:'center'}}>
                  <Typography variant='h2'
                              align='center'
                              sx={{fontSize:{xs:'2.5rem',md:'3rem'}}}
                              px={2}
                              pb={2}>
                    Reset Password
                  </Typography>
                  {this.state.resetSuccess && <Alert sx={{ width: '100%',margin:'12px' }}  onClose={()=>{this.setState({resetSuccess:false})}} severity="success">{'Password reset successful. Redirecting to login page'}</Alert>}
                  {this.state.resetError && <Alert sx={{ width: '100%',margin:'12px' }}  onClose={()=>{this.setState({resetError:false})}} severity="error">{this.state.errorMessage}</Alert>}
              
                  <TextField  label="Password"
                              type="password"
                              value={this.state.pass}
                              onChange={this._onPasswordChange}
                              error={this.state.passwordError}
                              helperText={'Minimum 8 characters'}
                              fullWidth 
                              required
                              margin='normal'
                              variant="outlined"
                              />
                    <TextField  label="Re-type Password"
                              type="password"
                              value={this.state.rePass}
                              onChange={this._onRePasswordChange}
                              error={this.state.rePasswordError}
                              helperText={this.state.rePasswordError? 'Password and re-typed password does not match':''}
                              fullWidth 
                              required
                              margin='normal'
                              variant="outlined"
                              />
                    <LoadingButton variant='contained'
                            color="primary"
                            fullWidth
                            size="large"
                            endIcon={<SendIcon />}
                            loading={this.state.resetting}
                            loadingPosition="end"
                            sx={{marginTop:'16px',padding:'12px'}}
                            onClick={this._onResetClick}
                            >
                      Reset Password
                    </LoadingButton>
            </Paper>
          </Grid>
        }
        {!this.state.loading && !this.state.verified && !this.state.loadError &&
          <Grid item  xs={11}>
            <Typography variant='h5' sx={{textAlign:'center'}}>The password reset link has expried. Please generate a new link to reset your password.</Typography>
          </Grid>
        }
        {!this.state.loading && !this.state.verified && this.state.loadError &&
          <Grid item  xs={11} >
            <Typography variant='h5' sx={{textAlign:'center'}}>{this.state.errorMessage ?? 'The link is not working at present. Please try again later.'}</Typography>
          </Grid>
        }
        
        {this.state.redirectSignIn?
          <Navigate to={Routes.signIn}/>:<></>}
      </Grid>
    )
  }

  private _onPasswordChange(event: React.ChangeEvent<HTMLInputElement>)
  {
    this.setState({
      pass:event?.target?.value ?? '',
      passwordError:false,
      rePasswordError:false,
      resetError:false
    });
  }

  private _onRePasswordChange(event: React.ChangeEvent<HTMLInputElement>)
  {
    this.setState({
      rePass:event?.target?.value ?? '',
      rePasswordError:false,
      resetError:false
    });
  }

  private _validatePassword(password:string):boolean
  {
    return password.length>=8;
  }
  private _validateRePassword(password:string, rePassword:string):boolean
  {
    return password === rePassword;
  }

  private _onResetClick = (): void => {
    this.setState({
      resetError:false
    });

    if(!this._validatePassword(this.state.pass))
    {
      this.setState({
        passwordError:true,
        rePasswordError:false
      });
      return;
    }

    if(!this._validateRePassword(this.state.pass,this.state.rePass))
    {
      this.setState({
        rePasswordError:true
      });
      return;
    }

    const body = {
      a:this.props.email,
      b:this.state.pass,
      t:this.props.token
    }
    this.setState({
      resetting:true
    });
    this._httpWrapper.post(settings.user.resetPasswordUrl,body,this._successReset,this._failureReset);
  }

  private _successReset(response){
    this.setState({
      resetting:false,
      resetSuccess:true,
      resetError:false
    });

    setTimeout(()=> this.setState({
      redirectSignIn:true
    }),2000);

  }

  private _failureReset(response){
    this.setState({
      resetting:false,
      resetError:true,
      resetSuccess:false,
      errorMessage:response?.message ?? 'Please try again later'
    });
  }

}

function ResetPasswordPage(){
  const [email,setEmail] = useState('');
  const [token,setToken] = useState('');
  const [searchParams,] = useSearchParams();

  useEffect(() =>{
    appInsights.trackPageView({name:'ResetPasswordPage',uri:Routes.resetPassword});
    window.scrollTo(0, 0);

    setEmail(searchParams.get("email")?? '');
    setToken(searchParams.get("token") ?? '');
  },[searchParams]);
  
  return email && token
    ?<ResetPasswordClassPage email={email} token = {token}/>
    :<></>
}

export default withAITracking(reactPlugin,ResetPasswordPage);