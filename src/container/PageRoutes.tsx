import { Box, Backdrop, CircularProgress } from '@mui/material';
import * as React from 'react';
import { connect } from 'react-redux';
import { Routes as RoutesSwitch,Route} from "react-router-dom";
import Routes from '../constants/Routes';

const SignInPage = React.lazy(() => import('../pages/register/SignInPage'));
const RegistrationPage = React.lazy(() => import('../pages/register/RegistrationPage'));
const ForgotPasswordPage = React.lazy(() => import('../pages/register/ForgotPasswordPage'));
const ResetPasswordPage = React.lazy(() => import('../pages/register/ResetPasswordPage'));
const ContactUsPage = React.lazy(() => import('../pages/landing/ContactUsPage'));
const TermsOfUsePage = React.lazy(() => import('../pages/legal/TermsOfUsePage'));
const PrivacyPolicyPage = React.lazy(() => import('../pages/legal/PrivacyPolicyPage'));
const ProfilePage = React.lazy(() => import('../pages/profile/ProfilePage'));
const FeedbackDrawer = React.lazy(() => import('../components/FeedbackDrawer'));
const MeetingsListPage = React.lazy(() => import('../pages/meeting/MeetingsListPage'));
const MeetingPage = React.lazy(() => import('../pages/meeting/MeetingPage'));


export interface IPageRoutesProps
{
  isUserLoggedIn:boolean,
  userRole:number,
  userRefCheck:boolean,
  feedbackDrawerOpen:boolean
}

export interface IPageRoutesState
{
}

class PageRoutes extends React.Component<IPageRoutesProps,IPageRoutesState> {

  constructor(props:IPageRoutesProps)
  {
    super(props);
    this.state={
    };
  }

  public render() {
    return (
        <React.Suspense fallback = {
          <Box>
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={true}>
                <CircularProgress color="inherit" />
              </Backdrop>
          </Box>}>
              <RoutesSwitch >
                <Route path={Routes.home} element = {
                    this.props.isUserLoggedIn ?  <MeetingsListPage/>
                   :<SignInPage/>
                  }/>
                <Route  path={Routes.contact} element = {<ContactUsPage />}/>
                <Route  path={Routes.signIn} element = {<SignInPage />}/>
                <Route  path={Routes.register} element={<RegistrationPage />}/>
                <Route  path={Routes.forgotPassword} element={<ForgotPasswordPage/>}/>
                <Route  path={Routes.resetPassword} element={<ResetPasswordPage />}/>
                <Route  path={Routes.termsOfUse} element = {<TermsOfUsePage />}/>
                <Route  path={Routes.privacyPolicy} element = {<PrivacyPolicyPage/>}/>

                {/* <Route  path={Routes.traco+"/:pId"} element = {this.props.isUserLoggedIn?<HomeTracoPage/>:<SignInPage/>}/> */}

                <Route  path={Routes.account} 
                        element = {this.props.isUserLoggedIn?
                                  <ProfilePage route={Routes.account} name changePassword basic location language payment p={2}/>
                                  :<SignInPage/>}
                  />

                <Route  path={Routes.meeting+"/:pId"} element = {this.props.isUserLoggedIn?<MeetingPage/>:<SignInPage/>}/>
                
                <Route path={Routes.base} element = {
                    this.props.isUserLoggedIn ?  <MeetingsListPage/>
                   :<SignInPage/>
                  }/>

              </RoutesSwitch>
              {this.props.feedbackDrawerOpen && <FeedbackDrawer/>}
        </React.Suspense>
    );
  }
}


export const mapStateToProps = (state:any)=>{
  return {
    isUserLoggedIn:state.userDetailsReducer.isUserLoggedIn,
    userRole:state.userDetailsReducer.user?.role,
    userRefCheck:state.userDetailsReducer.user?.refCheck,
    feedbackDrawerOpen:state.systemReducer.feedbackDrawerOpen,
  }
}  

export const mapDispatchToProps = (dispatch:any)=>{
  return {
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PageRoutes);