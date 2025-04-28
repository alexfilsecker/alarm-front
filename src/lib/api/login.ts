import axios from 'axios';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { validateKnownAxiosError, type LoginErrors } from './axiosErrors';
import Cookies from 'js-cookie';

interface LoginBody {
	username: string;
	password: string;
}

interface ExpectedData {
	token: string;
	refreshToken: string;
}

type LoginReturn = null | LoginErrors;

export const login = async (loginBody: LoginBody): Promise<LoginReturn> => {
	try {
		const response = await axios.post<ExpectedData>(`${PUBLIC_BASE_URL}/auth/login`, loginBody);
		const { token, refreshToken } = response.data;
		Cookies.set('token', token);
		Cookies.set('refreshToken', refreshToken);
	} catch (error: unknown) {
		const axiosError = validateKnownAxiosError(error);
		if (axiosError.response.data.error.type !== 'LoginError') {
			throw error;
		}

		const loginErrors = axiosError.response.data.error.loginErrors;
		return loginErrors;
	}

	return null;
};
