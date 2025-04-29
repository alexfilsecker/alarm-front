export type MessageHandler = (data: object | string) => void;

export class WebSocketClient {
	private url: string;
	private socket: WebSocket | null = null;
	private reconnectAttempts = 0;
	private maxReconnectAttempts: number;
	private reconnectBaseDelay: number;
	private onMessageHandlers: MessageHandler[];
	private onOpen: () => void;
	private onClose: () => void;
	private onError: (error: Event) => void;

	constructor() {
		this.url = 'ws://localhost:8000/?client=FRONT';
		this.maxReconnectAttempts = 5;
		this.reconnectBaseDelay = 1000;
		this.onOpen = () => {};
		this.onClose = () => {};
		this.onError = () => {};
		this.onMessageHandlers = [];

		this.connect();
	}

	private connect() {
		if (this.socket && this.socket.readyState <= 1) return; // Already connecting or open

		this.socket = new WebSocket(this.url);

		this.socket.onopen = () => {
			this.reconnectAttempts = 0;
			this.onOpen();
		};

		this.socket.onmessage = (event) => {
			if (typeof event.data === 'string') {
				this.onMessageHandlers.forEach((handler) => {
					handler(event.data);
				});
			}
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

	public addOnMessageHandler(handler: MessageHandler) {
		this.onMessageHandlers.push(handler);
	}
}
