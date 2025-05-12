<script lang="ts">
	import { getGraph } from '$lib/api/graphs';
	import { filterSeries } from '$lib/utils/filterSeries';
	import { z } from 'zod';
	import Chart from './Chart.svelte';
	import { getRange } from '$lib/utils/getRange';
	import ChartOptions from './ChartOptions.svelte';

	let allPoints: number[][] = $state([]);
	let points: number[][] = $state([]);
	let range: { min: number; max: number } = $state({ min: 0, max: 0 });

	const { data } = $props();
	const { ws } = data;

	const acceptNewRead = (data?: string | object) => {
		const dataSchema = z.object({
			read: z.number(),
			time: z.number()
		});
		const parsedData = dataSchema.parse(data);
		allPoints.push([parsedData.time, parsedData.read]);
	};

	$effect(() => {
		getGraph().then((res) => {
			allPoints = res;
			points = filterSeries(allPoints);
			range = getRange(allPoints);
		});

		if (ws === undefined) return; // Should not happen
		ws.addOnMessageHandler('SendRead', acceptNewRead);
	});
</script>

<div class="flex w-full flex-col items-center gap-4">
	<h1 class="text-4xl">Charts</h1>
	<ChartOptions />
	{#if points.length > 0}
		<Chart {allPoints} {points} rangeY={range} />
	{/if}
</div>
