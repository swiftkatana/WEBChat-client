import { IParamatersCreateRelationship } from 'interfaces/relationship/index'
import axios from 'axios'
import baseUrl from './base-url'
import { ReqTypes, ReqType } from '../interfaces/api/request-types'
import { URLS } from './api-urls'
import { ISignInParameters, ICreateUser } from '../interfaces/user/index'
import { IApiError } from '../interfaces/api/index'
import {
	IResponseRelationships,
	ISerachUsersGet,
	IUserSignOut,
} from '../interfaces/api/post-response'
import {
	IResponsePostUser,
	IResponseGetUser,
	IResponseGetAllRelationships,
} from '../interfaces/api/post-response'
import { IParamatersUpdateRelationship } from 'interfaces/relationship'

let ip: string = baseUrl.testServer

class ApiRequests {
	private server = axios.create({ baseURL: ip, withCredentials: true })

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
	// ----------- user ------------
	private async getNewToken() {
		return await this.sendRequest(ReqTypes.PATCH, URLS.AUTHENTICATE)
	}

	public async signIn(userData: ISignInParameters): Promise<IResponsePostUser> {
		const { data, status } = await this.sendRequest(ReqTypes.POST, URLS.AUTHENTICATE, userData)
		return { data, status }
	}
	public async signOut(): Promise<IUserSignOut> {
		const { status } = await this.sendRequest(ReqTypes.POST, URLS.AUTHENTICATE_LOGOUT)
		return { status }
	}

	public async signUp(userData: ICreateUser): Promise<IResponsePostUser> {
		const { data, status } = await this.sendRequest(ReqTypes.POST, URLS.REGISTER, userData)
		return { data, status }
	}
	public async getUser(): Promise<IResponseGetUser> {
		const { data, status } = await this.sendRequest(ReqTypes.GET, URLS.USER)
		return { data, status }
	}

	// ----------- friends ------------

	public async getFriendsProfiles(usersIds: string[]): Promise<ISerachUsersGet> {
		const { data, status } = await this.sendRequest(ReqTypes.POST, URLS.GET_USERS_PROFILES, {
			usersIds,
		})
		return { data, status }
	}
	public async searchUsers(query: string): Promise<ISerachUsersGet> {
		const { data, status } = await this.sendRequest(ReqTypes.GET, URLS.USER_SEARCH_USERS + query)
		return { data, status }
	}

	// ----------- relationship ------------

	public async getAllRelationships(): Promise<IResponseGetAllRelationships> {
		const { data, status } = await this.sendRequest(ReqTypes.GET, URLS.RELATIONSHIPALl)
		return { data, status }
	}

	public async updateRelationshipRequest(
		parms: IParamatersUpdateRelationship
	): Promise<IResponseRelationships> {
		const { data, status } = await this.sendRequest(ReqTypes.PATCH, URLS.RELATIONSHIP, parms)
		return { data, status }
	}

	public async createRelationshipRequest(
		parms: IParamatersCreateRelationship
	): Promise<IResponseRelationships> {
		const { data, status } = await this.sendRequest(ReqTypes.POST, URLS.RELATIONSHIP, parms)
		return { data, status }
	}
}

export default new ApiRequests()
