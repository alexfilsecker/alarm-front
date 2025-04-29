<script lang="ts">
	let { children, data } = $props();
	const { ws } = data;

	$effect(() => {
		ws.setOnOpen(() => {
			console.log('opening');
		});
		ws.addOnMessageHandler((message) => {
			console.log(message);
		});
	});
</script>

<div class="flex flex-col items-center">
	{@render children()}
</div>
