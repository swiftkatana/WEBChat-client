import { createSlice } from '@reduxjs/toolkit'
import { IUsersState } from '../../interfaces/redux/user'
import { IUser } from '../../interfaces/user/index'
import { signinUser, getUser } from './userAction'

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

// import {
//   CREATE_USER,
//   SIGN_OUT,
//   NEW_FRIEND,
//   UPDATE_STATUS_FRIEND,
//   DELETE_FRIEND,
//   SIGN_IN,
// } from "../../action/types";

// export default (state = null, action) => {
//   switch (action.type) {
//     case CREATE_USER:
//       return action.payload;
//     case SIGN_IN:
//       return action.payload;
//     case SIGN_OUT:
//       return null;
//     case NEW_FRIEND:
//       if (!state.connections[action.payload._id]) {
//         state.connections[action.payload._id] = action.payload;
//       }
//       return { ...state };
//     case UPDATE_STATUS_FRIEND:
//       if (state.connections[action.payload._id]) {
//         const { user, _id } = action.payload;
//         state.connections[_id] = user;
//         state.chats[action.payload.chatId] = {
//           _id: action.payload.chatId,
//           type: "friend",
//         };
//       }
//       return { ...state };
//     case DELETE_FRIEND:
//       if (state.connections[action.payload._id]) {
//         delete state.connections[action.payload._id];
//       }
//       return { ...state };

//     default:
//       return state;
//   }
// };
