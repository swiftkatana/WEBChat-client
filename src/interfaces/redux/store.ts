import { IUsersState } from './user'
import ILenguageState from '../language/index'
export interface IStoreRootState {
	user: IUsersState
	language: ILenguageState
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
