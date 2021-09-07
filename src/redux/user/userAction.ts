import { createAsyncThunk } from '@reduxjs/toolkit'
import { ISignInParameters } from '../../interfaces/user/index'
import {
	IResponsePostUser,
	IResponseGetUser,
} from '../../interfaces/api/post-response'
import { IStoreRootState } from '../../interfaces/redux/store'
import { ERROR_LIST } from '../../enums/error_list'
import apiRequests from '../../api/apiRequests'

export const signinUser = createAsyncThunk(
	'user/signinUser',
	async (
		userData: ISignInParameters,
		{ getState, requestId, rejectWithValue, dispatch }
	): Promise<IResponsePostUser> => {
		try {
			const state = getState() as IStoreRootState
			const { loading, currentRequestId } = state.user
			if (!loading || requestId !== currentRequestId)
				throw rejectWithValue(ERROR_LIST.TOO_MANY_REQUESTS)

			return await apiRequests.signIn(userData)
		} catch (e) {
			throw rejectWithValue(e.response.data)
		}
	}
)

export const getUser = createAsyncThunk(
	'user/getUser',
	async (_, { rejectWithValue }): Promise<IResponseGetUser> => {
		try {
			const response = await apiRequests.getUser()
			return response
		} catch (e) {
			throw rejectWithValue(e.response.data)
		}
	}
)
