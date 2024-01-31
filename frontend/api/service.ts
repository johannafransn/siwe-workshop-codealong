import { getCookie } from "@/helper/utils"
import { SiweMessage } from "siwe"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_HOST || 'http://0.0.0.0:5000'
if (!API_BASE_URL) throw new Error('API_BASE_URL undefined in .env')

const HEADERS = {
	'Content-Type': 'application/json',
}

const ApiMethods = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE',
}

const ApiService = {
	/** @endpoint /v1/session */
	createSiweMessage: async (wallet_address: string) => {
		const API_ENDPOINT = '/v1/session/create'
		const url = `${API_BASE_URL}${API_ENDPOINT}`
		const options = {
			method: ApiMethods.POST,
			headers: HEADERS,
			body: JSON.stringify({ signatory_address: wallet_address }),
		}

		const response = await fetch(url, options)

		if (response.ok) {
			return await response.json()
		} else {
			throw new Error(
				`Request ${API_ENDPOINT} failed with status ${response.status}`,
			)
		}
	},

	verifySiweMessage: async (message: SiweMessage, signature: string) => {
		const API_ENDPOINT = '/v1/session/verify'
		const url = `${API_BASE_URL}${API_ENDPOINT}`
		const options = {
			method: ApiMethods.POST,
			headers: HEADERS,
			body: JSON.stringify({ message, signature }),
		}

		console.log(options, 'OPTIONS')

		const response = await fetch(url, options)
		console.log(response, 'wats res???')

		if (response.ok) {
			return await response.json()
		} else {
			throw new Error(
				`Request ${API_ENDPOINT} failed with status ${response.status}`,
			)
		}
	},

	getNonce: async () => {
		const API_ENDPOINT = '/v1/session/nonce'
		const url = `${API_BASE_URL}${API_ENDPOINT}`
		const options = {
			method: ApiMethods.GET,
			headers: HEADERS,
		}

		const response = await fetch(url, options)

		if (response.ok) {
			return await response.json()
		} else {
			throw new Error(
				`Request ${API_ENDPOINT} failed with status ${response.status}`,
			)
		}
	},

	getAuthenticatedData: async () => {
		console.log(getCookie(), 'get cookie??')
		const API_ENDPOINT = '/v1/session/authenticated/data'
		const url = `${API_BASE_URL}${API_ENDPOINT}`
		const options = {
			method: ApiMethods.GET,
			headers: {
				Accept: "application/json",
				Authorization: "Bearer " + getCookie(),
				"Content-Type": "application/json",
			},

		}

		const response = await fetch(url, options)

		if (response.ok) {
			return await response.json()
		} else {
			throw new Error(
				`Request ${API_ENDPOINT} failed with status ${response.status}`,
			)
		}
	},

}

export default ApiService

/**
 * fetch('http://localhost:5000/v1/session/auth'
 * fetch('http://localhost:5000/v1/session/verify
 *

 */
