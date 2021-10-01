import { io } from 'socket.io-client'
import ip from '../api/serverIP'
import { message } from '../interfaces/socketRes/index'

const Io = io(ip)

export const sendIoMessage = (data: message) => {
	if (Io.connected) Io.emit('message', data)
	else setTimeout(() => sendIoMessage(data), 200)
}

export default Io
