import axios from 'axios';
import Cookies from 'js-cookie';
import { importBaseUrl } from './importBaseUrl';
import { validateKnownAxiosError } from './axiosErrors';
import { goto } from '$app/navigation';
import { refreshTokens } from './refreshTokens';

const badToken = async () => {
	const refreshToken = Cookies.get('refreshToken');
	if (refreshToken === undefined) {
		throw new Error('no refreshToken');
	}

	const newTokens = await refreshTokens(refreshToken);
	if (newTokens === null) {
		throw new Error('Could not refresh tokens');
	}

	const { newToken, newRefreshToken } = newTokens;
	Cookies.set('token', newToken);
	Cookies.set('refreshToken', newRefreshToken);
	return newToken;
};

export default class API {
	static async request<T = unknown>(
		method: 'POST' | 'GET' | 'PUT',
		path: string,
		body: object | null = null,
		withToken: boolean = true
	): Promise<T> {
		let token: string | undefined;
		if (withToken) {
			token = Cookies.get('token');
			if (token === undefined) {
				try {
					token = await badToken();
				} catch {
					goto('/login');
				}
			}
		}

		const baseUrl = await importBaseUrl();

		let done = false;
		while (!done) {
			try {
				const response = await axios.request<T>({
					data: method !== 'GET' ? body : undefined,
					params: method === 'GET' ? body : undefined,
					method,
					url: `${baseUrl}/${path}`,
					headers: {
						Authorization: withToken ? `Bearer ${token}` : undefined
					}
				});
				return response.data;
			} catch (e: unknown) {
				const axiosError = validateKnownAxiosError(e); // Throws the error if it is not AxiosError
				if (axiosError.status !== 401) {
					throw e;
				}

				try {
					token = await badToken();
				} catch {
					goto('/login');
					done = true;
				}
			}
		}

		throw new Error('Could not fetch data');
	}

	static post<T = unknown>(path: string, body: object | null = null, withToken: boolean = true) {
		return this.request<T>('POST', path, body, withToken);
	}

	static async get<T = unknown>(path: string, params: object | null, withToken: boolean = true) {
		return this.request<T>('GET', path, params, withToken);
	}

	static async put<T = unknown>(path: string, body: object, withToken: boolean = true) {
		return this.request<T>('PUT', path, body, withToken);
	}
}
