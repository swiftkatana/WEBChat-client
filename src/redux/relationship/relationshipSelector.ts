import { createSelector } from 'reselect'
import { IStoreRootState } from '../../interfaces/redux/store'
import { relationship_status } from '../../enums/relationship_status'

export const relationshipStateSelector = (state: IStoreRootState) => state.relationship
export const StateSelector = (state: IStoreRootState) => state

export const relationshipFriendSelector = createSelector(relationshipStateSelector, state =>
	Object.values(state.relationships)
		.filter(relationship => relationship.status === relationship_status.ACEPET)
		.sort((a, b) => b.updateAt - a.updateAt)
)

export const relationshipPendingGotSelector = createSelector(StateSelector, state =>
	Object.values(state.relationship.relationships)
		.filter(
			relationship =>
				relationship.status === relationship_status.PENDING &&
				relationship.userId2 === state.user.user._id
		)
		.sort((a, b) => b.updateAt - a.updateAt)
)

export const relationshipPendingSentSelector = createSelector(StateSelector, state =>
	Object.values(state.relationship.relationships)
		.filter(
			relationship =>
				relationship.status === relationship_status.PENDING &&
				relationship.userId1 === state.user.user._id
		)
		.sort((a, b) => b.updateAt - a.updateAt)
)

export const relationshipBlockSelector = createSelector(relationshipStateSelector, state =>
	Object.values(state.relationships)
		.filter(relationship => relationship.status === relationship_status.BLOCK)
		.sort((a, b) => b.updateAt - a.updateAt)
)
export const relationshipErrorSelector = createSelector(
	relationshipStateSelector,
	state => state?.error
)
export const relationshipsLoadingSelector = createSelector(
	relationshipStateSelector,
	state => state.loading
)
