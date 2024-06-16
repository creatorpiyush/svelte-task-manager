<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { authStorage, loadAuthState } from '$lib/stores/authStorage';
	import { goto } from '$app/navigation';

	onMount(async () => {
		await loadAuthState();
	});

	authStorage.subscribe((value) => {
		if (value.isAuthenticated) {
			goto('/tasks');
		}
	});
</script>

<div>
	<h1>To be added soon...</h1>
	<!-- Login link -->
	<div class="login">
		<a href="/login">Login</a>
	</div>
</div>

<style>
	h1 {
		text-align: center;
	}

	.login {
		display: flex;
		justify-content: center;
		margin-top: 2rem;
	}
</style>
