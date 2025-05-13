<script lang="ts">
	import Navbar from './Navbar.svelte';
	import Toasts from './Toasts.svelte';

	let { children, data } = $props();
	const { ws } = data;
</script>

{#if ws !== undefined}
	<Navbar {ws} />
	<Toasts {ws} />
{/if}

<div class="flex flex-col items-center">
	{@render children()}
</div>
