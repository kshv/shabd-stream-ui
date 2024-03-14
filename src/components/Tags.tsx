import { Autocomplete, createFilterOptions, TextField } from '@mui/material';
import * as React from 'react';

interface ITagsProps
{
    required?:boolean,
    helperText:string,
    label:string,
    error:boolean,
    tags: string[],
    save:boolean,
    onChange:(event: React.SyntheticEvent<Element, Event>, newValue) => void,
    tagOptions:string[]
}

interface ITagsState
{  
}

class Tags extends React.Component<ITagsProps,ITagsState> {

    constructor(props:ITagsProps)
    {
        super(props);
        this.state = {
        }
        this._onChange = this._onChange.bind(this);

    }

    public render() {

        return(
            <Autocomplete
                multiple
                freeSolo
                handleHomeEndKeys
                selectOnFocus
                clearOnBlur
                fullWidth
                getOptionDisabled={(option) => this.props.tags.includes(option)}
                filterOptions={(options, params) =>
                    {
                      const {inputValue} = params;
                      if(inputValue?.length<2)
                        return [];
                      const filtered = createFilterOptions<string>()(options, params);
                    
                      const isExisting = options.some((option) => inputValue.toUpperCase()===option.toUpperCase());
                      if(inputValue!=='' && !isExisting)
                      {
                          filtered.push(inputValue);
                      }
                      return filtered;
                    }
                }
                onChange={this._onChange}
                defaultValue={this.props.tags ?? []}
                options={this.props.tagOptions}
                value={this.props.tags}
                renderInput={params => 
                    <TextField 
                        {...params}
                        required={this.props.required}
                        margin='normal'
                        variant='outlined'
                        type= 'search'
                        label={this.props.label}
                        error={this.props.error}
                        helperText={this.props.helperText}
                        />} 
            />
    )
  }

  private _onChange(event: React.SyntheticEvent<Element, Event>, newValue)
  {
    this.props.onChange(event, newValue);
  } 
}

export default Tags;