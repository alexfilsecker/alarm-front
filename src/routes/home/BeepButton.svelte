<script lang="ts">
	import type { WebSocketClient } from '$lib/websocket/ws';
	import { Button } from 'flowbite-svelte';

	interface Props {
		ws: WebSocketClient;
	}
	const { ws }: Props = $props();

	const beep = () => {
		console.log('BEEP!!!');
		ws.beep();
	};
	const beepnt = () => {
		console.log("beepn't");
		ws.beepnt();
	};
</script>

<Button on:mousedown={beep} on:mouseup={beepnt}>BEEP</Button>
