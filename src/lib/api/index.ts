import { PUBLIC_BASE_URL } from '$env/static/public';
import axios from 'axios';
import Cookies from 'js-cookie';

export default class API {
	static async request<T = unknown>(
		method: 'POST' | 'GET',
		path: string,
		body: object | null = null,
		withToken: boolean = true
	) {
		let token: string | undefined;
		if (withToken) {
			token = Cookies.get('token');
			if (token === undefined) {
				// TODO: Should verify if there is a refreshToken and try to get new Tokens
				// If it can't get new tokens we should redirect to /login
				throw new Error('No Token');
			}
		}

		const response = await axios.request<T>({
			data: method !== 'GET' ? body : undefined,
			params: method === 'GET' ? body : undefined,
			method,
			url: `${PUBLIC_BASE_URL}/${path}`,
			headers: {
				Authorization: withToken ? `Bearer ${token}` : undefined
			}
		});

		return response.data;
	}

	static post<T = unknown>(path: string, body: object | null = null, withToken: boolean = true) {
		return this.request<T>('POST', path, body, withToken);
	}

	static async get<T = unknown>(path: string, params: object | null, withToken: boolean = true) {
		return this.request<T>('GET', path, params, withToken);
	}
}
