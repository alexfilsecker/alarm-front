<script lang="ts">
	import DoubleRangeSlider from '$lib/components/DoubleRangeSlider.svelte';
	import { Checkbox } from 'flowbite-svelte';

	interface Props {
		start: number;
		end: number;
		day: string;
	}

	const max = 20 * 60;
	const min = 4.5 * 60;
	const step = 15;
	let { start = $bindable(), end = $bindable(), day }: Props = $props();
</script>

<div class="flex w-full min-w-2xl items-center justify-center gap-4">
	<p>{day}</p>
	<DoubleRangeSlider {min} {max} {step} {start} {end} />
	<div class="flex items-center gap-3">
		<p>Enabled?</p>
		<Checkbox />
	</div>
</div>
