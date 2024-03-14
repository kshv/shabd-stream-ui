import * as React from 'react';
import { withAITracking } from '@microsoft/applicationinsights-react-js';
import { appInsights, reactPlugin } from "../../helpers/AppInsights";
import { Paper, TextField, Grid, Typography,Alert, Link as LinkHref } from '@mui/material';
import {LoadingButton} from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import settings from '../../appSettings.json'
import HttpWrapper from '../../helpers/HttpWrapper';
import { validateEmail } from '../../helpers/utils';
import { Link, Navigate } from 'react-router-dom';
import Routes from '../../constants/Routes';

export interface IRegistrationPageProps
{
}

export interface IRegistrationPageState
{
  signingUp:boolean,
  emailError:boolean,
  passwordError:boolean,
  rePasswordError:boolean,
  nameError:boolean,
  regSuccess:boolean,
  regError:boolean,
  email:string,
  pass:string,
  rePass:string,
  name:string,
  errorMessage:string,
  redirectSignIn:boolean,
  reference:string,
  refError:boolean
}

class RegistrationPage extends React.Component<IRegistrationPageProps,IRegistrationPageState>
{
  _httpWrapper:HttpWrapper = new HttpWrapper();
  constructor(props:IRegistrationPageProps)
  {
    super(props);
    this.state={
      signingUp:false,
      emailError:false,
      passwordError:false,
      rePasswordError:false,
      nameError:false,
      regSuccess:false,
      regError:false,
      email:'',
      pass:'',
      rePass:'',
      name:'',
      reference:'',
      errorMessage:'',
      redirectSignIn:false,
      refError:false
    };
    this._onNameChange = this._onNameChange.bind(this);
    this._onEmailChange = this._onEmailChange.bind(this);
    this._onPasswordChange = this._onPasswordChange.bind(this);
    this._onRePasswordChange = this._onRePasswordChange.bind(this);
    this._onSignUpClick = this._onSignUpClick.bind(this);
    this._successRegistration = this._successRegistration.bind(this);
    this._failureRegistration = this._failureRegistration.bind(this);

    window.scrollTo(0, 0);
    
    appInsights.trackPageView({name:'RegistrationPage',uri:Routes.register});

  }


