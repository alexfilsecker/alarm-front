<script lang="ts">
	import type { WebSocketClient } from '$lib/websocket/ws';
	import { v4 as uuidv4 } from 'uuid';
	import { Toast } from 'flowbite-svelte';
	import { CheckCircleSolid } from 'flowbite-svelte-icons';
	import { fly } from 'svelte/transition';

	interface Props {
		ws: WebSocketClient;
	}

	let { ws }: Props = $props();

	interface ToastState {
		enabled: boolean;
		message: string;
	}
	let toasts: Record<string, ToastState> = $state({});

	const createToast = (message: string) => {
		const uuid = uuidv4();
		toasts[uuid] = { enabled: false, message };
		setTimeout(() => {
			toasts[uuid].enabled = true;
		}, 10);
		setTimeout(() => {
			toasts[uuid].enabled = false;
			setTimeout(() => {
				delete toasts[uuid];
			}, 300);
		}, 3000);
	};

	$effect(() => {
		ws.addOnMessageHandler('AlarmsUpdated', () => {
			createToast('ALARMS UPDATED');
		});
		ws.addOnMessageHandler('GmtOffsetUpdated', () => {
			createToast('GMT OFFSET UPDATED');
		});
	});
</script>

<div class="absolute bottom-3 left-5">
	{#each Object.entries(toasts) as [id, toast] (id)}
		<Toast
			dismissable={false}
			transition={fly}
			params={{ x: -200 }}
			bind:toastStatus={toast.enabled}
		>
			<CheckCircleSolid slot="icon" class="h-5 w-5" />
			{toast.message}</Toast
		>
	{/each}
</div>
