import { createSlice } from '@reduxjs/toolkit'
import { relationship_loading } from 'enums/relationship_status'
import { IRelationshipState } from '../../interfaces/relationship/index'
import { getAllRelationship, updateRelationship, createRelationship } from './relationshipAction'

const initialState = {
	currentRequestId: undefined,
	loading: null,
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
			state.loading = relationship_loading.GET_ALL
			state.currentRequestId = action.meta.requestId
		})

		builder.addCase(getAllRelationship.fulfilled, (state, action) => {
			state.loading = null
			state.currentRequestId = ''
			if (action.payload.status === 'success')
				for (const relationship of action.payload.data)
					state.relationships[relationship._id] = relationship
			else {
				console.log(action)
			}
		})

		builder.addCase(getAllRelationship.rejected, (state, action: any) => {
			state.loading = null
			state.currentRequestId = ''
			console.log(action)
			state.error = action.payload
		})

		// ------------ create relationship ----------------
		builder.addCase(createRelationship.pending, (state, action) => {
			state.loading = relationship_loading.CREATE
			state.currentRequestId = action.meta.requestId
		})

		builder.addCase(createRelationship.fulfilled, (state, action) => {
			state.loading = null
			state.currentRequestId = ''
			if (action.payload.status === 'success')
				state.relationships[action.payload.data._id] = action.payload.data
			else {
				console.log(action)
			}
		})

		builder.addCase(createRelationship.rejected, (state, action: any) => {
			state.loading = null
			state.currentRequestId = ''
			state.error = action.payload
		})
		// ------------ update relationship ----------------
		builder.addCase(updateRelationship.pending, (state, action) => {
			state.loading = relationship_loading.UPDATE
			state.currentRequestId = action.meta.requestId
		})

		builder.addCase(updateRelationship.fulfilled, (state, action) => {
			state.loading = null
			state.currentRequestId = ''
			if (action.payload.status === 'success')
				state.relationships[action.payload.data._id] = action.payload.data
			else {
				console.log(action)
			}
		})

		builder.addCase(updateRelationship.rejected, (state, action: any) => {
			state.loading = null
			state.currentRequestId = ''
			state.error = action.payload
		})
	},
})

export default relationshipSlice.reducer

export const { clearRelationshipError } = relationshipSlice.actions
