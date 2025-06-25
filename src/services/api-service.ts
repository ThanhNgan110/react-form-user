import { API_URL } from '../constants'

import type { IApiResponse } from '../types'

class ApiService<T> {
	resourceUrl: string

	constructor(nameResource: string) {
		this.resourceUrl = `${API_URL}/${nameResource}`
	}

	async getList(): Promise<IApiResponse<T[]>> {
		try {
			const response = await fetch(this.resourceUrl)
			const data = await response.json()

			if (!response.ok) {
				return { isSucess: false, msg: data.msg }
			}

			return { data: data.data, isSucess: true }
		} catch (error) {
			let msg = ''

			if (error instanceof Error) {
				msg = error.message
			}

			console.error(error, msg)
			return { isSucess: false, msg }
		}
	}

	async post(data: Omit<T, 'id'>, endPoint: string): Promise<IApiResponse<T>> {
		try {
			const response = await fetch(`${this.resourceUrl}/${endPoint}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ data: data }),
			})

			const createdItem = await response.json()

			if (!response.ok) {
				return { isSucess: false, msg: createdItem.msg }
			}

			return { data: createdItem, isSucess: true }
		} catch (error: unknown) {
			let msg = ''

			if (error instanceof Error) {
				msg = error.message
			}

			console.error(error, msg)
			return { isSucess: false, msg }
		}
	}

	async deleteById(id: string) {
		try {
			const response = await fetch(`${this.resourceUrl}/${id}`)
			const result = await response.json()

			if (!response.ok) {
				return { isSucess: false, msg: result.msg }
			}

			return { isSucess: true, msg: result.msg }
		} catch (error) {
			console.error(error)
		}
	}
}

export default ApiService
