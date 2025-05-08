import { browser } from '$app/environment';

export const importBaseUrl = async (): Promise<string> => {
	let baseUrl: string;
	if (browser) {
		const publicEnvs = await import('$env/static/public');
		baseUrl = publicEnvs.PUBLIC_BASE_URL;
	} else {
		const privateEnvs = await import('$env/static/private');
		baseUrl = privateEnvs.BASE_URL;
	}
	return baseUrl;
};
