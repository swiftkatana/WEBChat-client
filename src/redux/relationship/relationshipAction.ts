import { createAsyncThunk } from '@reduxjs/toolkit'
import { IResponseGetAllRelationships } from '../../interfaces/api/post-response'
import { IStoreRootState } from '../../interfaces/redux/store'
import { ERROR_LIST } from '../../enums/error_list copy'
import apiRequests from 'api/apiRequests'
import { IApiError } from '../../interfaces/api/index'

export const getAllRelationship = createAsyncThunk(
	'relationship/getAll',
	async (
		data,
		{ getState, requestId, rejectWithValue, dispatch }
	): Promise<IResponseGetAllRelationships> => {
		try {
			const state = getState() as IStoreRootState
			const { loading, currentRequestId } = state.relationship
			if (!loading || requestId !== currentRequestId)
				throw rejectWithValue(ERROR_LIST.TOO_MANY_REQUESTS)

			const res = await apiRequests.getAllRelationships()
			return res
		} catch (e) {
			const error = e as IApiError
			throw rejectWithValue(error.response.data)
		}
	}
)
