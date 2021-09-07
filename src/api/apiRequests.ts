import axios from 'axios'
import baseUrl from './base-url'
import { ReqTypes, ReqType } from '../interfaces/api/request-types'
import { URLS } from './api-urls'
import { ISignInParameters } from '../interfaces/user/index'
import { IApiError } from '../interfaces/api/index'
import {
	IResponsePostUser,
	IResponseGetUser,
} from '../interfaces/api/post-response'

let ip: string = baseUrl.testServer

class ApiRequests {
	private server = axios.create({ baseURL: ip, withCredentials: true })

	public setToken(token = '') {
		this.server.defaults.headers = { Authorization: `bearer ${token}` }
	}

	private async sendRequest(reqType: ReqType, url: string, body?: any) {
		try {
			const res = await this.server[reqType](url, body)
			return { data: res.data.data, status: res.data.status }
		} catch (e) {
			const error = e as IApiError
			if (error?.response?.data?.error === 'Token expired') {
				await this.getNewToken()
				const res = await this.server[reqType](url, body)
				return { data: res.data.data, status: res.data.status }
			}
			console.log(error.response.data)
			throw error
		}
	}

	public async signIn(userData: ISignInParameters): Promise<IResponsePostUser> {
		const { data, status } = await this.sendRequest(
			ReqTypes.POST,
			URLS.AUTHENTICATE,
			userData
		)
		return { data, status }
	}

	public async getNewToken() {
		return await this.sendRequest(ReqTypes.PATCH, URLS.AUTHENTICATE)
	}

	public async getUser(): Promise<IResponseGetUser> {
		const { data, status } = await this.sendRequest(ReqTypes.GET, URLS.USER)
		return { data, status }
	}
}

export default new ApiRequests()
