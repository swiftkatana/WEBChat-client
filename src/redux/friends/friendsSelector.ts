import { createSelector } from 'reselect'
import { IStoreRootState } from 'interfaces/redux/store'

const friendsStateSelector = (state: IStoreRootState) => state.friends

export const friendsSelector = createSelector(friendsStateSelector, state => state.friends)
export const serachUsersSelector = createSelector(friendsStateSelector, state => state.serachs)
export const friendsErrorSelector = createSelector(friendsStateSelector, state => state.error)
export const friendLoadingSelector = createSelector(friendsStateSelector, state => state.loading)
