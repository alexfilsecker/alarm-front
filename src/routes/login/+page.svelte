<script lang="ts">
	import { Input, Label, Button, Helper } from 'flowbite-svelte';
	import type { LoginErrors } from '$lib/api/axiosErrors';
	import { login } from '$lib/api/login';
	import { goto } from '$app/navigation';

	let username = $state('');
	let password = $state('');
	let loginErrors: LoginErrors = $state({});
	let loading = $state(false);

	let disabled = $derived(username === '' || password === '');

	const onclick = async () => {
		loading = true;
		const result = await login({ username, password });
		loading = false;
		if (result === null) {
			loginErrors = {};
			goto('/edit');
			return;
		}
		loginErrors = result;
		username = '';
		password = '';
	};
</script>

<h1 class="text-3xl">LOGIN</h1>
<div class="flex w-1/2 flex-col gap-5">
	<div class="flex flex-col gap-2">
		<div class="flex flex-col gap-1">
			<Label class="text-xl" for="username">Username</Label>
			<Input type="text" id="username" bind:value={username} />
			{#if loginErrors.username !== undefined}
				<Helper color="red" class="text-md">{loginErrors.username}</Helper>
			{/if}
		</div>
		<div class="flex flex-col gap-1">
			<Label class="text-xl" for="password">Password</Label>
			<Input type="password" id="password" bind:value={password} />
			{#if loginErrors.password !== undefined}
				<Helper color="red" class="text-md">{loginErrors.password}</Helper>
			{/if}
		</div>
	</div>
	<Button {onclick} {disabled}>
		{#if loading}
			Loading...
		{:else}
			Login
		{/if}
	</Button>
</div>
