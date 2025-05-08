import axios from 'axios';
import { importBaseUrl } from './importBaseUrl';

export const verifyToken = async (token: string) => {
	const baseUrl = await importBaseUrl();
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