  public render() {
    return(
      <Grid container minHeight="90vh" justifyContent="center" alignItems="center" p={1}>
        <Grid item  xs={12} sm={11} md={9} lg={6} xl={5}>
          <Paper elevation={2} sx ={{px:"10%",py:"5%", display: "flex", flexDirection: "column", alignItems:'center'}}>
                <Typography variant='h2'
                            align='center'
                            sx={{fontSize:{xs:'2.5rem',md:'3rem'}}}
                            px={2}
                            pb={2}>
                  Register
                </Typography>
                {this.state.regSuccess && <Alert sx={{ width: '100%',margin:'12px' }}  onClose={()=>{this.setState({regSuccess:false})}} severity="success">{'Registration Successful. Redirecting to Sign In page.'}</Alert>}
                {this.state.regError && <Alert sx={{ width: '100%',margin:'12px' }}  onClose={()=>{this.setState({regError:false})}} severity="error">{this.state.errorMessage}</Alert>}
                
                <TextField  label="Name" 
                            type="name"
                            value={this.state.name}
                            onChange={this._onNameChange}
                            error={this.state.nameError}
                            helperText={this.state.nameError? 'Name cannot be empty':''}
                            fullWidth 
                            required
                            autoFocus
                            autoComplete='name' 
                            variant='outlined'
                            margin='dense'
                            />

                <TextField  label="Email Address" 
                            type="email"
                            value={this.state.email}
                            onChange={this._onEmailChange}
                            error={this.state.emailError}
                            helperText={this.state.emailError? 'Invalid email':''}
                            fullWidth 
                            required
                            autoComplete='email' 
                            variant='outlined'
                            margin='dense'
                            />
            
                <TextField  label="Password"
                            type="password"
                            value={this.state.pass}
                            onChange={this._onPasswordChange}
                            error={this.state.passwordError}
                            helperText={'Minimum 8 characters'}
                            fullWidth 
                            required
                            margin='dense'
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
                            margin='dense'
                            variant="outlined"
                            />
                  
                  <TextField  label="Reference"
                            value={this.state.reference}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                              {
                                this.setState({
                                  reference:event?.target?.value ?? '',
                                  refError:false,
                                  regError:false
                                });
                              }}
                            error={this.state.refError}
                            helperText={this.state.refError? 'Reference cannot be empty':''}
                            fullWidth 
                            required
                            variant='outlined'
                            margin='dense'
                            />

                  <Typography paragraph sx={{py:1,textAlign:'center'}}> By creating an account you are agreeing to our <LinkHref href={Routes.termsOfUse} target="_blank" sx={{textDecoration:'none', fontWeight:500}}>Terms of Use</LinkHref> and <LinkHref href={Routes.privacyPolicy} target="_blank" sx={{textDecoration:'none', fontWeight:500}}>Privacy Policy</LinkHref> </Typography>
                  <LoadingButton variant='contained'
                          color="primary"
                          fullWidth
                          size="large"
                          endIcon={<SendIcon />}
                          loading={this.state.signingUp}
                          loadingPosition="end"
                          sx={{padding:1}}
                          onClick={this._onSignUpClick}
                          >
                    Create Account
                  </LoadingButton>

                <Link to={Routes.signIn}
                      style={{ textDecoration: 'none' }}>
                    <Typography color={'primary'} sx={{p:2,pt:3, fontWeight:500}}>
                      Already have an account? Sign In
                    </Typography>
                </Link>  
           </Paper>
        </Grid>
        {this.state.redirectSignIn?
          <Navigate to={Routes.signIn}/>:<></>}
      </Grid>
    )
  }

  private _onNameChange(event: React.ChangeEvent<HTMLInputElement>)
  {
    this.setState({
      name:event?.target?.value ?? '',
      nameError:false,
      regError:false
    });
  }

  private _onEmailChange(event: React.ChangeEvent<HTMLInputElement>)
  {
    this.setState({
      email:event?.target?.value ?? '',
      emailError:false,
      regError:false
    });
  }

  private _onPasswordChange(event: React.ChangeEvent<HTMLInputElement>)
  {
    this.setState({
      pass:event?.target?.value ?? '',
      passwordError:false,
      rePasswordError:false,
      regError:false
    });
  }

  private _onRePasswordChange(event: React.ChangeEvent<HTMLInputElement>)
  {
    this.setState({
      rePass:event?.target?.value ?? '',
      rePasswordError:false,
      regError:false
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

  private _onSignUpClick = (): void => {
    this.setState({
      regError:false
    });

    if(this.state.name.length === 0)
    {
      this.setState({
        nameError:true
      });
      return;
    }

    if(!validateEmail(this.state.email))
    {
      this.setState({
        emailError:true
      });
      return;
    }

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

    if(this.state.reference.length === 0)
    {
      this.setState({
        refError:true
      });
      return;
    }
    const body = {
      a:this.state.email,
      b:this.state.pass,
      n:this.state.name,
      r:this.state.reference
    }
    this.setState({
      signingUp:true
    });
    this._httpWrapper.post(settings.user.registerUrl,body,this._successRegistration,this._failureRegistration);
  }

  private _successRegistration(response){
    this.setState({
      signingUp:false,
      regSuccess:true,
      name:'',
      email:'',
      pass:'',
      rePass:'',
      reference:''
    });
    setTimeout(()=> this.setState({
      redirectSignIn:true
    }),2000);
  }

  private _failureRegistration(response){
    this.setState({
      signingUp:false,
      regError:true,
      errorMessage:response?.message
    });
  }

}

export default withAITracking(reactPlugin,RegistrationPage);