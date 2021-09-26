import ILenguageState from '../language/index'
import { IUsersState } from '../user/index'
import { IRelationshipState } from '../relationship/index'
export interface IStoreRootState {
	user: IUsersState
	language: ILenguageState
	relationship: IRelationshipState
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
