<script lang="ts">
	import DoubleRangeSlider from '$lib/components/DoubleRangeSlider.svelte';
	const min = 270;
	const max = 1200;
	let start: number = $state(min);
	let end: number = $state(max);

	const toHourFormat = (minutes: number): string => {
		const hours = Math.floor(minutes / 60);
		const remainder = minutes % 60;
		return `${String(hours).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
	};
</script>

<h1 class="text-5xl">Home</h1>
<DoubleRangeSlider bind:start bind:end {min} {max} step={15} />

<p>{toHourFormat(start)} {toHourFormat(end)}</p>
