import { withAITracking } from '@microsoft/applicationinsights-react-js';
import {  Alert, Box, Drawer, IconButton, MenuItem, Stack, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { connect } from 'react-redux';
import settings from '../appSettings.json';
import { appInsights, reactPlugin } from '../helpers/AppInsights';
import { SystemActions } from '../reducerActions/SystemActions';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { LoadingButton } from '@mui/lab';
import HttpWrapper from '../helpers/HttpWrapper';
import categories from '../constants/FeedbackCategories'

interface IFeedbackDrawerProps
{
    open:boolean,
    width:number,
    ToggleDrawer: (open:boolean)=> Promise<void>
}

interface IFeedbackDrawerState
{
    saving:boolean,
    saveSuccess:boolean,
    saveError:boolean,
    errorMessage:string,
    categoryError:boolean,
    messageError:boolean,
    category:string,
    message:string
}

class FeedbackDrawer extends React.Component<IFeedbackDrawerProps,IFeedbackDrawerState> {
  _httpWrapper:HttpWrapper = new HttpWrapper();

    constructor(props:IFeedbackDrawerProps)
    {
        super(props);
        this.state = {
            saving:false,
            saveSuccess:false,
            saveError:false,
            errorMessage:'',
            categoryError:false,
            messageError:false,
            category:categories[0],
            message:''
        }

        this._onCategoryChange=this._onCategoryChange.bind(this);
        this._onMessageChange=this._onMessageChange.bind(this);
        this._onSubmitClick=this._onSubmitClick.bind(this);
        this._successSubmit=this._successSubmit.bind(this);
        this._failureSubmit=this._failureSubmit.bind(this);
    }

  public render() {
    return(
        <Drawer 
            anchor='right'
            open={this.props.open}
            onClose={()=>this.props.ToggleDrawer(false)}
            >
                <Stack direction='column' sx={{p:2,width:this.props.width>330?'300px':this.props.width-30}}>
                    <Box sx={{textAlign:'right'}}>
                        <IconButton onClick={()=>this.props.ToggleDrawer(false)}>
                            <CloseIcon/>
                        </IconButton>
                    </Box>
                    <Typography
                        variant='h4'
                        align='center'
                        p={2}>
                        Support
                    </Typography>
                    {this.state.saveSuccess && <Alert   onClose={()=>{this.setState({saveSuccess:false})}} severity="success">Feedback sumbitted</Alert>}
                    {this.state.saveError && <Alert onClose={()=>{this.setState({saveError:false})}} severity="error">{this.state.errorMessage}</Alert>}
                    
                    <TextField 
                        select
                        required
                        fullWidth
                        margin='normal'
                        sx={{textAlign:'center'}}
                        label='Category'
                        value={this.state.category}
                        error={this.state.categoryError}
                        onChange={this._onCategoryChange}>
                        {
                            categories.map((s:string,index:number)=>
                            <MenuItem key={index} value={s}><Typography textAlign="center">{s}</Typography></MenuItem>
                            )
                        }
                    </TextField>

                    <TextField  
                        fullWidth
                        multiline
                        required
                        minRows={3}
                        label="Comments" 
                        type="text"
                        error={this.state.messageError}
                        value={this.state.message}
                        onChange={this._onMessageChange} 
                        variant='outlined'
                        margin='normal'
                    />
                    
                    <LoadingButton variant='contained'
                        color="primary"
                        fullWidth
                        size="medium"
                        endIcon={<SendIcon />}
                        loading={this.state.saving}
                        loadingPosition="end"
                        sx={{my:2}}
                        onClick={this._onSubmitClick}
                    >
                      Submit
                    </LoadingButton>


                </Stack>
            
        </Drawer>
    )
  }

  private _onCategoryChange(event: React.ChangeEvent<HTMLInputElement>)
  {
    this.setState({
      category: event?.target?.value ?? categories[0] ,
      saveSuccess:false,
      saveError:false,
      categoryError:false
    });
  }

  private _onMessageChange(event: React.ChangeEvent<HTMLInputElement>)
  {
    this.setState({
      message: event?.target?.value ?? '',
      saveSuccess:false,
      saveError:false,
      messageError:false
    });
  }

  private _validations()
  {
      var valid:boolean = true;
      if(!this.state.category)
      {
          this.setState({
              categoryError:true,
              saveSuccess:false
          });
          valid = false;
      }
      if( this.state.message?.length < 1)
      {
          this.setState({
              messageError:true,
              saveSuccess:false
          });
          valid = false;
      }
      return valid;
  }

  private _onSubmitClick = (): void => {
    appInsights.trackEvent({name:'Feedback submit button clicked',properties:{component:'FeedbackSubmitButton'}});

    if(!this._validations())
      return;

    this.setState({
      saveError:false,
      saveSuccess:false,
      saving:true
    });

    const body = {
      category:this.state.category,
      message:this.state.message
    }
    this._httpWrapper.postAuth(settings.general.sendFeedbackUrl,body,this._successSubmit,this._failureSubmit);
  }

  private _successSubmit(response){
    this.setState({
      saveSuccess:true,
      saveError:false,
      saving:false,
      category:categories[0],
      message:''
    });
  }

  private _failureSubmit(response){
    this.setState({
      saving:false,
      saveSuccess:false,
      saveError:true,
      errorMessage:response?.message ?? 'Please try again later'
    });
  }

}
export const mapStateToProps = (state:any)=>{
  return {
      open:state.systemReducer.feedbackDrawerOpen,
      width:state.systemReducer.width
  }
}  
export const mapDispatchToProps = (dispatch:any)=>{
  return {
    ToggleDrawer: (open:boolean)=>
      dispatch({
        type:SystemActions.OPEN_FEEDBACK_DRAWER,
        open:open
      })
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withAITracking(reactPlugin,FeedbackDrawer));