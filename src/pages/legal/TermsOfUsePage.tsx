import * as React from 'react';
import { withAITracking } from '@microsoft/applicationinsights-react-js';
import { appInsights, reactPlugin } from "../../helpers/AppInsights";
import { Box, Divider, Paper, Typography } from '@mui/material';
import Routes from '../../constants/Routes';
import settings from '../../appSettings.json';

class TermsOfUsePage extends React.Component<any,any> {

    constructor(props:any)
  {
    super(props);
    this.state={
    };

    appInsights.trackPageView({name:'TermsOfUsePage',uri:Routes.termsOfUse});

  }

    public render() {
        return(
            <Box sx={{my:2,display:'flex', justifyContent:'center'}}>
            <Box sx={{maxWidth:'lg'}}>
                <Paper elevation={1} sx={{p:4}}>
                <Typography variant='h2' sx={{fontSize:'2.5em'}}><b>TERMS OF USE</b></Typography>
                <Typography paragraph sx={{py:1}}>Last updated: 2023-08-03</Typography>
                <Divider sx={{mb:4, mt:2}}/>
                <Typography paragraph>1. <b>Introduction</b></Typography>
                <Typography paragraph>Welcome to <b>{settings.system.appName}</b> (“Company”, “we”, “our”, “us”)!</Typography>
                <Typography paragraph>These Terms of Service (“Terms”, “Terms of Service”, “Terms of Use) govern your use of our website located at <b>{settings.system.appUrl}</b> (together or individually “Service”) operated by <b>{settings.system.appName}</b>.</Typography>
                <Typography paragraph>Our Privacy Policy also governs your use of our Service and explains how we collect, safeguard and disclose information that results from your use of our web pages.</Typography>
                <Typography paragraph>Your agreement with us includes these Terms and our Privacy Policy (“Agreements”). You acknowledge that you have read and understood Agreements, and agree to be bound of them.</Typography>
                <Typography paragraph>If you do not agree with (or cannot comply with) Agreements, then you may not use the Service, but please let us know by emailing at <b>{settings.system.supportEmail}</b> so we can try to find a solution. These Terms apply to all visitors, users and others who wish to access or use Service.</Typography>
                <Typography paragraph>2. <b>Communications</b></Typography>
                <Typography paragraph>By using our Service, you agree to subscribe to newsletters, marketing or promotional materials and other information we may send. However, you may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or by emailing at {settings.system.supportEmail}.</Typography>

                <Typography paragraph>3. <b>Contests, Sweepstakes and Promotions</b></Typography>
                <Typography paragraph>Any contests, sweepstakes or other promotions (collectively, “Promotions”) made available through Service may be governed by rules that are separate from these Terms of Service. If you participate in any Promotions, please review the applicable rules as well as our Privacy Policy. If the rules for a Promotion conflict with these Terms of Service, Promotion rules will apply.</Typography>


                <Typography paragraph>4. <b>Content</b></Typography><Typography paragraph>Content found on or through this Service are the property of {settings.system.appName} or used with permission. You may not distribute, modify, transmit, reuse, download, repost, copy, or use said Content, whether in whole or in part, for commercial purposes or for personal gain, without express advance written permission from us.</Typography>
                <Typography paragraph>5. <b>Prohibited Uses</b></Typography>
                <Typography paragraph>You may use Service only for lawful purposes and in accordance with Terms. You agree not to use Service:</Typography>
                <Typography paragraph>0.1. In any way that violates any applicable national or international law or regulation.</Typography>
                <Typography paragraph>0.2. For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content or otherwise.</Typography>
                <Typography paragraph>0.3. To transmit, or procure the sending of, any advertising or promotional material, including any “junk mail”, “chain letter,” “spam,” or any other similar solicitation.</Typography>
                <Typography paragraph>0.4. To impersonate or attempt to impersonate Company, a Company employee, another user, or any other person or entity.</Typography>
                <Typography paragraph>0.5. In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful, or in connection with any unlawful, illegal, fraudulent, or harmful purpose or activity.</Typography>
                <Typography paragraph>0.6. To engage in any other conduct that restricts or inhibits anyone’s use or enjoyment of Service, or which, as determined by us, may harm or offend Company or users of Service or expose them to liability.</Typography>
                <Typography paragraph>Additionally, you agree not to:</Typography>
                <Typography paragraph>0.1. Use Service in any manner that could disable, overburden, damage, or impair Service or interfere with any other party’s use of Service, including their ability to engage in real time activities through Service.</Typography>
                <Typography paragraph>0.2. Use any robot, spider, or other automatic device, process, or means to access Service for any purpose, including monitoring or copying any of the material on Service.</Typography>
                <Typography paragraph>0.3. Use any manual process to monitor or copy any of the material on Service or for any other unauthorized purpose without our prior written consent.</Typography>
                <Typography paragraph>0.4. Use any device, software, or routine that interferes with the proper working of Service.</Typography>
                <Typography paragraph>0.5. Introduce any viruses, trojan horses, worms, logic bombs, or other material which is malicious or technologically harmful.</Typography>
                <Typography paragraph>0.6. Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of Service, the server on which Service is stored, or any server, computer, or database connected to Service.</Typography>
                <Typography paragraph>0.7. Attack Service via a denial-of-service attack or a distributed denial-of-service attack.</Typography>
                <Typography paragraph>0.8. Take any action that may damage or falsify Company rating.</Typography>
                <Typography paragraph>0.9. Otherwise attempt to interfere with the proper working of Service.</Typography>
                <Typography paragraph>6. <b>Analytics</b></Typography>
                <Typography paragraph>We may use third-party Service Providers to monitor and analyze the use of our Service.</Typography>
                <Typography paragraph>7. <b>No Use By Minors</b></Typography>
                <Typography paragraph>Service is intended only for access and use by individuals at least eighteen (18) years old. By accessing or using Service, you warrant and represent that you are at least eighteen (18) years of age and with the full authority, right, and capacity to enter into this agreement and abide by all of the terms and conditions of Terms. If you are not at least eighteen (18) years old, you are prohibited from both the access and usage of Service.</Typography>
                <Typography paragraph>8. <b>Accounts</b></Typography><Typography paragraph>When you create an account with us, you guarantee that you are above the age of 18, and that the information you provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on Service.</Typography><Typography paragraph>You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your account and/or password, whether your password is with our Service or a third-party service. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</Typography><Typography paragraph>You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than you, without appropriate authorization. You may not use as a username any name that is offensive, vulgar or obscene.</Typography><Typography paragraph>We reserve the right to refuse service, terminate accounts, remove or edit content, or cancel orders in our sole discretion.</Typography>
                <Typography paragraph>9. <b>Intellectual Property</b></Typography>
                <Typography paragraph>Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of {settings.system.appName} and its licensors. Service is protected by copyright, trademark, and other laws of  and foreign countries. Our trademarks may not be used in connection with any product or service without the prior written consent of {settings.system.appName}.</Typography>
                <Typography paragraph>10. <b>Copyright Policy</b></Typography>
                <Typography paragraph>We respect the intellectual property rights of others. It is our policy to respond to any claim that Content posted on Service infringes on the copyright or other intellectual property rights (“Infringement”) of any person or entity.</Typography>
                <Typography paragraph>If you are a copyright owner, or authorized on behalf of one, and you believe that the copyrighted work has been copied in a way that constitutes copyright infringement, please submit your claim via email to {settings.system.supportEmail}, with the subject line: “Copyright Infringement” and include in your claim a detailed description of the alleged Infringement.”</Typography>
                <Typography paragraph>You may be held accountable for damages (including costs and attorneys’ fees) for misrepresentation or bad-faith claims on the infringement of any Content found on and/or through Service on your copyright.</Typography>
                <Typography paragraph>11. <b>Error Reporting and Feedback</b></Typography>
                <Typography paragraph>You may provide us either directly at {settings.system.supportEmail} or via third party sites and tools with information and feedback concerning errors, suggestions for improvements, ideas, problems, complaints, and other matters related to our Service (“Feedback”). You acknowledge and agree that: (i) you shall not retain, acquire or assert any intellectual property right or other right, title or interest in or to the Feedback; (ii) Company may have development ideas similar to the Feedback; (iii) Feedback does not contain confidential information or proprietary information from you or any third party; and (iv) Company is not under any obligation of confidentiality with respect to the Feedback. In the event the transfer of the ownership to the Feedback is not possible due to applicable mandatory laws, you grant Company and its affiliates an exclusive, transferable, irrevocable, free-of-charge, sub-licensable, unlimited and perpetual right to use (including copy, modify, create derivative works, publish, distribute and commercialize) Feedback in any manner and for any purpose.</Typography>
                <Typography paragraph>12. <b>Links To Other Web Sites</b></Typography>
                <Typography paragraph>Our Service may contain links to third party web sites or services that are not owned or controlled by {settings.system.appName}.</Typography>
                <Typography paragraph>{settings.system.appName} has no control over, and assumes no responsibility for the content, privacy policies, or practices of any third party web sites or services. We do not warrant the offerings of any of these entities/individuals or their websites.</Typography>
                <Typography paragraph>YOU ACKNOWLEDGE AND AGREE THAT COMPANY SHALL NOT BE RESPONSIBLE OR LIABLE, DIRECTLY OR INDIRECTLY, FOR ANY DAMAGE OR LOSS CAUSED OR ALLEGED TO BE CAUSED BY OR IN CONNECTION WITH USE OF OR RELIANCE ON ANY SUCH CONTENT, GOODS OR SERVICES AVAILABLE ON OR THROUGH ANY SUCH THIRD PARTY WEB SITES OR SERVICES.</Typography>
                <Typography paragraph>WE STRONGLY ADVISE YOU TO READ THE TERMS OF SERVICE AND PRIVACY POLICIES OF ANY THIRD PARTY WEB SITES OR SERVICES THAT YOU VISIT.</Typography>
                <Typography paragraph>13. <b>Disclaimer Of Warranty</b></Typography>
                <Typography paragraph>THESE SERVICES ARE PROVIDED BY COMPANY ON AN “AS IS” AND “AS AVAILABLE” BASIS. COMPANY MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF THEIR SERVICES, OR THE INFORMATION, CONTENT OR MATERIALS INCLUDED THEREIN. YOU EXPRESSLY AGREE THAT YOUR USE OF THESE SERVICES, THEIR CONTENT, AND ANY SERVICES OR ITEMS OBTAINED FROM US IS AT YOUR SOLE RISK.</Typography>
                <Typography paragraph>NEITHER COMPANY NOR ANY PERSON ASSOCIATED WITH COMPANY MAKES ANY WARRANTY OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE SERVICES. WITHOUT LIMITING THE FOREGOING, NEITHER COMPANY NOR ANYONE ASSOCIATED WITH COMPANY REPRESENTS OR WARRANTS THAT THE SERVICES, THEIR CONTENT, OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE SERVICES WILL BE ACCURATE, RELIABLE, ERROR-FREE, OR UNINTERRUPTED, THAT DEFECTS WILL BE CORRECTED, THAT THE SERVICES OR THE SERVER THAT MAKES IT AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS OR THAT THE SERVICES OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE SERVICES WILL OTHERWISE MEET YOUR NEEDS OR EXPECTATIONS.</Typography>
                <Typography paragraph>COMPANY HEREBY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR PARTICULAR PURPOSE.</Typography>
                <Typography paragraph>THE FOREGOING DOES NOT AFFECT ANY WARRANTIES WHICH CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.</Typography>
                <Typography paragraph>14. <b>Limitation Of Liability</b></Typography>
                <Typography paragraph>EXCEPT AS PROHIBITED BY LAW, YOU WILL HOLD US AND OUR OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS HARMLESS FOR ANY INDIRECT, PUNITIVE, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGE, HOWEVER IT ARISES (INCLUDING ATTORNEYS’ FEES AND ALL RELATED COSTS AND EXPENSES OF LITIGATION AND ARBITRATION, OR AT TRIAL OR ON APPEAL, IF ANY, WHETHER OR NOT LITIGATION OR ARBITRATION IS INSTITUTED), WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE, OR OTHER TORTIOUS ACTION, OR ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT, INCLUDING WITHOUT LIMITATION ANY CLAIM FOR PERSONAL INJURY OR PROPERTY DAMAGE, ARISING FROM THIS AGREEMENT AND ANY VIOLATION BY YOU OF ANY FEDERAL, STATE, OR LOCAL LAWS, STATUTES, RULES, OR REGULATIONS, EVEN IF COMPANY HAS BEEN PREVIOUSLY ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. EXCEPT AS PROHIBITED BY LAW, IF THERE IS LIABILITY FOUND ON THE PART OF COMPANY, IT WILL BE LIMITED TO THE AMOUNT PAID FOR THE PRODUCTS AND/OR SERVICES, AND UNDER NO CIRCUMSTANCES WILL THERE BE CONSEQUENTIAL OR PUNITIVE DAMAGES. SOME STATES DO NOT ALLOW THE EXCLUSION OR LIMITATION OF PUNITIVE, INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE PRIOR LIMITATION OR EXCLUSION MAY NOT APPLY TO YOU.</Typography>
                <Typography paragraph>15. <b>Termination</b></Typography>
                <Typography paragraph>We may terminate or suspend your account and bar access to Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of Terms.</Typography>
                <Typography paragraph>If you wish to terminate your account, you may simply discontinue using Service.</Typography>
                <Typography paragraph>All provisions of Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</Typography>
                <Typography paragraph>16. <b>Governing Law</b></Typography>
                <Typography paragraph>These Terms shall be governed and construed in accordance with the laws of India, which governing law applies to agreement without regard to its conflict of law provisions.</Typography>
                <Typography paragraph>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service and supersede and replace any prior agreements we might have had between us regarding Service.</Typography>
                <Typography paragraph>17. <b>Changes To Service</b></Typography>
                <Typography paragraph>We reserve the right to withdraw or amend our Service, and any service or material we provide via Service, in our sole discretion without notice. We will not be liable if for any reason all or any part of Service is unavailable at any time or for any period. From time to time, we may restrict access to some parts of Service, or the entire Service, to users, including registered users.</Typography>
                <Typography paragraph>18. <b>Amendments To Terms</b></Typography>
                <Typography paragraph>We may amend Terms at any time by posting the amended terms on this site. It is your responsibility to review these Terms periodically.</Typography>
                <Typography paragraph>Your continued use of the Platform following the posting of revised Terms means that you accept and agree to the changes. You are expected to check this page frequently so you are aware of any changes, as they are binding on you.</Typography>
                <Typography paragraph>By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use Service.</Typography>
                <Typography paragraph>19. <b>Waiver And Severability</b></Typography>
                <Typography paragraph>No waiver by Company of any term or condition set forth in Terms shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition, and any failure of Company to assert a right or provision under Terms shall not constitute a waiver of such right or provision.</Typography>
                <Typography paragraph>If any provision of Terms is held by a court or other tribunal of competent jurisdiction to be invalid, illegal or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent such that the remaining provisions of Terms will continue in full force and effect.</Typography>
                <Typography paragraph>20. <b>Acknowledgement</b></Typography>
                <Typography paragraph>BY USING SERVICE OR OTHER SERVICES PROVIDED BY US, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF SERVICE AND AGREE TO BE BOUND BY THEM.</Typography>
                <Typography paragraph>21. <b>Contact Us</b></Typography>
                <Typography paragraph>Please send your feedback, comments, requests for technical support by email: <b>{settings.system.supportEmail}</b>.</Typography>
                </Paper>
            </Box>
            </Box>

        )
    }
}

export default withAITracking(reactPlugin,TermsOfUsePage);