import * as React from 'react';
import { withAITracking } from '@microsoft/applicationinsights-react-js';
import { appInsights, reactPlugin } from "../../helpers/AppInsights";
import { Paper, TextField, Grid, Typography,Alert, Link, IconButton } from '@mui/material';
import {LoadingButton} from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import settings from '../../appSettings.json'
import HttpWrapper from '../../helpers/HttpWrapper';
import { validateEmail } from '../../helpers/utils';
import EmailIcon from '@mui/icons-material/Email';
import Routes from '../../constants/Routes';

export interface IContactUsPageProps
{
}

export interface IContactUsPageState
{
  sending:boolean,
  emailError:boolean,
  subjectError:boolean,
  msgError:boolean,
  sendSuccess:boolean,
  sendError:boolean,
  email:string,
  mobile:string,
  fname:string,
  lname:string,
  subject:string,
  msg:string,
  errorMessage:string
}

class ContactUsPage extends React.Component<IContactUsPageProps,IContactUsPageState>
{
  _httpWrapper:HttpWrapper = new HttpWrapper();
  constructor(props:IContactUsPageProps)
  {
    super(props);
    this.state={
      sending:false,
      emailError:false,
      subjectError:false,
      msgError:false,
      sendSuccess:false,
      sendError:false,
      email:'',
      mobile:'',
      fname:'',
      lname:'',
      subject:'',
      msg:'',
      errorMessage:''
    };
    this._onEmailChange = this._onEmailChange.bind(this);
    this._onMobileChange = this._onMobileChange.bind(this);
    this._onFNameChange = this._onFNameChange.bind(this);
    this._onLNameChange = this._onLNameChange.bind(this);
    this._onSubjectChange = this._onSubjectChange.bind(this);
    this._onMessageChange = this._onMessageChange.bind(this);
    this._onSendClick = this._onSendClick.bind(this);
    this._successSend = this._successSend.bind(this);
    this._failureSend = this._failureSend.bind(this);

    appInsights.trackPageView({name:'ContactUsPage',uri:Routes.contact});
    window.scrollTo(0, 0);
  }

  public render() {
    return(

      <Grid container minHeight="90vh" justifyContent="center" alignItems="center" px={1} py={2}>
        <Grid item  xs={11} sm={10} md={8} xl={6}>
          <Paper elevation={2} sx ={{p:'5%', display: "flex", flexDirection: "column", alignItems:'center'}}>
                <Typography variant='h2'
                            align='center'
                            sx={{fontSize:{xs:'2.5rem',md:'3rem'}}}
                            >
                  Get in touch
                </Typography>
                <Link href={'mailto:'+settings.system.supportEmail} 
                      onClick={()=> appInsights.trackEvent({name:'Contact Email clicked', properties:{component:'ContactEmailIcon'}})}
                      sx={{ pb:2,textDecoration:'none', display:'flex', flexDirection:'row', alignItems:'center'}}>
                  <IconButton >
                    <EmailIcon/>
                  </IconButton>
                  <Typography variant='subtitle1'
                              align='center'
                             >
                    {settings.system.supportEmail}
                  </Typography>
                </Link>
                {this.state.sendSuccess && <Alert sx={{ width: '100%',margin:'12px' }}  onClose={()=>{this.setState({sendSuccess:false})}} severity="success">{'Thank you for contacting us. We will reply to you soon.'}</Alert>}
                {this.state.sendError && <Alert sx={{ width: '100%',margin:'12px' }}  onClose={()=>{this.setState({sendError:false})}} severity="error">{this.state.errorMessage}</Alert>}
                
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                  <Grid item xs={12} sm= {5.75}>
                    <TextField  label="First Name"
                                type="text"
                                value={this.state.fname}
                                onChange={this._onFNameChange}
                                fullWidth 
                                autoFocus
                                margin='normal'
                                variant="outlined"
                                />
                  </Grid>

                  <Grid item xs={12} sm= {5.75}>
                    <TextField  label="Last Name"
                                type="text"
                                value={this.state.lname}
                                onChange={this._onLNameChange}
                                fullWidth 
                                margin='normal'
                                variant="outlined"
                                />
                  </Grid>
                </Grid>

                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                  <Grid item xs={12} sm= {5.75}>
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
                                margin='normal'
                                />
                  </Grid>
                  <Grid item xs={12} sm= {5.75}>
                    <TextField  
                        fullWidth
                        label="Mobile" 
                        type="mobile"
                        value={this.state.mobile}
                        onChange={this._onMobileChange} 
                        autoComplete='mobile' 
                        variant='outlined'
                        margin='normal'
                      />
                  </Grid>
                </Grid>

                <TextField  label="Subject"
                          type="text"
                          value={this.state.subject}
                          onChange={this._onSubjectChange}
                          error={this.state.subjectError}
                          fullWidth 
                          required
                          margin='normal'
                          variant="outlined"
                          />

                <TextField  label="Message"
                            multiline
                            minRows={3}
                          type="text"
                          value={this.state.msg}
                          onChange={this._onMessageChange}
                          error={this.state.msgError}
                          fullWidth 
                          required
                          margin='normal'
                          variant="outlined"
                          />
                  <LoadingButton variant='contained'
                          fullWidth
                          size="large"
                          endIcon={<SendIcon />}
                          loading={this.state.sending}
                          loadingPosition="end"
                          sx={{marginTop:'16px',padding:'12px'}}
                          onClick={this._onSendClick}
                          >
                    <Typography variant='button' >Send Message</Typography>
                  </LoadingButton>

           </Paper>
        </Grid>
      </Grid>

    )
  }

