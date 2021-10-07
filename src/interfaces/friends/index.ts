import { IApiErrorData } from 'interfaces/api'
import { IUser } from '../user/index'
export interface IFriendsState {
	error: IApiErrorData | null
	loading: boolean
	friends: { [key: string]: IUser }
	serachs: IUser[]
	currentRequestId: string | undefined
}
