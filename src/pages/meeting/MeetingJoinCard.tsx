import * as React from 'react';
import HttpWrapper from '../../helpers/HttpWrapper';
import { Stack, Typography, Paper, TextField, Alert} from '@mui/material';
import settings from '../../appSettings.json';
import SendIcon from '@mui/icons-material/Send';
import { LoadingButton } from '@mui/lab';

export interface IMeetingJoinCardProps
{
  onJoin:()=>void
}

export interface IMeetingJoinCardState
{
  joining:boolean,
  joinError:boolean,
  joinSuccess:boolean,
  errorMessage:string,
  code:string
}

class MeetingJoinCard extends React.Component<IMeetingJoinCardProps,IMeetingJoinCardState> {
  _httpWrapper:HttpWrapper = new HttpWrapper();

  constructor(props:IMeetingJoinCardProps)
  {
    super(props);
    this.state={
      joining:false,
      joinError:false,
      joinSuccess:false,
      errorMessage:'',
      code:''
    }

    this._onJoinClick = this._onJoinClick.bind(this);
  }

  private _onJoinClick()
  {
    this.setState({
      joining:true,
      joinError:false,
      joinSuccess:false,
      errorMessage:''
    });

    this._httpWrapper.postAuth(settings.meetings.joinMeetingUrl,{code:this.state.code},
      (response) => {
        this.setState({
          code:'',
          joining:false,
          joinError:false,
          joinSuccess:true,
          errorMessage:''
        });
        this.props.onJoin();
      },
      (response) => {
        this.setState({
          code:'',
          joining:false,
          joinError:true,
          joinSuccess:false,
          errorMessage:response?.message ?? 'Please try again later'
        })
      }
    );
  }

  public render() {
    return(
      <Paper elevation={0} 
            sx={{textTransform:'none',
                  color:'#1976d2',
                  border:'1px solid #1976d280',
                  width:{xs:'300px',sm:'350px'},
                  height:{xs:'auto',sm:'210px'}}}>
        <Stack direction='column' justifyContent={'flex-start'} alignItems={'flex-start'} p={2} spacing={3} height={'100%'}>
          <Typography variant='h5'>
            Join a meeting
          </Typography>
          <TextField  label="Code"
                      type="text"
                      value={this.state.code}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>)=>
                        this.setState({code:event?.target?.value ?? '',
                                      joinError:false,
                                      joinSuccess:false})
                      }
                      fullWidth 
                      size='small'
                      variant="outlined"
                      />
          {!(this.state.joinError || this.state.joinSuccess) &&
          <LoadingButton variant='contained'
                          fullWidth
                          size="large"
                          disabled={this.state.code.length===0}
                          endIcon={<SendIcon />}
                          loading={this.state.joining}
                          loadingPosition="end"
                          onClick={this._onJoinClick}
                          >
              <Typography variant='button' >Submit</Typography>
          </LoadingButton>
          }
          {this.state.joinSuccess && <Alert sx={{my:2}} onClose={()=>{this.setState({joinSuccess:false})}} severity="success">Join Successful</Alert>}
          {this.state.joinError && <Alert sx={{my:2}} onClose={()=>{this.setState({joinError:false})}} severity="error">{this.state.errorMessage}</Alert>}
        </Stack>
      </Paper>
    )
  }
}



export default MeetingJoinCard;