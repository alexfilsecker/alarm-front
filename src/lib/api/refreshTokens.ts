import { importBaseUrl } from './importBaseUrl';
import axios from 'axios';
import { validateKnownAxiosError } from './axiosErrors';

export interface ExpectedRefresh {
	newToken: string;
	newRefreshToken: string;
}

export const refreshTokens = async (refreshToken: string) => {
	try {
		const baseUrl = await importBaseUrl();
		const response = await axios.post<ExpectedRefresh>(`${baseUrl}/auth/refresh`, {
			refreshToken
		});
		return response.data;
	} catch (error: unknown) {
		validateKnownAxiosError(error);
		return null;
	}
};
