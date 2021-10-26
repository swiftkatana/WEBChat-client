import { IUser } from '../user/index'
import { Io_message_type } from '../../enums/socketIo'

export interface ILiveUpdateFriend {
	resType: string
	sender: IUser
	header: string
	status: string
	body: string
}

export interface ILiveCall {
	resType: string
	sender: IUser
	header: string
	status: string
	body: string
}

export interface message {
	type: Io_message_type
	data?: any
}
