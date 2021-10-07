import ILenguageState from '../language/index'
import { IUsersState } from '../user/index'
import { IRelationshipState } from '../relationship/index'
import { IFriendsState } from 'interfaces/friends'
export interface IStoreRootState {
	user: IUsersState
	language: ILenguageState
	relationship: IRelationshipState
	friends: IFriendsState
}
export interface IActionError {
	error: { message: string }
	meta: any
	payload: {
		status: number
		error: string
		field: string
	}
}
