<script lang="ts">
	import { filterSeries } from '$lib/utils/filterSeries';
	import { getRange } from '$lib/utils/getRange';
	import { type ApexOptions } from 'apexcharts';
	import { Chart } from 'flowbite-svelte';

	interface Props {
		rangeY: {
			min: number;
			max: number;
		};
		points: number[][];
		allPoints: number[][];
	}

	let { rangeY = $bindable(), points = $bindable(), allPoints = $bindable() }: Props = $props();

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
					rangeY = getRange(allPoints);
				},
				beforeZoom: (_, { xaxis }) => {
					const min: number = xaxis.min ?? allPoints[0][0];
					const max: number = xaxis.max ?? allPoints[allPoints.length - 1][0];
					points = filterSeries(allPoints, { min, max });
					rangeY = getRange(points);
				}
			}
		},
		stroke: {
			width: 2,
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
			min: rangeY.min,
			max: rangeY.max
		},
		tooltip: {
			x: {
				format: 'dd MMM yyyy HH:mm'
			}
		}
	});
</script>

{#if points.length !== 0}
	<Chart options={chartOptions} class="w-full" />
{:else}
	<div>no points</div>
{/if}
