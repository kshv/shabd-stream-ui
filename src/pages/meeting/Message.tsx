import * as React from 'react';
import { Paper, Skeleton, Stack, Typography} from '@mui/material';
import { IMessage } from '../../interfaces/IMessage';

export interface IMessageCardProps
{
  clientId:string,
  message:IMessage,
  isRecording:boolean
}

export interface IMessageCardState
{
  
}

class MessageCard extends React.Component<IMessageCardProps,IMessageCardState> {
  constructor(props:IMessageCardProps)
  {
    super(props);
    this.state={
    }
  }

  public render() {
    return(
      <Stack 
        direction={'column'} 
        p={2}
        alignItems={this.props.message.clientId===this.props.clientId?"justify-end":"justify-start"}>

        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography variant='caption'>{this.props.message.name}&emsp;</Typography>
          <Typography variant='caption'>{this.props.message.timestamp}</Typography>
        </Stack> 
        <Paper elevation={1} sx={{p:2}}>
          <Stack direction={"row"} justifyContent={'justify-start'} alignItems={'center'}>
            <Typography variant={"body1"} display="inline">{this.props.message.processedText}</Typography>
            {this.props.message.text.length>0 &&
              <Typography variant={"body1"} display="inline" sx={{ fontStyle: 'italic' }}>{this.props.message.text}</Typography>
            }
            {this.props.message.text.length>0 && this.props.isRecording && new Date(this.props.message.timestamp).getTime()-Date.now()<5000 &&
              <Stack direction={'row'} pl={1} spacing={1}>
                <Skeleton variant="circular" width={10} height={10} />
                <Skeleton variant="circular" width={10} height={10} />
                <Skeleton variant="circular" width={10} height={10} />
              </Stack>
            }
          </Stack>
        </Paper>
      </Stack>
    )
  }
}
export default MessageCard;