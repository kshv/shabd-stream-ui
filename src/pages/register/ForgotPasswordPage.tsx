import * as React from 'react';
import { withAITracking } from '@microsoft/applicationinsights-react-js';
import { appInsights, reactPlugin } from "../../helpers/AppInsights";
import { Paper, TextField, Grid, Typography, Alert } from '@mui/material';
import {LoadingButton} from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import settings from '../../appSettings.json'
import HttpWrapper from '../../helpers/HttpWrapper';
import { validateEmail } from '../../helpers/utils';
import { Link } from 'react-router-dom';
import Routes from '../../constants/Routes';

export interface IForgotPasswordPageProps
{

}

export interface IForgotPasswordPageState
{
  sending:boolean,
  emailError:boolean,
  sendingSuccess:boolean,
  sendingError:boolean,
  email:string,
  errorMessage:string
}

class ForgotPasswordPage extends React.Component<IForgotPasswordPageProps,IForgotPasswordPageState>
{
  _httpWrapper:HttpWrapper = new HttpWrapper();
  constructor(props:IForgotPasswordPageProps)
  {
    super(props);
    this.state={
      sending:false,
      emailError:false,
      sendingSuccess:false,
      sendingError:false,
      email:'',
      errorMessage:''
    };
    this._onEmailChange = this._onEmailChange.bind(this);
    this._onSendClick = this._onSendClick.bind(this);
    this._successSend = this._successSend.bind(this);
    this._failureSend = this._failureSend.bind(this);

    appInsights.trackPageView({name:'ForgotPasswordPage',uri:Routes.forgotPassword});
    window.scrollTo(0, 0);
  }


  public render() {
        return(
      <Grid container minHeight="90vh" justifyContent="center" alignItems="center" p={1}>
        <Grid item xs={12} sm={11} md={9} lg={6} xl={5}>
          <Paper elevation={2} sx ={{px:"10%",py:"6%", display: "flex", flexDirection: "column", alignItems:'center'}}>
                <Typography variant='h3'
                            align='center'
                            px={2}
                            pb={2}>
                  No worries!<br/> Let's reset the password
                </Typography>
                {this.state.sendingSuccess && <Alert sx={{ width: '100%',margin:'12px' }}  onClose={()=>{this.setState({sendingSuccess:false})}} severity="success">Please use the password reset link sent to your email</Alert>}
                {this.state.sendingError && <Alert sx={{ width: '100%',margin:'12px' }}  onClose={()=>{this.setState({sendingError:false})}} severity="error">{this.state.errorMessage}</Alert>}
                <TextField  label="Email Address" 
                            type="email"
                            value={this.state.email}
                            onChange={this._onEmailChange}
                            error={this.state.emailError}
                            helperText={this.state.emailError? 'Invalid email':''}
                            fullWidth 
                            required
                            autoFocus
                            autoComplete='email' 
                            variant='outlined'
                            margin='normal'
                            />
            
                  <LoadingButton variant='contained'
                          color="primary"
                          fullWidth
                          size="large"
                          endIcon={<SendIcon />}
                          loading={this.state.sending}
                          loadingPosition="end"
                          sx={{marginTop:'16px',padding:'12px'}}
                          onClick={this._onSendClick}
                          >
                    Send email with password reset link
                  </LoadingButton>

                  <Link to={Routes.signIn}
                        style={{ textDecoration: 'none' }}>
                    <Typography sx={{p:2}}>
                      Remember Password? Sign In
                    </Typography>
                </Link>

                <Link to={Routes.register}
                        style={{ textDecoration: 'none' }}>
                  <Typography>
                      New to {settings.system.appName}? Join Now
                  </Typography>
                </Link>  
           </Paper>
        </Grid>
      </Grid>
        )
  }

  private _onEmailChange(event: React.ChangeEvent<HTMLInputElement>)
  {
    this.setState({
      email:event?.target?.value ?? '',
      emailError:false
    });
  }

  private _onSendClick = (): void => {
    this.setState({
      sendingError:false,
      sendingSuccess:false
    })
    if(!validateEmail(this.state.email))
    {
      this.setState({
        emailError:true
      });
      return;
    }

    const body = {
      a:this.state.email
    }
    this.setState({
      sending:true
    });
    this._httpWrapper.post(settings.user.forgotPasswordUrl,body,this._successSend,this._failureSend);
  }

  private _successSend(response){

    this.setState({
      sending:false,
      sendingError:false,
      sendingSuccess:true
    });
  }

  private _failureSend(response){
    this.setState({
      sending:false,
      sendingError:true,
      sendingSuccess:false,
      errorMessage:response?.message ?? 'Please try again later'
    });
  }
}

export default withAITracking(reactPlugin,ForgotPasswordPage);