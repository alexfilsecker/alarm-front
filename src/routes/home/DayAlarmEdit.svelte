<script lang="ts">
	import DoubleRangeSlider from '$lib/components/DoubleRangeSlider.svelte';
	import { MAX_ALARM, MIN_ALARM } from '$lib/utils/constants';
	import { Checkbox, Card } from 'flowbite-svelte';

	interface Props {
		day: string;
		start: number;
		end: number;
		enabled: boolean;
	}

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

<Card class="flex w-full min-w-2xl flex-row items-center justify-around gap-3 !p-4 font-bold">
	<p class="w-28">{day}</p>
	<div class="flex w-28 items-center gap-3">
		<Checkbox bind:checked={enabled} />
		<p>Alarm</p>
	</div>
	<div class="flex w-1/2 gap-3">
		<div class="w-12">{niceStart}</div>
		<DoubleRangeSlider min={MIN_ALARM} max={MAX_ALARM} {step} bind:start bind:end />
		<p class="w-12">{niceEnd}</p>
	</div>
</Card>
