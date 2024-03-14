import * as React from 'react';
import { TextField, Grid, Typography,Alert, MenuItem, CircularProgress, Accordion, AccordionDetails, AccordionSummary} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import settings from '../../appSettings.json'
import HttpWrapper from '../../helpers/HttpWrapper';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export interface IProfileBasicCardProps
{
  userId?:number,
  defaultExpanded?:boolean
}

export interface IProfileBasicCardState
{
  loading:boolean,
  loadError:boolean,
  saving:boolean,
  saveSuccess:boolean,
  saveError:boolean,
  errorMessage:string,
  name:string,
  mobile:string,
  gender:string,
  age:string,
  mobileError:boolean,
  genderError:boolean,
  ageError:boolean
}

class ProfileBasicCard extends React.Component<IProfileBasicCardProps,IProfileBasicCardState>
{
  _httpWrapper:HttpWrapper = new HttpWrapper();

  constructor(props:IProfileBasicCardProps)
  {
    super(props);
    this.state={
      loading:false,
      loadError:false,
      saving:false,
      saveSuccess:false,
      saveError:false,
      errorMessage:'',
      name:'',
      mobile:'',
      gender:'',
      age:'',
      mobileError:false,
      genderError:false,
      ageError:false,
    };
    
    this._onSaveClick = this._onSaveClick.bind(this);

  }

  componentDidMount()
  {
    this._httpWrapper.postAuth(settings.user.getProfileBasicUrl,
      {userId:this.props.userId},
      (response)=>  this.setState({
              loading:false,
              loadError:false,
              name:response?.profile.name ?? '',
              mobile:response?.profile.mobile ?? '',
              gender:response?.profile.gender ?? '',
              age:response?.profile.age ?? ''
            }),
      (response)=>  this.setState({
              loading:false,
              loadError:true,
              errorMessage:response?.message ?? 'Unable to load profile. Please try again later.'
            })      
    );
  }

  public render() {
    return(
      <Accordion defaultExpanded={this.props.defaultExpanded} sx={{px:{xs:0,sm:2}}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="Basic profile">
          <Typography variant='h6'>Basic</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {this.state.loading && <Grid item xs={12}><CircularProgress size={30}/></Grid>}

          <Grid container direction="row" spacing={1} justifyContent="space-between" alignItems="center">

            <Grid item xs={12} sm= {6} md={6}>
              <TextField  
                label="Name" 
                type="Name"
                required
                size='small'
                value={this.state.name}
                onChange={()=>{}}
                variant='outlined'
                fullWidth
                margin='normal'
                        />
            </Grid>

            <Grid item xs={12} sm= {6} md={6}>
              <TextField  
                label="Mobile" 
                type="mobile"
                required
                size='small'
                error={this.state.mobileError}
                value={this.state.mobile}
                onChange={(event: React.ChangeEvent<HTMLInputElement>)=>
                    {
                      const num = event?.target?.value ?? '';
                      if(!isNaN(+num) && num.length<=10)
                        this.setState({
                          mobile:num,
                          mobileError:false,
                          saveError:false,
                          saveSuccess:false
                        })
                    }} 
                autoComplete='mobile' 
                variant='outlined'
                fullWidth
                margin='normal'
                        />
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <TextField 
                select
                fullWidth
                required
                margin='normal'
                size='small'
                label='Gender'
                value={this.state.gender}
                error={this.state.genderError}
                onChange={(event: React.ChangeEvent<HTMLInputElement>)=>
                  {
                      this.setState({
                        gender:event?.target?.value ?? '',
                        genderError:false,
                        saveError:false,
                        saveSuccess:false
                      })
                  }} >
                <MenuItem key={'Male'} value={'Male'}><Typography >Male</Typography></MenuItem>
                <MenuItem key={'Female'} value={'Female'}><Typography >Female</Typography></MenuItem>
                <MenuItem key={'Others'} value={'Others'}><Typography >Others</Typography></MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm= {6} md={6}>
              <TextField 
                fullWidth
                required
                margin='normal'
                size='small'
                label='Age'
                value={this.state.age}
                error={this.state.ageError}
                onChange={(event: React.ChangeEvent<HTMLInputElement>)=>
                  {
                    const num = event?.target?.value ?? '';
                    if(!isNaN(+num))
                      this.setState({
                        age:num,
                        ageError:false,
                        saveError:false,
                        saveSuccess:false
                      })
                  }} />
            </Grid>

            <Grid item>
              <LoadingButton variant='contained'
                    color="primary"
                    fullWidth
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

            {this.state.saveSuccess && <Grid item xs={12}> <Alert onClose={()=>{this.setState({saveSuccess:false})}} severity="success">Profile updated successfully</Alert></Grid>}
            {this.state.saveError && <Grid item xs={12}><Alert onClose={()=>{this.setState({saveError:false})}} severity="error">{this.state.errorMessage}</Alert></Grid>}
            {this.state.loadError && <Grid item xs={12}><Alert onClose={()=>{this.setState({loadError:false})}} severity="error">{this.state.errorMessage}</Alert></Grid>}

          </Grid>

        </AccordionDetails>
      </Accordion>
    )
  }

  private _validations()
  {
    var valid:boolean=true;
    if(!this.state.mobile?.length)
    {
      valid=false;
      this.setState({
        mobileError:true
      });
    }

    if(!this.state.age?.length)
    {
      valid=false;
      this.setState({
        ageError:true
      });
    }

    if(!this.state.gender?.length)
    {
      valid=false;
      this.setState({
        genderError:true
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
      userId:this.props.userId,
      mobile: this.state.mobile,
      gender: this.state.gender,
      age: this.state.age
    }

    this._httpWrapper.postAuth(settings.user.saveProfileBasicUrl,body,
      (response)=>
        this.setState({
          saveSuccess:true,
          saveError:false,
          saving:false,
        }),
      (response)=>
          this.setState({
            saving:false,
            saveSuccess:false,
            saveError:true,
            errorMessage:response?.message ?? 'Please try again later'
          })
    );
  }
}

export default ProfileBasicCard;