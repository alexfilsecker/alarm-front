import { browser } from '$app/environment';
import { WebSocketClient } from '$lib/websocket/ws';

export const load = () => {
	const ws = new WebSocketClient();
	if (browser) {
		return { ws };
	}
	return {};
};
