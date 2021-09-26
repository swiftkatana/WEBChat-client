import { createSlice } from '@reduxjs/toolkit'
import { IRelationshipState } from '../../interfaces/relationship/index'
import { getAllRelationship } from './relationshipAction'

const initialState = {
	currentRequestId: undefined,
	loading: false,
	error: null,
	relationships: [],
} as IRelationshipState

export const relationshipSlice = createSlice({
	name: 'relationships',
	initialState,
	reducers: {
		clearRelationshipError(state) {
			state.error = null
		},
	},
	extraReducers: builder => {
		builder.addCase(getAllRelationship.pending, (state, action) => {
			state.loading = true
			state.currentRequestId = action.meta.requestId
		})
	},
})

export default relationshipSlice.reducer
