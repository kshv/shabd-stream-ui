import * as React from 'react';
import { withAITracking } from '@microsoft/applicationinsights-react-js';
import { appInsights, reactPlugin } from "../../helpers/AppInsights";
import { connect } from 'react-redux';
import Routes from '../../constants/Routes';
import { Button, Stack, Typography} from '@mui/material';
import SocketWrapper from '../../helpers/SocketWrapper';
import { IMessage } from '../../interfaces/IMessage';
import MessageCard from './Message';
import RecorderBase from './RecorderBase';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';

export interface IMeetingPageProps
{
  username:string
}

export interface IMeetingPageState
{
  loading:boolean,
  loadError:boolean,
  errorMessage:string,
  clientId:string,
  messages:IMessage[],
  isRecording:boolean,
}

class MeetingPage extends React.Component<IMeetingPageProps,IMeetingPageState> {
  socket:SocketWrapper;
  _recorder:RecorderBase;
  _audioContext:AudioContext;
  
  constructor(props:IMeetingPageProps)
  {
    super(props);
    this.state={
      loading:true,
      loadError:false,
      errorMessage:'',
      clientId:"",
      messages:[],
      isRecording:false
    }
    appInsights.trackPageView({name:'MeetingPage',uri:Routes.home});
    window.scrollTo(0, 0);
    this._initRecorder = this._initRecorder.bind(this);
    this._onTextReceived = this._onTextReceived.bind(this);
    this._onRecordClick = this._onRecordClick.bind(this);
    this._onRecordStopClick = this._onRecordStopClick.bind(this);
    this._sendToSocket = this._sendToSocket.bind(this);
    this.socket = new SocketWrapper(
                (clientId:string)=>this.setState({clientId:clientId}),
                this._onTextReceived,
                ()=>{this.socket.connect(this.props.username,'hindi')},
                "text_translation");
    
  }

  private _sendToSocket(data)
  {
    this.socket.streamAudio(data);
  }
  
  private async _initRecorder()
  {
    try {
      this._audioContext = new AudioContext({sampleRate:16000});
      var audStream = await navigator.mediaDevices.getUserMedia({audio: true});
      var input = this._audioContext.createMediaStreamSource(audStream);
      this._recorder = new RecorderBase(input);
      this._recorder.setExportBuffer(this._sendToSocket)
    } 
    catch (e) {
      alert('No web audio support in this browser!');
    }
  }


  _onTextReceived(response){
    var exists = false;
    var messages = this.state.messages.map((m:IMessage)=>{
      if(m.id === response.id)
      {
        exists = true;
        m.processedText = response.pt;
        m.text = response.t
      }
      return m;
    })
    if(!exists)
    {
      messages.push({
        id:response.id,
        processedText:response.pt,
        text:response.t,
        name:response.name,
        clientId:response.cid,
        timestamp: (new Date()).toLocaleTimeString()
      })
    }
    this.setState({messages:messages})
  }

  componentDidMount()
  {
    this.socket.connect(this.props.username,'hindi');
  }

  componentWillUnmount(): void {
    this.socket.disconnect();
  }

  public render() {
    return(
      <Stack direction={"column"} justifyContent="space-between" alignItems="flex-start" px={2} py={2} maxWidth={'md'}>
        <Typography variant="h6">Meeting </Typography>
        
        {this.state.messages.map((message:IMessage)=>(
           <MessageCard key={message.id} message={message} clientId={this.state.clientId} isRecording={this.state.isRecording}/>
        ))}
        { this.state.isRecording ?
              <Button variant='contained'
                    color="error"
                    size="medium"
                    endIcon={<StopIcon />}
                    sx={{marginTop:2,width:'250px'}}
                    onClick={this._onRecordStopClick}
                    >
                  Stop
              </Button>
              :
              <Button variant='contained'
                      color="primary"
                      size="medium"
                      endIcon={<MicIcon />}
                      sx={{marginTop:2,width:'250px'}}
                      onClick={this._onRecordClick}
                      >
                Record
              </Button>
              
            }
      </Stack>
    )
  }

  private async _onRecordClick()
  {
    await this._initRecorder();
    this._recorder.record();
    this.setState({isRecording:true});
  }

  private async _onRecordStopClick()
  {
    this._recorder && this._recorder.stop();
    this.setState({isRecording:false});
  }
}


export const mapStateToProps = (state:any)=>{
  return {
    username:state.userDetailsReducer?.user?.name,
  }
}

export const mapDispatchToProps = (dispatch:any)=>{
  return {
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withAITracking(reactPlugin,MeetingPage));