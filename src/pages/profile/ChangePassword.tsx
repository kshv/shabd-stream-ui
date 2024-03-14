import * as React from 'react';
import { connect } from 'react-redux';
import { TextField, Typography, Alert, Accordion, AccordionDetails, AccordionSummary, Grid } from '@mui/material';
import {LoadingButton} from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import settings from '../../appSettings.json'
import HttpWrapper from '../../helpers/HttpWrapper';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface IChangePasswordProps
{
  email:string
}

export interface IChangePasswordState
{
  passwordError:boolean,
  rePasswordError:boolean,
  changing:boolean,
  changeSuccess:boolean,
  changeError:boolean,
  oldPass:string
  pass:string,
  rePass:string,
  errorMessage:string
}

class ChangePassword extends React.Component<IChangePasswordProps,IChangePasswordState>
{
  _httpWrapper:HttpWrapper = new HttpWrapper();
  constructor(props:IChangePasswordProps)
  {
    super(props);
    this.state={
      passwordError:false,
      rePasswordError:false,
      changing:false,
      changeSuccess:false,
      changeError:false,
      oldPass:'',
      pass:'',
      rePass:'',
      errorMessage:''
    };
    this._onOldPasswordChange = this._onOldPasswordChange.bind(this);
    this._onPasswordChange = this._onPasswordChange.bind(this);
    this._onRePasswordChange = this._onRePasswordChange.bind(this);
    this._onChangeClick = this._onChangeClick.bind(this);
    this._successChange = this._successChange.bind(this);
    this._failureChange = this._failureChange.bind(this);
  }


  public render() {
    return(
      <Accordion sx={{px:{xs:0,sm:2}}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="Basic profile">
          <Typography variant='h6'>Change Password</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction="row" spacing={1} justifyContent="space-between" alignItems="center">
            <Grid item xs={12}>
              <TextField  label="Email Address" 
                            type="email"
                            value={this.props.email}
                            fullWidth 
                            variant='outlined'
                            margin='normal'
                            disabled
                            size='small'
                            />
            </Grid>
            <Grid item xs={12}>
              <TextField  label="Old Password"
                          type="password"
                          value={this.state.oldPass}
                          onChange={this._onOldPasswordChange}
                          fullWidth 
                          required
                          margin='normal'
                          variant="outlined"
                          size='small'
                          />
            </Grid>
            <Grid item xs={12}>
              <TextField  label="New Password"
                        type="password"
                        value={this.state.pass}
                        onChange={this._onPasswordChange}
                        error={this.state.passwordError}
                        helperText={'Minimum 8 characters'}
                        fullWidth 
                        required
                        margin='normal'
                        variant="outlined"
                        size='small'
                        />
            </Grid>
            <Grid item xs={12}>
              <TextField  label="Re-type New Password"
                        type="password"
                        value={this.state.rePass}
                        onChange={this._onRePasswordChange}
                        error={this.state.rePasswordError}
                        helperText={this.state.rePasswordError? 'Password and re-typed password does not match':''}
                        fullWidth 
                        required
                        margin='normal'
                        variant="outlined"
                        size='small'
                        />
            </Grid>
            <Grid item>
              <LoadingButton variant='contained'
                      color="primary"
                      fullWidth
                      size="large"
                      endIcon={<SendIcon />}
                      loading={this.state.changing}
                      loadingPosition="end"
                      sx={{marginTop:'16px'}}
                      onClick={this._onChangeClick}
                      >
                Change Password
              </LoadingButton>
            </Grid>
            {this.state.changeSuccess && <Grid item xs={12}><Alert onClose={()=>{this.setState({changeSuccess:false})}} severity="success">{'Password changed successfully.'}</Alert></Grid>}
                {this.state.changeError && <Grid item xs={12}><Alert onClose={()=>{this.setState({changeError:false})}} severity="error">{this.state.errorMessage}</Alert></Grid>}
          </Grid>
        </AccordionDetails>
      </Accordion>
    )
  }

  private _onOldPasswordChange(event: React.ChangeEvent<HTMLInputElement>)
  {
    this.setState({
      oldPass:event?.target?.value ?? '',
      changeError:false
    });
  }

  private _onPasswordChange(event: React.ChangeEvent<HTMLInputElement>)
  {
    this.setState({
      pass:event?.target?.value ?? '',
      passwordError:false,
      rePasswordError:false,
      changeError:false
    });
  }

  private _onRePasswordChange(event: React.ChangeEvent<HTMLInputElement>)
  {
    this.setState({
      rePass:event?.target?.value ?? '',
      rePasswordError:false,
      changeError:false
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

  private _onChangeClick = (): void => {
    this.setState({
      changeError:false
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
      b:this.state.oldPass,
      c:this.state.pass
    }
    this.setState({
      changing:true
    });
    this._httpWrapper.postAuth(settings.user.changePasswordUrl,body,this._successChange,this._failureChange);
  }

  private _successChange(response){
    this.setState({
      changing:false,
      changeSuccess:true,
      oldPass:'',
      pass:'',
      rePass:''
    });
  }

  private _failureChange(response){
    this.setState({
      changing:false,
      changeError:true,
      errorMessage:response?.message
    });
  }

}

export const mapStateToProps = (state:any)=>{
  return {
    email:state.userDetailsReducer.user.email
  }
}  
export const mapDispatchToProps = (dispatch:any)=>{
  return {
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ChangePassword);