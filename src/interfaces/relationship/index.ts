import { IApiErrorData } from 'interfaces/api'
import { relationship_status } from '../../enums/relationship_status'
import { relationship_types } from '../../enums/relationship_types'
export interface IRelationship {
	status: relationship_status
	users: string[]
	chatId: string
	createAt: number
	updateAt: number
	type: relationship_types
}

export interface IRelationshipState {
	currentRequestId: string | undefined
	relationships: { [key: string]: IRelationship }
	error: IApiErrorData | null
	loading: boolean
}
export interface IParamatersUpdateRelationship {
	id: string
	type: relationship_status
}
