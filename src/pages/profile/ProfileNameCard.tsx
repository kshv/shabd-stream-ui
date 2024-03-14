import * as React from 'react';
import { withAITracking } from '@microsoft/applicationinsights-react-js';
import { reactPlugin } from "../../helpers/AppInsights";
import { connect } from 'react-redux';
import { TextField, Typography, Alert, CircularProgress, Grid, Accordion, AccordionDetails, AccordionSummary} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import settings from '../../appSettings.json'
import HttpWrapper from '../../helpers/HttpWrapper';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface IProfileNameCardProps
{
  onSave?:()=>void
}

export interface IProfileNameCardState
{
  loadingProfile:boolean,
  saving:boolean,
  saveSuccess:boolean,
  saveError:boolean,
  errorMessage:string,
  name:string,
  email:string
  nameError:boolean,
}

class ProfileNameCard extends React.Component<IProfileNameCardProps,IProfileNameCardState>
{
  _httpWrapper:HttpWrapper = new HttpWrapper();

  constructor(props:IProfileNameCardProps)
  {
    super(props);
    this.state={
      loadingProfile:true,
      saving:false,
      saveSuccess:false,
      saveError:false,
      errorMessage:'',
      name:'',
      email:'',
      nameError:false
    };

    this._onNameChange = this._onNameChange.bind(this);
    
    this._onSaveClick = this._onSaveClick.bind(this);
    this._successSave = this._successSave.bind(this);
    this._failureSave = this._failureSave.bind(this);
    this._successGetProfile = this._successGetProfile.bind(this);
    this._failureGetProfile = this._failureGetProfile.bind(this);

    window.scrollTo(0, 0);
  }

  componentDidMount()
  {
    this._httpWrapper.getAuth(settings.user.personalProfileGetUrl,this._successGetProfile,this._failureGetProfile);
  }

  private _successGetProfile(response)
  {
    this.setState({
      loadingProfile:false,
      name:response.profile.name ?? '',
      email:response.profile.email ?? ''
    });
  }

  private _failureGetProfile(response)
  {
    this.setState({
      loadingProfile:false
    });
  }

  public render() {
    return(
      <Accordion sx={{px:{xs:0,sm:2}}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="Profile Name">
          <Typography variant='h6'>Name</Typography>
        </AccordionSummary>
        <AccordionDetails>

        <Grid container direction="row" spacing={1} justifyContent="space-between" alignItems="center">
          {this.state.loadingProfile && <Grid item xs={12}><CircularProgress size={30}/></Grid>}

          <Grid item xs={12}>
            <TextField  
              label="Name" 
              type="name"
              required
              size='small'
              error={this.state.nameError}
              // inputProps={{style: { textAlign: 'center' }}}
              value={this.state.name}
              onChange={this._onNameChange} 
              autoComplete='name' 
              variant='outlined'
              fullWidth
              margin='normal'
                      />
          </Grid>
          <Grid item xs={12}>
            <TextField  
              label="Email" 
              type="email"
              required
              size='small'
              value={this.state.email}
              disabled={true}
              variant='outlined'
              fullWidth
              margin='normal'
                      />
          </Grid>
          <Grid item>
            <LoadingButton variant='contained'
                    color="primary"
                    size="small"
                    endIcon={<SendIcon />}
                    loading={this.state.saving}
                    loadingPosition="end"
                    sx={{mt:2}}
                    onClick={this._onSaveClick}
                    >
              Save
            </LoadingButton>
          </Grid>
          {this.state.saveSuccess && <Grid item xs={12}><Alert onClose={()=>{this.setState({saveSuccess:false})}} severity="success">Profile updated successfully</Alert></Grid>}
          {this.state.saveError && <Grid item xs={12}><Alert onClose={()=>{this.setState({saveError:false})}} severity="error">{this.state.errorMessage}</Alert></Grid>}
          </Grid>
          </AccordionDetails>
      </Accordion>
    )
  }

  private _onNameChange(event: React.ChangeEvent<HTMLInputElement>)
  {
    this.setState({
      name:event?.target?.value ?? '',
      saveSuccess:false,
      saveError:false,
      nameError:false
    });
  }

  private _validations()
  {
    var valid:boolean=true;
    if(!this.state.name?.length)
    {
      valid=false;
      this.setState({
        nameError:true
      });
    }
    return valid;
  }

  private _onSaveClick = (): void => {
    if(!this._validations())
      return;

    this.setState({
      saveError:false,
      saveSuccess:false,
      saving:true
    });

    const body = {
      name:this.state.name
    }
    this._httpWrapper.postAuth(settings.user.personalProfileSaveUrl,body,this._successSave,this._failureSave);
  }

  private _successSave(response){
    this.setState({
      saveSuccess:true,
      saveError:false,
      saving:false,
    });
    if(this.props.onSave)
      this.props.onSave();
  }

  private _failureSave(response){
    this.setState({
      saving:false,
      saveSuccess:false,
      saveError:true,
      errorMessage:response?.message ?? 'Please try again later'
    });
  }

}

export const mapStateToProps = (state:any)=>{
  return {}
}  
export const mapDispatchToProps = (dispatch:any)=>{
  return {
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withAITracking(reactPlugin,ProfileNameCard));