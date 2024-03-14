import * as React from 'react';
import { Paper, TextField, Grid, Alert} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import settings from '../../appSettings.json'
import HttpWrapper from '../../helpers/HttpWrapper';
import { IProfilePayment } from '../../interfaces/IProfilePayment';


export interface IProfilePaymentFormProps
{
  userId?:number,
  profile?:IProfilePayment
}

export interface IProfilePaymentFormState
{
  saving:boolean,
  saveSuccess:boolean,
  saveError:boolean,
  errorMessage:string,
  upiId:string,
  payeeName:string,
  aadhaarNo:string,
  panNo:string,
  upiIdError:boolean,
  payeeNameError:boolean,
  aadhaarNoError:boolean,
  panNoError:boolean  
}

class ProfilePaymentForm extends React.Component<IProfilePaymentFormProps,IProfilePaymentFormState>
{
  _httpWrapper:HttpWrapper = new HttpWrapper();

  constructor(props:IProfilePaymentFormProps)
  {
    super(props);
    this.state={
      saving:false,
      saveSuccess:false,
      saveError:false,
      errorMessage:'',
      upiId:props.profile?.upiId ??'',
      payeeName:props.profile?.payeeName ??'',
      aadhaarNo:props.profile?.aadhaarNo ?? '',
      panNo:props.profile?.panNo ?? '',
      upiIdError:false,
      payeeNameError:false,
      aadhaarNoError:false,
      panNoError:false
    };
    
    this._onSaveClick = this._onSaveClick.bind(this);
  }

  public render() {
    return(
        <Paper elevation={2} sx ={{p:2, display: "flex", flexDirection: "column", alignItems:'center'}}>
          
          {this.state.saveSuccess && <Alert sx={{ width: '100%',margin:'12px' }}  onClose={()=>{this.setState({saveSuccess:false})}} severity="success">Profile updated successfully</Alert>}
          {this.state.saveError && <Alert sx={{ width: '100%',margin:'12px' }}  onClose={()=>{this.setState({saveError:false})}} severity="error">{this.state.errorMessage}</Alert>}
            
          <Grid container direction="row" spacing={1} justifyContent="space-between" alignItems="center">


            <Grid item xs={12}>
              <TextField  
                label="Payee Name" 
                type="name"
                required
                size='small'
                error={this.state.payeeNameError}
                value={this.state.payeeName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>)=>
                    {
                      this.setState({
                        payeeName:event?.target?.value ?? '',
                        payeeNameError:false,
                        saveError:false,
                        saveSuccess:false
                      })
                    }} 
                variant='outlined'
                fullWidth
                margin='normal'
                        />
            </Grid>

            <Grid item xs={12}>
              <TextField  
                label="UPI Id" 
                type="UPI"
                required
                size='small'
                error={this.state.upiIdError}
                value={this.state.upiId}
                onChange={(event: React.ChangeEvent<HTMLInputElement>)=>
                    {
                        this.setState({
                          upiId:event?.target?.value ?? '',
                          upiIdError:false,
                          saveError:false,
                          saveSuccess:false
                        })
                    }} 
                variant='outlined'
                fullWidth
                margin='normal'
                        />
            </Grid>
            
            <Grid item xs={12}>
              <TextField  
                label="Aadhaar No." 
                type="aadhaar"
                size='small'
                error={this.state.aadhaarNoError}
                value={this.state.aadhaarNo}
                onChange={(event: React.ChangeEvent<HTMLInputElement>)=>
                    {
                        this.setState({
                          aadhaarNo:event?.target?.value ?? '',
                          aadhaarNoError:false,
                          saveError:false,
                          saveSuccess:false
                        })
                    }} 
                variant='outlined'
                fullWidth
                margin='normal'
                        />
            </Grid>

            <Grid item xs={12}>
              <TextField  
                label="PAN No." 
                type="pan"
                size='small'
                error={this.state.panNoError}
                value={this.state.panNo}
                onChange={(event: React.ChangeEvent<HTMLInputElement>)=>
                    {
                        this.setState({
                          panNo:event?.target?.value ?? '',
                          panNoError:false,
                          saveError:false,
                          saveSuccess:false
                        })
                    }} 
                variant='outlined'
                fullWidth
                margin='normal'
                        />
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
          </Grid>
      </Paper>
    )
  }

  private _validations()
  {
    var valid:boolean=true;

    if(this.state.payeeName.length === 0)
    {
      valid=false;
      this.setState({
        payeeNameError:true
      });
    }

    if(this.state.upiId.length === 0)
    {
      valid=false;
      this.setState({
        upiIdError:true
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
      upiId: this.state.upiId,
      payeeName: this.state.payeeName,
      aadhaarNo: this.state.aadhaarNo,
      panNo: this.state.panNo,
    }

    this._httpWrapper.postAuth(settings.user.saveProfilePaymentUrl,body,
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

export default ProfilePaymentForm;