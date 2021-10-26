import { createAsyncThunk } from '@reduxjs/toolkit'
import { ISignInParameters, ICreateUser } from '../../interfaces/user/index'
import {
	IResponsePostUser,
	IResponseGetUser,
	IUserSignOut,
} from '../../interfaces/api/post-response'
import { IStoreRootState } from '../../interfaces/redux/store'
import { ERROR_LIST } from '../../enums/error_list'
import apiRequests from '../../api/apiRequests'
import { IApiError } from '../../interfaces/api/index'
import { sendIoMessage } from '../../utils/ioMyLive'
import { Io_message_type } from 'enums/socketIo'
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

			const res = await apiRequests.signIn(userData)
			sendIoMessage({ type: Io_message_type.LOGIN, data: res.data._id })
			return res
		} catch (e) {
			const error = e as IApiError
			throw rejectWithValue(error.response.data)
		}
	}
)

export const signUpUser = createAsyncThunk(
	'user/signUpUser',
	async (
		userData: ICreateUser,
		{ getState, requestId, rejectWithValue, dispatch }
	): Promise<IResponsePostUser> => {
		try {
			const state = getState() as IStoreRootState
			const { loading, currentRequestId } = state.user
			if (!loading || requestId !== currentRequestId)
				throw rejectWithValue(ERROR_LIST.TOO_MANY_REQUESTS)

			const res = await apiRequests.signUp(userData)

			sendIoMessage({ type: Io_message_type.LOGIN, data: res.data._id })
			return res
		} catch (e) {
			const error = e as IApiError
			throw rejectWithValue(error.response.data)
		}
	}
)

export const getUser = createAsyncThunk(
	'user/getUser',
	async (_, { rejectWithValue }): Promise<IResponseGetUser> => {
		try {
			const res = await apiRequests.getUser()
			sendIoMessage({ type: Io_message_type.LOGIN, data: res.data._id })
			return res
		} catch (e) {
			const error = e as IApiError
			throw rejectWithValue(error.response.data)
		}
	}
)

export const signOut = createAsyncThunk(
	'user/signOut',
	async (_, { rejectWithValue }): Promise<IUserSignOut> => {
		try {
			const res = await apiRequests.signOut()
			sendIoMessage({ type: Io_message_type.LOGOUT })
			return res
		} catch (e) {
			const error = e as IApiError
			throw rejectWithValue(error.response.data)
		}
	}
)
