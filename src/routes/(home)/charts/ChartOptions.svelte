<script lang="ts">
	import { Label, Select } from 'flowbite-svelte';

	type TimeOptions = 'past' | 'range';

	let selectedTimeOption: TimeOptions = $state('past');

	let timeOptions: { value: TimeOptions; name: string }[] = [
		{ value: 'past', name: 'Past period' },
		{ value: 'range', name: 'Time Range' }
	];
</script>

<div class="flex gap-3">
	<Label class="flex w-full flex-col gap-2"
		>Choose time option
		<Select items={timeOptions} bind:value={selectedTimeOption} />
	</Label>
</div>
