import { PUBLIC_BASE_URL } from '$env/static/public';
import axios from 'axios';
import { validateKnownAxiosError } from './axiosErrors';

export interface ExpectedRefresh {
	newToken: string;
	newRefreshToken: string;
}

export const refreshTokens = async (refreshToken: string) => {
	try {
		const response = await axios.post<ExpectedRefresh>(`${PUBLIC_BASE_URL}/auth/refresh`, {
			refreshToken
		});
		return response.data;
	} catch (error: unknown) {
		validateKnownAxiosError(error);
		return null;
	}
};
