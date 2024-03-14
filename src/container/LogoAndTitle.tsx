import { Stack, Typography } from "@mui/material"
import { Link } from "react-router-dom";
import Routes from "../constants/Routes";
import { appInsights } from "../helpers/AppInsights";

// export function logo(){
//     return <Box
//                 component="img"
//                 alt="shabd"
//                 sx={{
//                     height:{xs:40,md:48},
//                     pl:1
//                 }}
//                 src={window.location.origin +'/shabd-logo.png'}/>
// }

export function logoTitle()
{
    return(
        <Link to={Routes.base}
            onClick={()=>appInsights.trackEvent({name:'Page logo clicked',properties:{component:'LogoButton'}})}
            style={{ textDecoration: 'none',cursor: "pointer"}}
              >
            <Stack direction='row' 
            alignItems='center' 
            justifyContent='center'
            >
             <Typography variant='h1' color='primary' sx={{fontSize:{xs:40,md:48},fontWeight:'bold',px:2}}>Shabd</Typography>
            </Stack>
        </Link>)
    
}