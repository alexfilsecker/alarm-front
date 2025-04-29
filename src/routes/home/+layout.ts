import { WebSocketClient } from '$lib/websocket/ws';

export const load = () => {
	const ws = new WebSocketClient();

	return { ws };
};
