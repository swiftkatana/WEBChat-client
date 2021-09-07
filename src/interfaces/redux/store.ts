import { IUsersState } from './user'
export interface IStoreRootState {
	user: IUsersState
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
