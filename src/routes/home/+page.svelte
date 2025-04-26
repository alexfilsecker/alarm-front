<script lang="ts">
	import DayAlarmEdit from './DayAlarmEdit.svelte';
	import { MIN_ALARM, MAX_ALARM } from '$lib/constants';

	// type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

	// interface Alarm {
	// 	start: number;
	// 	end: number;
	// }

	const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
	// const toHourFormat = (minutes: number): string => {
	// 	const hours = Math.floor(minutes / 60);
	// 	const remainder = minutes % 60;
	// 	return `${String(hours).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
	// };
</script>

<div class="flex flex-col items-center gap-10">
	<h1 class="text-5xl">ALARM EDITOR</h1>

	{#each days as day (day)}
		<p>{day}</p>
		<DayAlarmEdit {day} start={MIN_ALARM} end={MAX_ALARM} />
	{/each}
</div>
