import { PUBLIC_BASE_URL } from '$env/static/public';
import axios from 'axios';

export const verifyToken = async (token: string) => {
	return axios.post(
		`${PUBLIC_BASE_URL}/auth/verify`,
		{},
		{
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	);
};
