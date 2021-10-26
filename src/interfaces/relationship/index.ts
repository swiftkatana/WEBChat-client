import { IApiErrorData } from 'interfaces/api'
import { relationship_status, relationship_loading } from 'enums/relationship_status'
import { relationship_types } from 'enums/relationship_types'
export interface IRelationship {
	_id: string
	status: relationship_status
	userId1: string
	userId2: string
	chatId: string
	createAt: number
	updateAt: number
	type: relationship_types
}

export interface IRelationshipState {
	currentRequestId: string | undefined
	relationships: { [key: string]: IRelationship }
	error: IApiErrorData | null
	loading: relationship_loading | null
}
export interface IParamatersUpdateRelationship {
	status: relationship_status
	data: any
}

export interface IParamatersCreateRelationship {
	usersIds: string[]
	type: relationship_types
}
