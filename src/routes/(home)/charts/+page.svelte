<script lang="ts">
	import { z } from 'zod';
	import Chart from './Chart.svelte';
	import ChartOptions from './ChartOptions.svelte';
	import { Card } from 'flowbite-svelte';

	let allPoints: number[][] = $state([]);
	let points: number[][] = $state([]);
	let rangeY: { min: number; max: number } = $state({ min: 0, max: 0 });
	let live: boolean = $state(true);

	const { data } = $props();
	const { ws } = data;

	const acceptNewRead = (data?: string | object) => {
		const dataSchema = z.object({
			read: z.number(),
			time: z.number()
		});
		const parsedData = dataSchema.parse(data);
		allPoints.push([parsedData.time, parsedData.read]);
		allPoints.sort((a, b) => a[0] - b[0]);
	};

	$effect(() => {
		if (ws === undefined) return; // Should not happen
		ws.addOnMessageHandler('SendRead', acceptNewRead);
	});
</script>

<div class="flex flex-col items-center px-5">
	<Card class="flex w-full max-w-none flex-col items-start gap-4">
		<ChartOptions bind:allPoints bind:points bind:rangeY bind:live />
		{#if points.length > 0}
			<Chart {allPoints} {points} {rangeY} {live} />
		{/if}
	</Card>
</div>
