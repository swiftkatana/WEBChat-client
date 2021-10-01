import { createSlice } from '@reduxjs/toolkit'
import { IRelationshipState } from '../../interfaces/relationship/index'
import { getAllRelationship, updateRelationship } from './relationshipAction'

const initialState = {
	currentRequestId: undefined,
	loading: false,
	error: null,
	relationships: {},
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
		// ------------ get all relationships ----------------
		builder.addCase(getAllRelationship.pending, (state, action) => {
			state.loading = true
			state.currentRequestId = action.meta.requestId
		})

		builder.addCase(getAllRelationship.fulfilled, (state, action) => {
			state.loading = false
			state.currentRequestId = ''
			if (action.payload.status === 'success')
				for (const relationship of action.payload.data)
					state.relationships[relationship.chatId] = relationship
			else {
				console.log(action)
			}
		})

		builder.addCase(getAllRelationship.rejected, (state, action: any) => {
			state.loading = false
			state.currentRequestId = ''
			console.log(action)
			state.error = action.payload
		})

		// ------------ update relationship ----------------
		builder.addCase(updateRelationship.pending, (state, action) => {
			state.loading = true
			state.currentRequestId = action.meta.requestId
		})

		builder.addCase(updateRelationship.fulfilled, (state, action) => {
			state.loading = false
			state.currentRequestId = ''
			if (action.payload.status === 'success')
				state.relationships[action.payload.data.chatId] = action.payload.data
			else {
				console.log(action)
			}
		})

		builder.addCase(updateRelationship.rejected, (state, action: any) => {
			state.loading = false
			state.currentRequestId = ''
			state.error = action.payload
		})
	},
})

export default relationshipSlice.reducer

export const { clearRelationshipError } = relationshipSlice.actions
