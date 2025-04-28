import { redirect, type ServerLoad, type ServerLoadEvent } from '@sveltejs/kit';
import { refreshTokens, type ExpectedRefresh } from '$lib/api/refreshTokens';
import { validExpInJwt } from '$lib/utils/jwt';
import { verifyToken } from '$lib/api/verifyToken';

const fallback = (route: string | null): object => {
	if (route === '/login') {
		return {};
	}

	throw redirect(307, '/login');
};

const setNewTokens = (loadEvent: ServerLoadEvent, newTokens: ExpectedRefresh): string => {
	const { newToken, newRefreshToken } = newTokens;
	loadEvent.cookies.set('token', newToken, { path: '/', httpOnly: false });
	loadEvent.cookies.set('refreshToken', newRefreshToken, { path: '/', httpOnly: false });
	return newToken;
};

const badToken = async (loadEvent: ServerLoadEvent): Promise<string> => {
	// token cookie not found, try with refreshToken
	const refreshToken = loadEvent.cookies.get('refreshToken');

	if (!refreshToken) {
		// No refreshToken either
		throw new Error('no refresh token');
	}

	// Decode refreshToken to see if it is expired
	const valid = validExpInJwt(refreshToken);
	if (!valid) {
		loadEvent.cookies.delete('refreshToken', { path: '/' });
		throw new Error('refresh token not valid');
	}

	// Try to get new tokens with refreshToken
	const newTokens = await refreshTokens(refreshToken);
	if (newTokens === null) {
		// Could not refresh tokens,
		loadEvent.cookies.delete('refreshToken', { path: '/' });
		throw new Error('Could not get new tokens');
	}

	// Set newTokens
	return setNewTokens(loadEvent, newTokens);
};

export const load: ServerLoad = async (loadEvent) => {
	const route = loadEvent.route.id;

	let token = loadEvent.cookies.get('token');
	if (!token) {
		try {
			token = await badToken(loadEvent);
		} catch {
			return fallback(route);
		}
	}

	const valid = validExpInJwt(token);
	if (!valid) {
		loadEvent.cookies.delete('token', { path: '/' });
		try {
			token = await badToken(loadEvent);
		} catch {
			return fallback(route);
		}
	}

	// Verify Token
	try {
		await verifyToken(token);
	} catch {
		loadEvent.cookies.delete('token', { path: '/' });
		loadEvent.cookies.delete('refreshToken', { path: '/' });
		fallback(route);
	}

	if (route === '/login' || route === '/') {
		throw redirect(307, '/home');
	}

	return {};
};
