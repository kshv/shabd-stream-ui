import * as React from 'react';
import { Box, Stack, Typography, Button, Link } from '@mui/material';
import Routes from '../../constants/Routes';

export interface IErrorPageProps
{
}

export interface IErrorPageState
{
}

class ErrorPage extends React.Component<IErrorPageProps,IErrorPageState>
{
 
  constructor(props:IErrorPageProps)
  {
    super(props);

    this.state={
    };
  }


  public render() {
    return(

        <Stack sx={{height:'100vh',width:'100vw',display:'flex', alignItems:'center', justifyContent:"center"}}>
          <Typography variant='h1' textAlign={'center'} sx={{fontSize:'20vh',fontWeight:500 ,color:'#8B0000',p:1}}> Oops!</Typography>
          <Typography variant='subtitle1' textAlign={'center'} sx={{fontSize:'5vh',fontWeight:500 ,color:'#8B0000',pb:4}}>Something went wrong</Typography>
          
          <Box sx={{textAlign:'center'}}>
            <Button
              sx={{m:2, maxWidth:'200px'}}
              size='large'
              variant='contained'>
                <Link href={Routes.base} sx={{textDecoration:'none',color:'white'}}>Go to Home</Link>
            </Button>
          </Box>
        </Stack>
    )
  }
}


export default ErrorPage;