import socketIOClient from 'socket.io-client' 
import ip from './api/serverIP'

export default socketIOClient(ip); 