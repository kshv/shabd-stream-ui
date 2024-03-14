import * as React from 'react';
import HttpWrapper from '../../helpers/HttpWrapper';
import { Stack, Typography, Paper, TextField, Button, Grid, IconButton, Divider} from '@mui/material';
import settings from '../../appSettings.json';
import SendIcon from '@mui/icons-material/Send';
import { LoadingButton } from '@mui/lab';
import AddIcon from '@mui/icons-material/Add';
import KeyValueObject from '../../interfaces/KeyValueObject';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

export interface IMeetingAddCardProps
{
  onAdd:()=>void
}

export interface IMeetingAddCardState
{
  saving:boolean,
  saveError:boolean,
  errorMessage:string,
  expanded:boolean,
  name:string,
  description:string,
  properties:KeyValueObject,
  nameError:boolean,
  descriptionError:boolean,
  key:string,
  value:string
}

class MeetingAddCard extends React.Component<IMeetingAddCardProps,IMeetingAddCardState> {
  _httpWrapper:HttpWrapper = new HttpWrapper();

  constructor(props:IMeetingAddCardProps)
  {
    super(props);
    this.state={
      saving:false,
      saveError:false,
      errorMessage:'',
      expanded:false,
      name:'',
      description:'',
      properties:{},
      nameError: false,
      descriptionError: false,
      key:'',
      value:''
    }
    this._removeKey=this._removeKey.bind(this);
    this._addKey=this._addKey.bind(this);
    this._onAddClick=this._onAddClick.bind(this);
  }

  public render() {
    return this.state.expanded?
        <Paper elevation={1} sx={{p:2, maxWidth:'md'}} >
          <Grid container justifyContent={'flex-start'} alignItems={'center'} spacing={1}>
            <Grid item xs={12}><Typography variant='h6'>Add Meeting</Typography></Grid>
            <Grid item xs={12}>
              <TextField  label="Name"
                        type="text"
                        value={this.state.name}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>)=>
                          this.setState({name:event?.target?.value ?? '', nameError:false, saveError:false})
                        }
                        fullWidth 
                        autoFocus
                        margin='normal'
                        error={this.state.nameError}
                        variant="outlined"
                        />
            </Grid>

            <Grid item xs={12}>
              <TextField  label="Description"
                        multiline
                        rows={2}
                        type="text"
                        value={this.state.description}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>)=>
                          this.setState({description:event?.target?.value ?? '', descriptionError:false, saveError:false})
                        }
                        fullWidth
                        margin='normal'
                        error={this.state.descriptionError}
                        variant="outlined"
                        />
            </Grid>


            <Grid item xs={12}><Divider flexItem variant='middle' sx={{my:2}} /></Grid>

            <Grid item xs={12}><Typography>Properties</Typography></Grid>
            {
              Object.entries(this.state.properties).map( ( [key, value]) => (
                <Grid item key={key} xs={12}>
                  <Grid container justifyContent={'flex-start'} alignItems={'center'}>
                    <Grid item xs={5}><Typography variant='body1'>{key}</Typography></Grid>
                    <Grid item xs={5}><Typography variant='body1'>{value}</Typography></Grid>
                    <Grid item xs={1}><IconButton size='small' onClick={()=>this._removeKey(key)}><DeleteIcon fontSize='small'/></IconButton></Grid>
                  </Grid>
                </Grid>
              ))
            }
            <Grid item xs={5}>
              <TextField  label="key"
                        type="text"
                        value={this.state.key}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>)=>
                          this.setState({key:event?.target?.value ?? ''})
                        }
                        fullWidth
                        size='small'
                        margin='dense'
                        variant="outlined"
                        />
            </Grid>
            <Grid item xs={5}>
              <TextField  label="value"
                        type="text"
                        value={this.state.value}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>)=>
                          this.setState({value:event?.target?.value ?? ''})
                        }
                        fullWidth
                        size='small'
                        margin='dense'
                        variant="outlined"
                        />
            </Grid>
            <Grid item xs={1}>
              <IconButton disabled={Object.keys(this.state.properties).includes(this.state.key)} 
                          onClick={this._addKey}>
                  <AddIcon/>
              </IconButton>
            </Grid>
            <Grid item xs={12}><Divider flexItem variant='middle' sx={{my:2}}/></Grid>
            <Grid item>
              <LoadingButton variant='contained'
                            size="large"
                            disabled={this.state.nameError || this.state.descriptionError}
                            endIcon={<SendIcon />}
                            loading={this.state.saving}
                            loadingPosition="end"
                            sx={{width:'150px'}}
                            onClick={this._onAddClick}
                            >
                <Typography variant='button' >Add</Typography>
              </LoadingButton>
            </Grid>
            <Grid item>
              <LoadingButton variant='outlined'
                            size="large"
                            loading={this.state.saving}
                            endIcon={<CloseIcon />}
                            loadingPosition="end"
                            sx={{width:'150px'}}
                            onClick={()=>this.setState({expanded:false})}
                            >
                <Typography variant='button' >Cancel</Typography>
              </LoadingButton>
            </Grid>
          </Grid> 
        </Paper>
      :<Button variant='outlined'
                onClick={()=>this.setState({expanded:true})}
              sx={{p:2, textTransform:'none', textAlign:'center', width:{xs:'300px',sm:'350px'}, height:{xs:'auto',sm:'210px'}}}>
          <Stack direction='column' justifyContent={'center'} alignItems={'center'} spacing={1} width={'100%'} height={'100%'}>
            <AddIcon fontSize='large' sx={{fontSize:48}}/>
            <Typography variant='h5'>Add Meeting</Typography>
          </Stack>
      </Button>
    
  }
  private _removeKey = (key:string) => {
    const updatedObject = { ...this.state.properties };
    delete updatedObject[key];
    this.setState({properties:updatedObject});
  };
  private _addKey = () => {
    const updatedObject = { ...this.state.properties,[this.state.key]:this.state.value };
    this.setState({properties:updatedObject,key:'',value:''});
  };

  private validations= () => {
    var valid:boolean = true;
    if(this.state.name.length===0)
    {
      this.setState({nameError:true});
      valid = false;
    }
    if(this.state.description.length===0)
    {
      this.setState({descriptionError:true});
      valid = false;
    }
    return valid;
  }

  private _onAddClick= () => {
    if(!this.validations())
      return false;

    this.setState({
      saving:true,
      saveError:false,
      errorMessage:''
    });

    this._httpWrapper.postAuth(settings.meetings.addMeetingUrl,
      {
        name:this.state.name,
        desc:this.state.description,
        properties:this.state.properties
      },
      (response) => {
        this.setState({
          expanded:false,
          saving:false,
          saveError:false,
          errorMessage:''
        });
        this.props.onAdd();
      },
      (response) => {
        this.setState({
          saving:false,
          saveError:true,
          errorMessage:response?.message ?? 'Please try again later'
        })
      }
    );
  }
}



export default MeetingAddCard;