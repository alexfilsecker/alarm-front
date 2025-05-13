<script lang="ts">
	import Toasts from './Toasts.svelte';

	let { children, data } = $props();
	const { ws } = data;
</script>

<div class="flex flex-col items-center">
	<Toasts {ws} />
	{@render children()}
</div>
