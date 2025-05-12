<script lang="ts">
	import DayAlarmEdit from './DayAlarmEdit.svelte';
	import BeepButton from './BeepButton.svelte';
	import {
		getAlarms,
		updateAlarms,
		type Alarms,
		type AlarmInfo,
		orderedDays
	} from '$lib/api/alarms';
	import { Button, Spinner } from 'flowbite-svelte';

	let alarms: Alarms | null = $state(null);

	let updateLoading = $state(false);

	$effect(() => {
		getAlarms().then((returnAlarms) => {
			alarms = returnAlarms;
		});
	});

	const { data } = $props();
	const { ws } = data;

	const onclick = () => {
		if (alarms === null) {
			return;
		}
		updateLoading = true;
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

	$effect(() => {
		if (ws === undefined) return; // Should not happen
		ws.addOnMessageHandler('AlarmsUpdated', () => {
			updateLoading = false;
		});
	});
</script>

<div class="flex flex-col items-center gap-3">
	<h1 class="text-5xl">ALARM EDITOR</h1>
	<a href="home/charts">charts</a>
	{#if ws !== undefined}
		<BeepButton {ws} />
	{/if}
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

	<Button {onclick}>
		{#if updateLoading}
			<Spinner />
		{:else}
			UPDATE
		{/if}
	</Button>
</div>
