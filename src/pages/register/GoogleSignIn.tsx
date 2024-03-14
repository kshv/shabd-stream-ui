import * as React from 'react';
import { Box } from '@mui/material';
import settings from '../../appSettings.json'
import HttpWrapper from '../../helpers/HttpWrapper';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

export interface IGoogleSignInProps
{
  onSuccess: (response)=> void,
  onFailure: (response)=> void
}

export interface IGoogleSignInState
{
  signingIn:boolean,
  signInError:boolean,
  signInSuccess:boolean,
  errorMessage:string,
  token:string
}

class GoogleSignIn extends React.Component<IGoogleSignInProps,IGoogleSignInState>
{
  _httpWrapper:HttpWrapper = new HttpWrapper();
  constructor(props:IGoogleSignInProps)
  {
    super(props);
    this.state={
      signingIn:false,
      signInError:false,
      signInSuccess:false,
      errorMessage:'',
      token:''
    };

    this._failureSignIn = this._failureSignIn.bind(this);
    this._onSuccess = this._onSuccess.bind(this);
    this._successSignIn = this._successSignIn.bind(this);
  }


  public render() {
        return(
          <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENTID ?? ''}>
            <Box sx={{display:{xs:'flex',sm:'none'}, justifyContent:'center'}}>
              <GoogleLogin size='large' width='280px' onSuccess={this._onSuccess} onError={()=>this._failureSignIn({status:false})}/>
            </Box>
            <Box sx={{display:{xs:'none',sm:'flex'}, justifyContent:'center' }}>
              <GoogleLogin size='large' width='350px' onSuccess={this._onSuccess} onError={()=>this._failureSignIn({status:false})}/>
            </Box>
          </GoogleOAuthProvider>
      )
  }

  private _onSuccess = (response:any): void => {
    this.setState({
      signingIn:true,
      signInError:false,
      signInSuccess:false
    })

    const body = {
      a:response.clientId,
      b:response.credential
    }
    this._httpWrapper.post(settings.user.googleLoginUrl,body,this._successSignIn,this._failureSignIn);
  }

  private _successSignIn(response){
    this.setState({signingIn:false,signInError:false,signInSuccess:true,token:response.token});
    this.props.onSuccess({token:response.token});
  }

  private _failureSignIn(response){
    this.setState({
      signingIn:false,
      signInError:true,
      errorMessage:response?.message ?? 'Please try again later'
    });
    this.props.onFailure(response);
  }

}


export default GoogleSignIn;