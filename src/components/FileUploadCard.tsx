import * as React from 'react';
import { Paper, Grid, Typography,Alert, Button, Box, Stack} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import HttpWrapper from '../helpers/HttpWrapper';
import FileUploadIcon from '@mui/icons-material/FileUpload';

export interface IFileUploadCardProps
{
  elevation?:number,
  label:string,
  filename:string,
  fileUrl?:string,
  uploadURL:string,
  getStorageUploadUrl?:string
  inputType?:string,
  id?:number,
  properties?:any,
  locked?:boolean,
  afterUpload?:(filename:string)=>void,
  validation?:()=>boolean
}

export interface IFileUploadCardState
{
  saving:boolean,
  saveSuccess:boolean,
  saveError:boolean,
  errorMessage:string,
  filename:string,
  file?:File
}

class FileUploadCard extends React.Component<IFileUploadCardProps,IFileUploadCardState>
{
  _httpWrapper:HttpWrapper = new HttpWrapper();
  _duration:number=0;

  constructor(props:IFileUploadCardProps)
  {
    super(props);
    this.state={
      saving:false,
      saveSuccess:false,
      saveError:false,
      errorMessage:'',
      filename:props.filename
    };
    this._onUploadClick = this._onUploadClick.bind(this);
    this._renderContent = this._renderContent.bind(this);
  }

  private _renderContent()
  {

    if(this.props.inputType?.startsWith('image') && (this.props.fileUrl || this.state.file))
    {
      return <img
                src={this.state.file ? URL.createObjectURL(this.state.file) : this.props.fileUrl ?? ''}
                alt='Uploaded file'
                style={{ width: 'auto', maxWidth: '80%', height: 'auto', maxHeight:'500px' }}
              />
    }
    return <></>
  }

  public render() {
    return(
      <Paper elevation={this.props.elevation ?? 2} sx ={{py:this.props.elevation!==undefined?0:2,px:this.props.elevation!==undefined?0:4, display: "flex", justifyContent:'start', alignItems:'center'}}>
        <Grid container direction="row" spacing={2} justifyContent="space-between" alignItems="center">
            <Grid item xs={12} sm={6}>
              <Box>
                {this.props.locked
                ?<Typography>{this.props.label}</Typography>
                :
                <Button fullWidth 
                        variant='outlined'
                        size={'small'}
                        component="label">
                  <Stack direction='row' width='100%' justifyContent={'space-between'} alignItems='center'>
                    <Typography>{this.props.label}</Typography>
                    <FileUploadIcon sx={{px:1}}/>
                  </Stack>
                  
                  <input
                    accept={this.props.inputType}
                    style={{ display: 'none' }}
                    type="file"
                    onInput={(event: React.ChangeEvent<HTMLInputElement>)=>{
                      var file = event?.target?.files?.[0];
                      if (file) {
                        this.setState({
                          filename:file.name,
                          file: file,
                          saveError:false,
                          saveSuccess:false
                        })}
                    }}
                  />
                </Button>
                }
              </Box>
            </Grid>
            
            <Grid item xs={12} sm= {6} md={6} >
              <Typography noWrap>
                {this.state.filename}
              </Typography>
            </Grid>

            <Grid item xs={12} >
                {this._renderContent()}
            </Grid>
            
            { (this.state.filename?.length !== 0 && this.state.file) && !this.props.locked && 
              <Grid item>
                <LoadingButton variant='contained'
                      color="primary"
                      fullWidth
                      size="small"
                      endIcon={<SendIcon />}
                      loading={this.state.saving}
                      loadingPosition="end"
                      sx={{mt:2}}
                      onClick={this._onUploadClick}
                      >
                  Upload
                </LoadingButton>
              </Grid>
            }
            {this.state.saveSuccess && <Grid item xs={12}> <Alert  onClose={()=>{this.setState({saveSuccess:false})}} severity="success">File uploaded successfully</Alert></Grid>}
            {this.state.saveError && <Grid item xs={12}><Alert  onClose={()=>{this.setState({saveError:false})}} severity="error">{this.state.errorMessage}</Alert></Grid>}
            
          </Grid>
      </Paper>
    )
  }

  protected _onUploadClick = (): void => {

    if(!this.state.file)
      return;
    
    if(this.props.validation && !this.props.validation())
      return;

    this.setState({
      saveError:false,
      saveSuccess:false,
      saving:true
    });

    const body = {
      id:this.props.id,
      filename: this.state.filename,
      duration:this._duration,
      ...this.props.properties
    }

    this._httpWrapper.uploadFile(this.props.uploadURL,this.state.file ,body,
      (response)=>{
        this.setState({
          saving:false,
          saveSuccess:true,
          saveError:false
        });
        this.props.afterUpload && this.props.afterUpload(this.state.filename);
      },
      (response)=>
          this.setState({
            saving:false,
            saveSuccess:false,
            saveError:true,
            errorMessage:response?.message ?? 'Please try again later'
          })
    );
  }
}

export default FileUploadCard;