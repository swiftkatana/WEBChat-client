import { IUsersState } from './../../interfaces/user/index'
import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../interfaces/user/index'
import { signinUser, getUser, signUpUser } from './userAction'

const initialState = {
	currentRequestId: undefined,
	loading: false,
	error: null,
	user: {} as IUser,
	isLoggedIn: false,
} as IUsersState

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		clearUserError(state) {
			state.error = null
		},
	},

	extraReducers: builder => {
		//------------- Sign up ------------

		builder.addCase(signUpUser.pending, (state, action) => {
			if (!state.loading) {
				state.loading = true
				state.currentRequestId = action.meta.requestId
			}
		})

		builder.addCase(signUpUser.fulfilled, (state, action) => {
			if (action.payload.data) {
				state.user = action.payload.data
				state.isLoggedIn = true
			}
			state.loading = false
		})

		builder.addCase(signUpUser.rejected, (state, action: any) => {
			const { requestId } = action.meta
			if (state.loading && state.currentRequestId === requestId) {
				state.loading = false
				state.error = action.payload
				state.currentRequestId = undefined
			}
		})

		//------------- Sign in ------------
		builder.addCase(signinUser.pending, (state, action) => {
			if (!state.loading) {
				state.loading = true
				state.currentRequestId = action.meta.requestId
			}
		})

		builder.addCase(signinUser.fulfilled, (state, action) => {
			if (action.payload.data) {
				state.user = action.payload.data
				state.isLoggedIn = true
			}
			state.loading = false
		})

		builder.addCase(signinUser.rejected, (state, action: any) => {
			const { requestId } = action.meta
			if (state.loading && state.currentRequestId === requestId) {
				state.loading = false
				state.error = action.payload
				state.currentRequestId = undefined
			}
		})
		//------------- get User ------------

		builder.addCase(getUser.pending, (state, action) => {
			if (!state.loading) {
				state.loading = true
				state.currentRequestId = action.meta.requestId
			}
		})

		builder.addCase(getUser.fulfilled, (state, action) => {
			if (action.payload.data) {
				state.user = action.payload.data
				state.isLoggedIn = true
			}
			state.loading = false
		})

		builder.addCase(getUser.rejected, (state, action: any) => {
			const { requestId } = action.meta
			if (state.loading && state.currentRequestId === requestId) {
				state.loading = false
				state.error = action.payload
				state.currentRequestId = undefined
			}
		})
	},
})

export const { clearUserError } = userSlice.actions
export default userSlice.reducer
