import { IUser } from '../user/index'

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
