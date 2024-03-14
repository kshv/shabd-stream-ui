import axios from "axios";
import {store} from '../App'
import { UserActions } from "../reducerActions/UserActions";

export default class HttpWrapper
{
    private _client = axios.create({
        baseURL: process.env.REACT_APP_BASEURL
      });

    private _fileClient = axios.create({
        baseURL: process.env.REACT_APP_STORAGE
      });


    private _checkAndUpdateAuth(status?:number)
    {
        if(status === 401)
        {
            store.dispatch({
                type:UserActions.SIGN_OUT
              });
        }
    }
    public async get(url:string,success,failure)
    {
        const options = {
            headers:{
                'Content-Type': 'application/json',
                'SessionId': sessionStorage.getItem('sessionId') ?? ''
            }
        };
        try
        {
            const response = await this._client.get(url,options);
            if(response.data.status === true)
                success(response.data);
            else
            {
                failure(response?.data);
            }
        }
        catch(error)
        {
            failure(error?.response?.data);
        }
    }

    public async post(url:string,body,success,failure)
    {
        const options = {
            headers:{
                'Content-Type': 'application/json',
                'SessionId': sessionStorage.getItem('sessionId') ?? ''
            }
        };
        try
        {
            const response = await this._client.post(url,body,options);
            const data = response.data;
            const status = data.status;
            if(status === true)
                success(response.data);
            else
            {
                failure(response.data);
            }
        }
        catch(error)
        {
            failure(error?.response?.data);
        }
        
    }

    public async getAuth(url:string,success,failure)
    {
        const options = {
            headers:{
                'Content-Type': 'application/json',
                'SessionId': sessionStorage.getItem('sessionId') ?? '',
                'Authorization': 'Bearer '+localStorage.getItem('token') ?? ''
            }
        };
        try
        {
            const response = await this._client.get(url,options);
            if(response.data.status === true)
                success(response.data);
            else
            {
                failure(response.data);
            }
        }
        catch(error)
        {
            this._checkAndUpdateAuth(error?.response?.status);
            failure(error?.response?.data);
        }
    }

    public async postAuth(url:string,body,success,failure)
    {
        const options = {
            headers:{
                'Content-Type': 'application/json',
                'SessionId': sessionStorage.getItem('sessionId') ?? '',
                'Authorization': 'Bearer '+localStorage.getItem('token') ?? ''
            }
        };
        try
        {
            const response = await this._client.post(url,body,options);
            if(response.data.status === true)
                success(response.data);
            else
            {
                failure(response.data);
            }
        }
        catch(error)
        {
            // console.log(error)
            this._checkAndUpdateAuth(error?.response?.status);
            failure(error?.response?.data);
        }
    }

    public async getFileFromStorage(url:string,success,failure)
    {
        const options = {
            headers:{
                'Content-Type': 'application/json',
                'SessionId': sessionStorage.getItem('sessionId') ?? ''
            }
        };
        try
        {
            const response = await this._fileClient.get(url,options);
            success(response.data);
        }
        catch(error)
        {
            failure(error?.response?.data);
        }
    }

    public async uploadFile(url:string,file:File,properties:any,success,failure)
    {
        const options = {
            headers:{
                'Content-Type': 'multipart/form-data',
                'SessionId': sessionStorage.getItem('sessionId') ?? '',
                'Authorization': 'Bearer '+localStorage.getItem('token') ?? ''
            }
        };

        try
        {
            const formData = new FormData();
            formData.append('file',file);
            for(var key in properties)
            {
                if (properties.hasOwnProperty(key)) 
                    formData.append(key,properties[key])
            }
            const response = await this._client.post(url,formData,options);
            if(response.data.status === true)
                success(response.data);
            else
            {
                failure(response.data);
            }
        }
        catch(error)
        {
            // console.log(error)
            this._checkAndUpdateAuth(error?.response?.status);
            failure(error?.response?.data);
        }
    }

    
}