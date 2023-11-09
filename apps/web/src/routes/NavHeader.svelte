<script lang="ts">
	import TheButton from '$lib/components/buttons/TheButton.svelte';
	import { goto } from '$app/navigation';
	import type { User } from 'lucia';

	export let user: User | undefined;
	const displayedUser = user?.userName ?? user?.email;
</script>

<header
	class="global-container absolute left-1/2 top-0 z-10 min-w-max -translate-x-1/2 transform py-4"
>
	<div class="flex items-center">
		<h1 class="flex-1 text-xl">
			<a href="/"><span class="font-semibold text-emerald-600">SG</span>cenario</a>
		</h1>
		<div class="flex flex-1 items-center justify-end gap-x-3">
			{#if displayedUser}
				Hi, {displayedUser}
				<form method="post" action="/login?/logout">
					<TheButton size="lg" type="submit">Log out</TheButton>
				</form>
			{:else}
				<TheButton size="lg" on:click={() => goto('/login')}>Log in</TheButton>
			{/if}
		</div>
	</div>
</header>
