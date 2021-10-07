import { IUser } from '../user/index'
import { IRelationship } from '../relationship/index'

export interface IResponsePost {
	data: any
	status: string
}

export interface IResponsePostUser {
	data: IUser
	status: string
}
export interface IResponseGetUser {
	data: IUser
	status: string
}
export interface IResponsePostEmployee {
	user?: IUser
	status: string
}

export interface IResponseGetEmployees {
	users: [IUser]
	status: string
}

export interface IErrorPostUser {
	error: string
	status: number
	field: string
}
export interface IResponseGetAllRelationships {
	data: IRelationship[]
	status: string
}

export interface ISerachUsersGet {
	data: IUser[]
	status: string
}

export interface IResponseRelationships {
	data: IRelationship
	status: string
}
