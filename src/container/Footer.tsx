import { Divider, Grid, Link as LinkHref, Stack, Typography } from "@mui/material";
import settings from '../appSettings.json';
import { Link } from 'react-router-dom';
import Routes from '../constants/Routes';

function Footer() {
  
  return (
    <Grid container justifyContent={'space-between'} alignItems={'flex-start'} sx={{ p:2}} spacing={1}>
      <Grid item xs={12}>
        <Divider flexItem variant="fullWidth" sx={{bgcolor:'grey'}}/>
      </Grid>
      <Grid item>
        <Typography sx={{color:'grey'}}>shabd.tech &copy; 2023 </Typography>
      </Grid>
      <Grid item textAlign={"right"}>
        <Stack direction={{xs:'column',lg:'row'}} justifyContent={'flex-end'} spacing={{xs:0.5,lg:2}}>
          <LinkHref href={settings.system.supportEmail} sx={{textDecoration:'none', fontSize:12, color:'grey'}}>Contact Us</LinkHref>
          <Link to = {Routes.privacyPolicy} style={{textDecoration:'none', fontSize:12, color:'grey'}}>Privacy Policy</Link>
          <Link to = {Routes.termsOfUse} style={{textDecoration:'none', fontSize:12, color:'grey'}}>Terms of Use</Link>
        </Stack>
      </Grid>
    </Grid>
    
  );
}


export default Footer;


