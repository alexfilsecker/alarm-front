<script lang="ts">
	import { getGraph } from '$lib/api/graphs';
	import { Chart } from 'flowbite-svelte';
	import { type ApexOptions } from 'apexcharts';
	import { filterSeries } from '$lib/utils/filterSeries';

	let allPoints: number[][] = $state([]);
	let points: number[][] = $state([]);

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
				},
				beforeZoom: (_, { xaxis }) => {
					const min: number = xaxis.min ?? allPoints[0][0];
					const max: number = xaxis.max ?? allPoints[allPoints.length - 1][0];
					points = filterSeries(allPoints, { min, max });
				}
			}
		},
		stroke: {
			// width: 1.5,
			curve: 'smooth'
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
			min: allPoints.reduce((acc, point) => Math.min(acc, point[1]), 100000000000000),
			max: allPoints.reduce((acc, point) => Math.max(acc, point[1]), -100000000000000)
		},
		tooltip: {
			x: {
				format: 'dd MMM yyyy HH:mm'
			}
		}
	});

	$effect(() => {
		getGraph().then((res) => {
			allPoints = res;
			points = filterSeries(allPoints);
		});
	});
</script>

<h1 class="text-4xl">Graphs</h1>
{#if points.length > 0}
	<Chart options={chartOptions} class="w-full" />
{/if}
