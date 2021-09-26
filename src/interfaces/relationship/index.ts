import { relationship_status } from '../../enums/relationship_status'
import { relationship_types } from '../../enums/relationship_types'
export interface IRelationship {
	status: relationship_status
	users: string[]
	chatId: string
	type: relationship_types
}

export interface IRelationshipState {
	currentRequestId: string | undefined
	relationships: IRelationship[]
	error: { field: string; error: string; status: number } | null
	loading: boolean
}
