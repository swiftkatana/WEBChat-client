import { createSlice } from '@reduxjs/toolkit'
import { IFriendsState } from '../../interfaces/friends/index'
import { getFriendsProfiles, serachUsers } from './friendAction'
const initialState: IFriendsState = {
	currentRequestId: undefined,
	error: null,
	friends: {},
	serachs: [],
	loading: false,
}
const friendsSlice = createSlice({
	name: 'friends',
	initialState,
	reducers: {
		clearFriendsError(state) {
			state.error = null
		},
	},
	extraReducers: builder => {
		//-------------- get users that i have relationship with them ----------------

		builder.addCase(getFriendsProfiles.pending, (state, action) => {
			if (!state.loading) {
				state.loading = true
				state.currentRequestId = action.meta.requestId
			}
		})

		builder.addCase(getFriendsProfiles.fulfilled, (state, action) => {
			if (action.payload.data) {
				action.payload.data.forEach(user => (state.friends[user._id] = user))
			}
			state.loading = false
		})

		builder.addCase(getFriendsProfiles.rejected, (state, action: any) => {
			const { requestId } = action.meta
			if (state.loading && state.currentRequestId === requestId) {
				state.loading = false
				state.error = action.payload
				state.currentRequestId = undefined
			}
		})
		//-------------- serach for users to add ----------------
		builder.addCase(serachUsers.pending, (state, action) => {
			if (!state.loading) {
				state.loading = true
				state.currentRequestId = action.meta.requestId
			}
		})

		builder.addCase(serachUsers.fulfilled, (state, action) => {
			if (action.payload.data) {
				state.serachs = action.payload.data
			}
			state.loading = false
		})

		builder.addCase(serachUsers.rejected, (state, action: any) => {
			const { requestId } = action.meta
			if (state.loading && state.currentRequestId === requestId) {
				state.loading = false
				state.error = action.payload
				state.currentRequestId = undefined
			}
		})
	},
})

export default friendsSlice.reducer

export const { clearFriendsError } = friendsSlice.actions