  private _onEmailChange(event: React.ChangeEvent<HTMLInputElement>)
  {
    this.setState({
      email:event?.target?.value ?? '',
      emailError:false,
      sendError:false
    });
  }

  private _onMobileChange(event: React.ChangeEvent<HTMLInputElement>)
  {
    this.setState({
      mobile:event?.target?.value ?? '',
      sendError:false
    });
  }

  private _onFNameChange(event: React.ChangeEvent<HTMLInputElement>)
  {
    this.setState({
      fname:event?.target?.value ?? '',
      sendError:false
    });
  }

  private _onLNameChange(event: React.ChangeEvent<HTMLInputElement>)
  {
    this.setState({
      lname:event?.target?.value ?? '',
      sendError:false
    });
  }
  
  private _onSubjectChange(event: React.ChangeEvent<HTMLInputElement>)
  {
    this.setState({
      subject:event?.target?.value ?? '',
      sendError:false,
      subjectError:false
    });
  }

  private _onMessageChange(event: React.ChangeEvent<HTMLInputElement>)
  {
    this.setState({
      msg:event?.target?.value ?? '',
      sendError:false,
      msgError:false
    });
  }

  private _validateText(text:string):boolean
  {
    return text.length >0;
  }

  private _onSendClick = (): void => {
    appInsights.trackEvent({name:'Contact Submit Button clicked', properties:{component:'ContactSendButton'}})
    this.setState({
      sendSuccess:false,
      sendError:false
    });

    if(!validateEmail(this.state.email))
    {
      this.setState({
        emailError:true
      });
      return;
    }

    if(!this._validateText(this.state.subject))
    {
      this.setState({
        subjectError:true
      });
      return;
    }

    if(!this._validateText(this.state.msg))
    {
      this.setState({
        msgError:true
      });
      return;
    }

    const body = {
      email:this.state.email,
      mobile:this.state.mobile,
      fname:this.state.fname,
      lname:this.state.lname,
      subject:this.state.subject,
      message:this.state.msg
    }
    this.setState({
      sending:true
    });
    this._httpWrapper.post(settings.general.sendContactusUrl,body,this._successSend,this._failureSend);
  }

  private _successSend(response){
    this.setState({
      sending:false,
      sendSuccess:true,
      subject:'',
      msg:''
    });
  }

  private _failureSend(response){
    this.setState({
      sending:false,
      sendError:true,
      errorMessage:response?.message ?? 'Please try again later'
    });
  }

}


export default withAITracking(reactPlugin,ContactUsPage);