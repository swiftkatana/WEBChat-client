import { createAsyncThunk } from '@reduxjs/toolkit'
import apiRequests from 'api/apiRequests'
import { ERROR_LIST } from 'enums/error_list'
import { IApiError } from 'interfaces/api'
import { IStoreRootState } from 'interfaces/redux/store'
import { ISerachUsersGet } from '../../interfaces/api/post-response'

export const serachUsers = createAsyncThunk(
	'friends/searchUsers',
	async (
		query: string,
		{ getState, requestId, rejectWithValue, dispatch }
	): Promise<ISerachUsersGet> => {
		try {
			const state = getState() as IStoreRootState
			const { loading, currentRequestId } = state.friends
			if (!loading || requestId !== currentRequestId)
				throw rejectWithValue(ERROR_LIST.TOO_MANY_REQUESTS)
			const res = await apiRequests.searchUsers(query)
			return res
		} catch (e) {
			const error = e as IApiError
			if (error?.response?.data) throw rejectWithValue(error?.response?.data)
			else throw rejectWithValue(e)
		}
	}
)

export const getFriendsProfiles = createAsyncThunk(
	'friends/getFriendsProfiles',
	async (
		usersIds: string[],
		{ getState, requestId, rejectWithValue, dispatch }
	): Promise<ISerachUsersGet> => {
		try {
			const state = getState() as IStoreRootState
			const { loading, currentRequestId } = state.friends
			if (!loading || requestId !== currentRequestId)
				throw rejectWithValue(ERROR_LIST.TOO_MANY_REQUESTS)

			const res = await apiRequests.getFriendsProfiles(usersIds)
			return res
		} catch (e) {
			const error = e as IApiError
			if (error?.response?.data) throw rejectWithValue(error?.response?.data)
			else throw rejectWithValue(e)
		}
	}
)
