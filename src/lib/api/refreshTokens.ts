import axios from 'axios';
import { validateKnownAxiosError } from './axiosErrors';
import { PUBLIC_BASE_URL } from '$env/static/public';

export interface ExpectedRefresh {
	newToken: string;
	newRefreshToken: string;
}

export const refreshTokens = async (refreshToken: string, baseUrl: string = PUBLIC_BASE_URL) => {
	try {
		const response = await axios.post<ExpectedRefresh>(`${baseUrl}/auth/refresh`, {
			refreshToken
		});
		return response.data;
	} catch (error: unknown) {
		validateKnownAxiosError(error);
		return null;
	}
};
