
import io, { Socket } from 'socket.io-client';

export default class SocketWrapper
{
    private _socket:Socket;
    private _serverUrl:string;
    private _onConnect:(clientId:string)=>void
    private _onDisconnect:()=>void
    private _onDataReceived:(data:any)=>void
    private _status:boolean

    constructor( onConnect, onDataReceived, onDisconnect, msg:string) {
        this._onConnect = onConnect;
        this._onDisconnect = onDisconnect;
        this._serverUrl = process.env.REACT_APP_SOCKETURL??"";
        this._socket = io(this._serverUrl);
        this._onDataReceived = onDataReceived;
        this._status = false;

        this._socket.on('connect', () => {
            this._onConnect(this._socket.id??"")
            // console.log(`Connected to the server at ${this._serverUrl}`);
          });

        this._socket.on(msg, (data) => {
            // console.log('Received data from server:', data);
            this._onDataReceived(data);
          });

        this._socket.on('disconnect', () => {
            this._status && this._onDisconnect();
            // console.log('Connection closed.');
        });

        this._socket.on('error', (error) => {
            console.error('Socket error:', error);
          });
    }

    public connect(name:string, language:string)
    {
        const meetingId =  sessionStorage.getItem('meetingId') ?? ''
        // console.log('connect', meetingId)
        this._socket.emit('init', { meetingId: meetingId, name:name, language:language });
        this._status = true;
    }

    public disconnect()
    {
        this._status = false;
        this._socket.emit('close');
    }

    public streamAudio(audioBuffer)
    {
        // console.log('streamAudio',audioBuffer)
        this._socket.emit('stream_audio', audioBuffer);
    }

}