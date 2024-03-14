import * as React from 'react';
import { connect } from 'react-redux';
import { Grid, Alert, CircularProgress, Accordion, AccordionDetails, AccordionSummary, Typography} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import settings from '../../appSettings.json'
import HttpWrapper from '../../helpers/HttpWrapper';
import Tags from '../../components/Tags';
import { TaxonomyActions } from '../../reducerActions/TaxonomyActions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface IProfileLanguagesCardProps
{
  userId?:number
  languages:string[],
  SaveLanguages:(languages:string[])=>Promise<void>
}

export interface IProfileLanguagesCardState
{
  loading:boolean,
  loadError:boolean,
  saving:boolean,
  saveSuccess:boolean,
  saveError:boolean,
  errorMessage:string,
  speakLanguages:string[],
  readLanguages:string[],
  writeLanguages:string[],
  speakLanguagesError:boolean,
  readLanguagesError:boolean,
  writeLanguagesError:boolean
}

class ProfileLanguagesCard extends React.Component<IProfileLanguagesCardProps,IProfileLanguagesCardState>
{
  _httpWrapper:HttpWrapper = new HttpWrapper();

  constructor(props:IProfileLanguagesCardProps)
  {
    super(props);
    this.state={
      loading:false,
      loadError:false,
      saving:false,
      saveSuccess:false,
      saveError:false,
      errorMessage:'',
      speakLanguages: [],
      readLanguages: [],
      writeLanguages: [],
      speakLanguagesError:false,
      readLanguagesError:false,
      writeLanguagesError:false
    };
    
    this._refresh = this._refresh.bind(this);
    this._onSaveClick = this._onSaveClick.bind(this);

  }

  componentDidMount()
  {
    this._refresh();
    if(!this.props.languages || this.props.languages.length === 0)
    {
      this._httpWrapper.getAuth(settings.taxonomy.getLanguagesUrl, 
        (response)=>this.props.SaveLanguages(response.languages),
        (response)=>{}
        )
    }
  }

  private _refresh()
  {
    this._httpWrapper.postAuth(settings.user.getProfileLanguageUrl,
      {userId:this.props.userId},
      (response)=>  this.setState({
              loading:false,
              loadError:false,
              speakLanguages:response?.profile.speakLanguages ?? [],
              readLanguages:response?.profile.readLanguages ?? [],
              writeLanguages:response?.profile.writeLanguages ?? []
            }),
      (response)=>  this.setState({
              loading:false,
              loadError:true,
              errorMessage:response?.message ?? 'Unable to load profile. Please try again later.'
            })      
    );
  }

  public render() {
    return(
      <Accordion sx={{px:{xs:0,sm:2}}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="Language profile">
          <Typography variant='h6'>Languages</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Grid container direction="row" spacing={1} justifyContent="space-between" alignItems="center">
              {this.state.loading && <Grid item xs={12}><CircularProgress size={30}/></Grid>}
              
              <Grid item xs={12} >
                <Tags
                  required={true}
                  helperText=''
                  label="Speak in Languages"
                  error={this.state.speakLanguagesError}
                  tags={this.state.speakLanguages}
                  save={this.state.saving}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>,newValue)=>
                    this.setState({
                      speakLanguages:newValue,
                      speakLanguagesError:false,
                      saveError:false,
                      saveSuccess:false
                    })}
                  tagOptions={this.props.languages ?? []}/>
              </Grid>

              <Grid item xs={12} >
                <Tags 
                  required={true}
                  helperText=''
                  label="Read in Languages"
                  error={this.state.readLanguagesError}
                  tags={this.state.readLanguages}
                  save={this.state.saving}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>,newValue)=>
                    this.setState({
                      readLanguages:newValue,
                      readLanguagesError:false,
                      saveError:false,
                      saveSuccess:false
                    })}
                  tagOptions={this.props.languages ?? []}/>
              </Grid>
              
              <Grid item xs={12} >
                <Tags 
                  required={true}
                  helperText=''
                  label="Write in Languages"
                  error={this.state.writeLanguagesError}
                  tags={this.state.writeLanguages}
                  save={this.state.saving}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>,newValue)=>
                    this.setState({
                      writeLanguages:newValue,
                      writeLanguagesError:false,
                      saveError:false,
                      saveSuccess:false
                    })}
                  tagOptions={this.props.languages ?? []}/>
              </Grid>

              <Grid item>
                <LoadingButton variant='contained'
                      color="primary"
                      fullWidth
                      size="small"
                      endIcon={<SendIcon />}
                      loading={this.state.saving}
                      loadingPosition="end"
                      sx={{mt:2}}
                      onClick={this._onSaveClick}
                      >
                  Save
                </LoadingButton>
              </Grid>

            {this.state.loadError && <Grid item xs={12}><Alert onClose={()=>{this.setState({loadError:false})}} severity="error">{this.state.errorMessage}</Alert></Grid>}
            {this.state.saveSuccess && <Grid item xs={12}><Alert onClose={()=>{this.setState({saveSuccess:false})}} severity="success">Profile updated successfully</Alert></Grid>}
            {this.state.saveError && <Grid item xs={12}><Alert onClose={()=>{this.setState({saveError:false})}} severity="error">{this.state.errorMessage}</Alert></Grid>}
              
            </Grid>
        </AccordionDetails>
      </Accordion>
    )
  }

  private _onSaveClick = (): void => {

    this.setState({
      saveError:false,
      saveSuccess:false,
      saving:true
    });

    const body = {
      userId:this.props.userId,
      speakLanguages: this.state.speakLanguages,
      readLanguages: this.state.readLanguages,
      writeLanguages: this.state.writeLanguages
    }

    this._httpWrapper.postAuth(settings.user.saveProfileLanguageUrl,body,
      (response)=>
        this.setState({
          saveSuccess:true,
          saveError:false,
          saving:false,
        }),
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

export const mapStateToProps = (state:any)=>{
  return {
    languages:state.taxonomyReducer.languages
  }
}  
export const mapDispatchToProps = (dispatch:any)=>{
  return {
    SaveLanguages:(languages:string[])=>
      dispatch({
        type:TaxonomyActions.SAVE_LANGUAGES,
        languages:languages
      })
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfileLanguagesCard);