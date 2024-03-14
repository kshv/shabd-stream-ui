import * as React from 'react';
import { withAITracking } from '@microsoft/applicationinsights-react-js';
import { appInsights, reactPlugin } from "../../helpers/AppInsights";
import { connect } from 'react-redux';
import HttpWrapper from '../../helpers/HttpWrapper';
import Routes from '../../constants/Routes';
import { Button, Grid, IconButton, Stack, Typography, CircularProgress} from '@mui/material';
import { Link } from 'react-router-dom';
import { IMeeting } from '../../interfaces/IMeeting';
import settings from '../../appSettings.json';
import { UserActions } from '../../reducerActions/UserActions';
import RefreshIcon from '@mui/icons-material/Refresh';
import colors from '../../constants/colors';
import MeetingJoinCard from './MeetingJoinCard';
import MeetingAddCard from './MeetingAddCard';

export interface IMeetingsListPageProps
{
  userRole:number,
  MeetingSelected: (meeting:IMeeting)=>Promise<void>
}

export interface IMeetingsListPageState
{
  loading:boolean,
  loadError:boolean,
  errorMessage:string,
  meetings:IMeeting[]
}

class MeetingsListPage extends React.Component<IMeetingsListPageProps,IMeetingsListPageState> {
  _httpWrapper:HttpWrapper = new HttpWrapper();

  constructor(props:IMeetingsListPageProps)
  {
    super(props);
    this.state={
      loading:true,
      loadError:false,
      errorMessage:'',
      meetings:[]
    }
    appInsights.trackPageView({name:'MeetingsListPage',uri:Routes.home});
    window.scrollTo(0, 0);
    this._refresh = this._refresh.bind(this);
  }

  componentDidMount()
  {
    sessionStorage.setItem('meetingId',"0");
    this._refresh();
  }

  private _refresh()
  {
    this.setState({
      meetings:[],
      loading:true,
      loadError:false,
      errorMessage:''
    });

    this._httpWrapper.getAuth(settings.meetings.getMeetingsForUserUrl,
      (response) => {
        this.setState({
          loading:false,
          meetings:response.meetings
        })
      },
      (response) => {
        this.setState({
          loading:false,
          loadError:true,
          errorMessage:response?.message ?? 'Please try again later'
        })
      }
    );
  }

  public render() {
    return(
      <Grid container rowSpacing={2} columnSpacing={4} justifyContent="flex-start" alignItems="flex-start" px={2} py={2}>
        <Grid item xs={12} sx={{my:2}}>
          <Stack direction='row' justifyContent={'flex-start'} alignItems='center'>
            <Typography variant='h4' sx={{fontWeight:550}}>
              Meetings
            </Typography>
            <IconButton sx={{ml:2}} onClick={this._refresh}>
              <RefreshIcon/>
            </IconButton>
          </Stack>
        </Grid>

        {this.state.meetings.map((meeting:IMeeting)=>(
           <Grid item key={meeting.meetingId} >
              <Button variant='outlined'
                      component={Link}
                      to={Routes.meeting+'/'+meeting.meetingId}
                      onClick={()=>this._onMeetingSelected(meeting)}
                      sx={{p:2,textTransform:'none', width:{xs:'300px',sm:'350px'}, height:{xs:'auto',sm:'210px'}, bgcolor:meeting.completed?colors.completed:colors.new}}>
                  <Stack direction='column' spacing={1} width={'100%'} height={'100%'}>
                    <Typography variant='h5' sx={{height:{xs:'auto',sm:'75px'}}}>
                      {meeting.name}
                    </Typography>

                    <Typography variant='body1' sx={{height:{xs:'auto',sm:'90px'}}}>
                      {meeting.description}
                    </Typography>
                  </Stack>
              </Button>
       </Grid>
        ))}

       <Grid item><MeetingJoinCard onJoin={this._refresh}/></Grid>
        <Grid item><MeetingAddCard onAdd={this._refresh}/></Grid>

       {
        this.state.loading &&
        <Grid item xs={12}>
          <CircularProgress size={48}/>
        </Grid>
       }

      </Grid>
    )
  }

  private _onMeetingSelected(meeting:IMeeting){
    sessionStorage.setItem('meetingId',`${meeting.meetingId}`);
    this.props.MeetingSelected(meeting)
  }
}


export const mapStateToProps = (state:any)=>{
  return {
    userRole:state.userDetailsReducer?.user?.role
  }
}

export const mapDispatchToProps = (dispatch:any)=>{
  return {
    MeetingSelected: (meeting:IMeeting)=>
      dispatch({
        type:UserActions.MEETING_SELECTED,
        meeting:meeting
      }),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withAITracking(reactPlugin,MeetingsListPage));