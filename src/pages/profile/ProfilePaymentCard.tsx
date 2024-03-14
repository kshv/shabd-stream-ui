import * as React from 'react';
import { Alert, CircularProgress, Stack, Box, Accordion, AccordionDetails, AccordionSummary, Typography} from '@mui/material';
import settings from '../../appSettings.json'
import HttpWrapper from '../../helpers/HttpWrapper';
import FileUploadCard from '../../components/FileUploadCard';
import { IProfilePayment } from '../../interfaces/IProfilePayment';
import ProfilePaymentForm from './ProfilePaymentForm';
import { connect } from 'react-redux';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export interface IProfilePaymentCardProps
{
  userId?:number
}

export interface IProfilePaymentCardState
{
  loadingProfile:boolean,
  loadError:boolean,
  errorMessage:string,
  profile?:IProfilePayment
}

class ProfilePaymentCard extends React.Component<IProfilePaymentCardProps,IProfilePaymentCardState>
{
  _httpWrapper:HttpWrapper = new HttpWrapper();

  constructor(props:IProfilePaymentCardProps)
  {
    super(props);
    this.state={
      loadingProfile:true,
      loadError:false,
      errorMessage:''
    };
    
    this._successGetProfile = this._successGetProfile.bind(this);
    this._failureGetProfile = this._failureGetProfile.bind(this);
  }

  componentDidMount()
  {
    this._httpWrapper.postAuth(settings.user.getProfilePaymentUrl,
      {userId:this.props.userId},
      this._successGetProfile,
      this._failureGetProfile);
  }

  private _successGetProfile(response)
  {
    this.setState({
      loadingProfile:false,
      loadError:false,
      profile:response.profile
    });
  }

  private _failureGetProfile(response)
  {
    this.setState({
      loadingProfile:false,
      loadError:true,
      errorMessage:response?.message ?? 'Unable to load profile. Please try again later.'
    });
  }

  public render() {
    return(
      <Accordion sx={{px:{xs:0,sm:2}}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="Payment profile">
          <Typography variant='h6'>Payment</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            {this.state.loadError && <Alert sx={{ width: '100%',margin:'12px' }}  onClose={()=>{this.setState({loadError:false})}} severity="error">{this.state.errorMessage}</Alert>}
            {this.state.loadingProfile && <CircularProgress size={30}/>}
            {!this.state.loadingProfile &&
              <Stack direction="column" spacing={2} justifyContent="flex-start" alignItems="stretch">
                <ProfilePaymentForm profile={this.state.profile} /> 
            
                <FileUploadCard label={'Identity/Address Proof (Aadhaar Card)'} 
                              filename={this.state.profile?.aadhaar ??''}
                              fileUrl={this.state.profile?.aadhaarServer}
                              inputType={'image/*'}
                              uploadURL={settings.user.uploadAadhaarProfileUrl}
                              />
                
                <FileUploadCard label={'PAN Card'} 
                              filename={this.state.profile?.panFile ??''}
                              fileUrl={this.state.profile?.panFileServer}
                              inputType={'image/*'}
                              uploadURL={settings.user.uploadPanProfileUrl}
                              />

              </Stack> 
            }
          </Box>
        </AccordionDetails>
      </Accordion>
    )
  }
}

export const mapStateToProps = (state:any)=>{
  return {
  }
}  
export const mapDispatchToProps = (dispatch:any)=>{
  return {
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfilePaymentCard);