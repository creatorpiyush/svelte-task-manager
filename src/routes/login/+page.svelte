<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { authStorage, loadAuthState } from '$lib/stores/authStorage';
	import { login } from '$lib/api/auth';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';

	onMount(async () => {
		await loadAuthState();
	});

	authStorage.subscribe((value) => {
		if (value.isAuthenticated) {
			goto('/tasks');
		}
	});

	async function handleLogin() {
		console.log('Login button clicked');
		try {
			const user = await login(email, password);
			await localStorage.setItem('authToken', JSON.stringify(user.token));
			// localStorage.setItem('userData', JSON.stringify(user));
			await localStorage.setItem('userId', JSON.stringify(user.user.id));
			authStorage.set({
				isAuthenticated: true,
				user: user
			});
			goto('/tasks');
		} catch (error) {
			console.error(error.message);
			console.error('Login failed', error);
		}
	}
</script>

<div>
	<h1>Login</h1>
	<div class="loginForm">
		<form on:submit|preventDefault={handleLogin}>
			<label>
				Email:
				<input type="email" bind:value={email} required />
			</label>
			<label>
				Password:
				<input type="password" bind:value={password} required />
			</label>
			<button type="submit">Login</button>
		</form>
	</div>
	<div class="registerNowLink">
		<p>Don't have an account? <a href="/register">Register</a></p>
	</div>
</div>

<style>
	h1 {
		text-align: center;
	}

	.loginForm {
		display: flex;
		justify-content: center;
	}

	form {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 20rem;
	}

	label {
		display: flex;
		flex-direction: column;
		margin-bottom: 1rem;
	}

	input {
		padding: 0.5rem;
		border-radius: 5px;
	}

	button {
		padding: 0.5rem;
		background-color: #4caf50;
		color: white;
		cursor: pointer;
		border-radius: 5px;
	}

	.registerNowLink {
		display: flex;
		justify-content: center;
	}
</style>
