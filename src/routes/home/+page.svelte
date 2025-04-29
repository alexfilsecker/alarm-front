<script lang="ts">
	import DayAlarmEdit from './DayAlarmEdit.svelte';
	import {
		getAlarms,
		updateAlarms,
		type Alarms,
		type AlarmInfo,
		orderedDays
	} from '$lib/api/alarms';
	import { Button } from 'flowbite-svelte';

	let alarms: Alarms | null = $state(null);

	$effect(() => {
		getAlarms().then((returnAlarms) => {
			alarms = returnAlarms;
		});
	});

	const onclick = () => {
		if (alarms === null) {
			return;
		}
		updateAlarms(alarms);
	};

	const sortAlarms = (alarms: Alarms | null): [string, AlarmInfo][] | null => {
		if (alarms === null) return null;

		const entries: [string, AlarmInfo][] = [];
		orderedDays.forEach((orderedDay) => {
			entries.push([orderedDay, alarms[orderedDay]]);
		});
		return entries;
	};

	let sortedAlarms = $derived(sortAlarms(alarms));
</script>

<div class="flex flex-col items-center gap-10">
	<h1 class="text-5xl">ALARM EDITOR</h1>
	{#if sortedAlarms !== null}
		{#each sortedAlarms as [day, alarm] (day)}
			<DayAlarmEdit
				{day}
				bind:start={alarm.start}
				bind:end={alarm.end}
				bind:enabled={alarm.enabled}
			/>
		{/each}
	{/if}

	<Button {onclick}>UPDATE</Button>
</div>
