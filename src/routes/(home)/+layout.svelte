<script lang="ts">
	import Navbar from './Navbar.svelte';
	import Toasts from './Toasts.svelte';

	let { children, data } = $props();
	const { ws } = data;
</script>

<div>
	{#if ws !== undefined}
		<Navbar {ws} />
		<Toasts {ws} />
	{/if}

	<div class="pt-28">
		{@render children()}
	</div>
</div>
