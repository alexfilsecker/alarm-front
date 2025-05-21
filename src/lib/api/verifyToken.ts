import { PUBLIC_BASE_URL } from '$env/static/public';
import axios from 'axios';

export const verifyToken = async (token: string, baseUrl = PUBLIC_BASE_URL) => {
	return axios.post(
		`${baseUrl}/auth/verify`,
		{},
		{
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	);
};
