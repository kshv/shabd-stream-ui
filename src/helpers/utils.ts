import { createFilterOptions } from "@mui/material";

export function validateEmail(email:string):boolean
{
  //eslint-disable-next-line no-useless-escape
  const regex = new RegExp(".+@.+\..+")
  return regex.test(email);
}

export function getTimeFromSeconds(s:number):string
{
  let hr = (Math.floor(s/(60*60))).toFixed(0);
  let min = (Math.floor((s/60)%(60))).toFixed(0);
  let sec = (s%60).toFixed(0);

  return `${hr==='0'?'':hr+'h'} ${min}m ${sec}s`;
}

export function getTimeFromMS(ms:number):string
{
  return getTimeFromSeconds(ms/1000);
}


export function filterAutoCompleteOptions(options, params)
{
  var {inputValue} = params;
  var filtered = options;
  if(inputValue && inputValue !== '')
  {
    filtered = createFilterOptions<string>()(options, params);
    inputValue = inputValue.trim();
    const isExisting = options.some((option) => inputValue.toUpperCase()===option.toUpperCase());
    if(!isExisting)
    {
        var inp = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
        filtered.push(inp);
    }
  }
  return filtered;
}