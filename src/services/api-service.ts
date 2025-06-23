import { API_URL } from '../constants'

import type { IApiResponse } from '../types'

class ApiService<T> {
	resourceUrl: string

	constructor(endPoint: string) {
		this.resourceUrl = `${API_URL}/${endPoint}`
	}

	async getList(baseUrl: string): Promise<IApiResponse<T[]>> {
		try {
			const response = await fetch(baseUrl)
			const data = await response.json()

			if (!response.ok) {
				const errorMsg = 'Failed to fetch api'
				console.error(response.statusText)
				return { isSuccess: false, errorsMsg: [new Error(errorMsg)] }
			}

			return { data, isSuccess: true }
		} catch (error) {
			const errorMsg = 'Failed to fetch api'
			console.error(error, errorMsg)
			return { isSuccess: false, errorsMsg: [new Error(errorMsg)] }
		}
	}

	// post
	// update by id
	// delete by id
}

export default ApiService
