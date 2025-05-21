<script lang="ts">
	import { filterSeries } from '$lib/utils/filterSeries';
	import { shiftSeries } from '$lib/utils/shiftSeries';
	import { getRange } from '$lib/utils/getRange';
	import { getGraph } from '$lib/api/graphs';
	import { ButtonGroup, Button, Toggle } from 'flowbite-svelte';

	type PosibleValues = '1m' | '5m' | '1h' | '2h' | '3h' | '6h' | '1d' | '1d';
	const buttons: PosibleValues[] = ['1m', '5m', '1h', '2h', '3h', '6h', '1d'];

	interface Props {
		rangeY: {
			min: number;
			max: number;
		};
		points: number[][];
		allPoints: number[][];
		live: boolean;
	}

	let {
		rangeY = $bindable(),
		live = $bindable(),
		points = $bindable(),
		allPoints = $bindable()
	}: Props = $props();

	let selected: PosibleValues = $state('1m');

	const onSelect = (timeRange: PosibleValues) => {
		return () => {
			allPoints = [];
			selected = timeRange;
			getGraph(timeRange).then((res) => {
				allPoints = res;
				points = filterSeries(allPoints);
				rangeY = getRange(allPoints);
			});
		};
	};

	$effect(() => {});

	$effect(() => {
		if (!live) return;
		if (allPoints.length === 0) return;
		shiftSeries(allPoints, selected);
		points = filterSeries(allPoints);
		rangeY = getRange(allPoints);
	});
</script>

<div class="flex w-full items-center justify-between">
	<div class="flex items-center gap-3">
		<div class="font-bold text-black">Time Range</div>
		<ButtonGroup>
			{#each buttons as button (button)}
				<Button
					class={selected === button ? '!bg-primary-500 !text-white' : ''}
					onclick={onSelect(button)}>{button}</Button
				>
			{/each}
		</ButtonGroup>
	</div>
	<div class="flex items-center gap-2 text-lg font-bold text-black">
		Live
		<Toggle bind:checked={live} class=""></Toggle>
	</div>
</div>
