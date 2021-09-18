import { io } from 'socket.io-client'
import ip from './api/serverIP'

export default io(ip)
