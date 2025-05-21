import { z } from 'zod';
import { PUBLIC_WS_URL } from '$env/static/public';

export type MessageHandler = (data?: object | string) => void;

const messageSchema = z.object({
	event: z.string(),
	data: z.union([z.object({}).passthrough(), z.string()]).optional()
});

type Message = z.infer<typeof messageSchema>;

export class WebSocketClient {
	private url: string;
	private socket: WebSocket | null = null;
	private reconnectAttempts = 0;
	private maxReconnectAttempts: number;
	private reconnectBaseDelay: number;
	private onMessageHandlers: Record<string, MessageHandler[]>;
	private onOpen: () => void;
	private onClose: () => void;
	private onError: (error: Event) => void;

	constructor() {
		this.url = PUBLIC_WS_URL;
		this.maxReconnectAttempts = 5;
		this.reconnectBaseDelay = 1000;
		this.onOpen = () => {};
		this.onClose = () => {};
		this.onError = () => {};
		this.onMessageHandlers = {};

		this.connect();
	}

	private parseMessage(message: string): Message | null {
		let parsedData: Message | undefined;
		try {
			const data = JSON.parse(message);
			parsedData = messageSchema.parse(data);
		} catch (e) {
			console.error('could not parse data', e);
			return null;
		}
		return parsedData;
	}

	private connect() {
		if (this.socket && this.socket.readyState <= 1) return; // Already connecting or open

		this.socket = new WebSocket(this.url);

		this.socket.onopen = () => {
			this.reconnectAttempts = 0;
			this.onOpen();
		};

		this.socket.onmessage = (messageEvent) => {
			if (typeof messageEvent.data !== 'string') {
				console.warn('recieved:', messageEvent.data);
				return;
			}

			const parsedData = this.parseMessage(messageEvent.data);
			if (parsedData === null) {
				console.error('Could not parse data');
				return;
			}

			const { event, data } = parsedData;

			if (!(event in this.onMessageHandlers) || this.onMessageHandlers[event].length === 0) {
				console.warn('No handler for', event);
				return;
			}

			this.onMessageHandlers[event].forEach((handler) => {
				handler(data);
			});
		};

		this.socket.onerror = (error) => {
			this.onError(error);
			if (this.socket === null) return;
			this.socket.close(); // Triggers onclose
		};

		this.socket.onclose = () => {
			this.onClose();
			this.tryReconnect();
		};
	}

	private tryReconnect() {
		if (this.reconnectAttempts >= this.maxReconnectAttempts) {
			console.warn('Max reconnect attempts reached.');
			return;
		}

		const delay = Math.min(this.reconnectBaseDelay * 2 ** this.reconnectAttempts, 30000);
		this.reconnectAttempts++;

		setTimeout(() => {
			console.log(`Reconnecting (attempt ${this.reconnectAttempts})...`);
			this.connect();
		}, delay);
	}

	public send(data: object | string) {
		if (this.socket === null || this.socket.readyState !== WebSocket.OPEN) {
			console.warn('WebSocket not connected. Message not sent.');
			return;
		}

		this.socket.send(JSON.stringify(data));
	}

	public close() {
		if (this.socket === null) return;
		this.socket.close();
	}

	public setOnOpen(onOpen: () => void) {
		this.onOpen = onOpen;
	}

	public setOnClose(onClose: () => void) {
		this.onClose = onClose;
	}

	public setOnError(onError: (_: Event) => void) {
		this.onError = onError;
	}

	public addOnMessageHandler(event: string, handler: MessageHandler) {
		if (!(event in this.onMessageHandlers)) {
			this.onMessageHandlers[event] = [];
		}
		this.onMessageHandlers[event].push(handler);
	}

	public beep() {
		if (this.socket === null) return;
		this.socket.send(JSON.stringify({ event: 'BEEP', data: true }));
	}

	public beepnt() {
		if (this.socket === null) return;
		this.socket.send(JSON.stringify({ event: 'BEEP', data: false }));
	}
}
