import { createSelector } from 'reselect'
import { IStoreRootState } from '../../interfaces/redux/store'
import { IUsersState } from '../../interfaces/redux/user'
import { IUser } from '../../interfaces/user/index'

export const userStateSelector = (state: IStoreRootState) => state.user as IUsersState

export const userLoggedInSelector = createSelector(
	userStateSelector,
	(state: IUsersState) => state.isLoggedIn
)
export const userSelector = createSelector(
	userStateSelector,
	(state: IUsersState) => state.user as IUser
)
