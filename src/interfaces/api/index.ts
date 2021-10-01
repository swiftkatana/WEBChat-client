export interface IApiError {
	response: IApiErrorResponse
}
interface IApiErrorResponse {
	data: IApiErrorData
}
export interface IApiErrorData {
	field: string
	error: string
	status: number
	message?: string
	statusCode?: number
}
