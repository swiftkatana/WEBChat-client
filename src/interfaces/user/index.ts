import { IApiErrorData } from 'interfaces/api'
import userRoles from '../../enums/userRoles'
export interface IUser {
	_id: string
	createAt: string
	updateAt: string
	personalInfo: IUserPersonalInfo
	securityInfo: IUserSecurityInfo
	statusInfo: IUserStatusInfo
}
interface IAddress {
	country: string
	city: string
	state: string
	street: string
}

export interface IUserStatusInfo {
	role: userRoles
	address: IAddress
	description: string
	chats: {}
	friends: {}
	getFriendRequests: {}
	sendFriendRequests: {}
	blocking: {}
	gotBlock: {}
}

export interface IUserSecurityInfo {
	token: string
	password: string
	email: string
}

export interface IUserPersonalInfo {
	firstName: string
	lastName: string
	phone: string
	profileImage: string
}

// more interfaces for user
export interface ISignInParameters {
	password: string
	email: string
}

export interface ICreateUser {
	password: string
	email: string
	firstName: string
	lastName: string
}
export interface IUsersState {
	currentRequestId: string | undefined
	user: IUser
	error: IApiErrorData | null
	loading: boolean
	isLoggedIn: Boolean
}
