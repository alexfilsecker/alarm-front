import { validateKnownAxiosError, type LoginErrors } from './axiosErrors';
import Cookies from 'js-cookie';
import API from '.';

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
		const response = await API.post<ExpectedData>(`auth/login`, loginBody);
		const { token, refreshToken } = response;
		Cookies.set('token', token);
		Cookies.set('refreshToken', refreshToken);
	} catch (error: unknown) {
		console.log(error);
		const axiosError = validateKnownAxiosError(error);
		if (axiosError.response.data.error.type !== 'LoginError') {
			throw error;
		}

		const loginErrors = axiosError.response.data.error.loginErrors;
		return loginErrors;
	}

	return null;
};
