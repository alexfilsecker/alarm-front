import { browser } from '$app/environment';
import { WebSocketClient } from '$lib/websocket/ws';

export const load = () => {
	if (browser) {
		const ws = new WebSocketClient();
		return { ws };
	}
	return {};
};
