import { IUser } from '../user/index'

export interface IUsersState {
	currentRequestId: string | undefined
	user: IUser
	error: { field: string; error: string; status: number } | null
	loading: boolean
	isLoggedIn: Boolean
}
