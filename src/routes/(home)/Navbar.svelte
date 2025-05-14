<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from 'flowbite-svelte';
	import BeepButton from './BeepButton.svelte';
	import type { WebSocketClient } from '$lib/websocket/ws';

	interface Props {
		ws: WebSocketClient;
	}

	let { ws }: Props = $props();

	const route = (path: string) => {
		return () => {
			goto(path);
		};
	};
</script>

<div class="bg-primary-50 absolute flex h-20 w-full items-center justify-between px-12 shadow-md">
	<div class="text-4xl font-bold">⏰ Alarm</div>
	<BeepButton {ws} />
	<div class="flex items-center gap-4">
		<Button onclick={route('/edit')}>Edit</Button>
		<Button onclick={route('/charts')}>Charts</Button>
	</div>
</div>
