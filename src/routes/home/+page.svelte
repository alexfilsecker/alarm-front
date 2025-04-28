<script lang="ts">
	import DayAlarmEdit from './DayAlarmEdit.svelte';
	import { getAlarms, type ReturnAlarms } from '$lib/api/alarms';

	let alarms: ReturnAlarms | null = $state(null);

	// const toHourFormat = (minutes: number): string => {
	// 	const hours = Math.floor(minutes / 60);
	// 	const remainder = minutes % 60;
	// 	return `${String(hours).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
	// };

	$effect(() => {
		getAlarms().then((returnAlarms) => {
			alarms = returnAlarms;
		});
	});
</script>

<div class="flex flex-col items-center gap-10">
	<h1 class="text-5xl">ALARM EDITOR</h1>
	{#if alarms !== null}
		{#each Object.entries(alarms) as [day, alarm] (day)}
			<DayAlarmEdit {day} bind:start={alarm.start} bind:end={alarm.end} />
		{/each}
	{/if}
</div>
