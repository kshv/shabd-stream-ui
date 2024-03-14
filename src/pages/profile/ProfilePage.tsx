import * as React from 'react';
import { withAITracking } from '@microsoft/applicationinsights-react-js';
import { appInsights, reactPlugin } from "../../helpers/AppInsights";
import { Box, Stack} from '@mui/material';
import ProfileBasicCard from './ProfileBasicCard';
import ProfileLanguagesCard from './ProfileLanguagesCard';
import ProfilePaymentCard from './ProfilePaymentCard';
import ProfileNameCard from './ProfileNameCard';
import ChangePassword from './ChangePassword';

export interface IProfilePageProps
{
  userId?:number
  route:string,
  name?:boolean,
  changePassword?:boolean,
  basic?:boolean,
  location?:boolean,
  language?:boolean,
  payment?:boolean,
  p?:number
}

export interface IProfilePageState
{
}

class ProfilePage extends React.Component<IProfilePageProps,IProfilePageState>
{

  constructor(props:IProfilePageProps)
  {
    super(props);
    this.state={
    };

    appInsights.trackPageView({name:'ProfilePage',uri:this.props.route});
    window.scrollTo(0, 0);
  }

  public render() {
    return(
        <Box sx={{maxWidth:'md'}}>
          <Stack direction="column" spacing={2} justifyContent="flex-start" alignItems="stretch" p={this.props.p??0}>
            {this.props.name && <ProfileNameCard/>}
            {this.props.changePassword && <ChangePassword/>}
            {this.props.basic && <ProfileBasicCard userId={this.props.userId}/>}
            {this.props.language && <ProfileLanguagesCard userId={this.props.userId}/>}
            {this.props.payment && <ProfilePaymentCard userId={this.props.userId}/>}
          </Stack>
        </Box>
    )
  }
}

export default withAITracking(reactPlugin,ProfilePage);