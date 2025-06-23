export interface IApiResponse<T> {
	data?: T
	status?: number
	isSuccess: boolean
	errorsMsg?: Error[]
}

export interface IAccount {
	first_name: string
	last_name: string
	email: string
	address: string
	city: string
	country: string
	state: string
	role: string
	password: string
}
