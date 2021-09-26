import { createSelector } from 'reselect'
import { IStoreRootState } from '../../interfaces/redux/store'
import { relationship_status } from '../../enums/relationship_status'

export const relationshipStateSelector = (state: IStoreRootState) => state.relationship

export const relationshipFriendSelector = createSelector(relationshipStateSelector, state =>
	state.relationships.filter(relationship => relationship.status === relationship_status.ACEPET)
)

export const relationshipPendingSelector = createSelector(relationshipStateSelector, state =>
	state.relationships.filter(relationship => relationship.status === relationship_status.PENDING)
)

export const relationshipBlockSelector = createSelector(relationshipStateSelector, state =>
	state.relationships.filter(relationship => relationship.status === relationship_status.BLOCK)
)
