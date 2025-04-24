import { jwtDecode } from 'jwt-decode';

export interface JwtWithExp {
	exp: number;
}

export const validExpInJwt = (jwt: string): boolean => {
	try {
		const { exp } = jwtDecode<JwtWithExp>(jwt);
		if (exp * 1000 < Date.now()) {
			return false;
		}
	} catch {
		return false;
	}
	return true;
};
