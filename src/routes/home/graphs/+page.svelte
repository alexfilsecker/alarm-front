<script lang="ts">
	import { getGraph } from '$lib/api/graphs';
	import { Chart } from 'flowbite-svelte';
	import { type ApexOptions } from 'apexcharts';
	import { filterSeries } from '$lib/utils/filterSeries';
	import { z } from 'zod';

	let allPoints: number[][] = $state([]);
	let points: number[][] = $state([]);
	let range: { min: number; max: number } = $state({ min: 0, max: 0 });

	const { data } = $props();
	const { ws } = data;

	const setRange = () => {
		range = {
			min: allPoints.reduce((acc, point) => Math.min(acc, point[1]), Infinity),
			max: allPoints.reduce((acc, point) => Math.max(acc, point[1]), -Infinity)
		};
	};

	let chartOptions: ApexOptions = $derived({
		chart: {
			type: 'line',
			height: 600,
			zoom: {
				enabled: true,
				type: 'x'
			},
			events: {
				beforeResetZoom: () => {
					const min: number = allPoints[0][0];
					const max: number = allPoints[allPoints.length - 1][0];
					points = filterSeries(allPoints, { min, max });
					setRange();
				},
				beforeZoom: (_, { xaxis }) => {
					const min: number = xaxis.min ?? allPoints[0][0];
					const max: number = xaxis.max ?? allPoints[allPoints.length - 1][0];
					points = filterSeries(allPoints, { min, max });
					setRange();
				}
			}
		},
		stroke: {
			// width: 1.5,
			curve: 'straight'
		},

		series: [
			{
				name: 'Scale',
				data: points
			}
		],
		xaxis: {
			type: 'datetime',
			title: {
				text: 'Timestamp'
			}
		},
		yaxis: {
			title: {
				text: 'Sensor Reading'
			},
			labels: {
				formatter: (value) => value.toFixed(1)
			},
			min: range.min,
			max: range.max
		},
		tooltip: {
			x: {
				format: 'dd MMM yyyy HH:mm'
			}
		}
	});

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
			setRange();
		});

		if (ws === undefined) return; // Should not happen

		ws.addOnMessageHandler('SendRead', acceptNewRead);
	});
</script>

<h1 class="text-4xl">Graphs</h1>
{#if points.length > 0}
	<Chart options={chartOptions} class="w-full" />
{/if}
