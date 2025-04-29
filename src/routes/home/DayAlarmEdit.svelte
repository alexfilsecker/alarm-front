<script lang="ts">
	import DoubleRangeSlider from '$lib/components/DoubleRangeSlider.svelte';
	import { Checkbox } from 'flowbite-svelte';

	interface Props {
		day: string;
		start: number;
		end: number;
		enabled: boolean;
	}

	const max = 20 * 60;
	const min = 4.5 * 60;
	const step = 15;
	let { start = $bindable(), end = $bindable(), enabled = $bindable(), day }: Props = $props();

	const toHourFormat = (minutes: number): string => {
		const hours = Math.floor(minutes / 60);
		const remainder = minutes % 60;
		return `${String(hours).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
	};

	let niceStart = $derived(toHourFormat(start));
	let niceEnd = $derived(toHourFormat(end));
</script>

<div class="flex w-full min-w-2xl items-center justify-center gap-4">
	<div class="align-center flex w-32 flex-col justify-center gap-1">
		<p class="w-full text-center">{day}</p>
		<p class="w-full text-center">{niceStart} {niceEnd}</p>
	</div>
	<DoubleRangeSlider {min} {max} {step} bind:start bind:end />
	<div class="flex items-center gap-3">
		<p>Enabled?</p>
		<Checkbox bind:checked={enabled} />
	</div>
</div>
