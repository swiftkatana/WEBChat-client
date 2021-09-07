export interface IApiError {
	response: IApiErrorResponse
}
interface IApiErrorResponse {
	data: IApiErrorData
}
interface IApiErrorData {
	error: string
}
