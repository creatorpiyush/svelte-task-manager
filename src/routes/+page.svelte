<script>
	import { onMount } from 'svelte';
	import { authStorage, loadAuthState } from '$lib/stores/authStorage';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	let isAuthenticated = false;

	onMount(async () => {
		await loadAuthState();
	});

	authStorage.subscribe((value) => {
		isAuthenticated = value.isAuthenticated;
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>

		to your <br />Task Manager App
	</h1>

	<!-- Login Button -->
	{#if !isAuthenticated}
		<div class="login">
			<a href="/login">Login</a>
		</div>
	{/if}
	{#if isAuthenticated}
		<div class="login">
			<a href="/tasks">Go to Tasks</a>
		</div>
	{/if}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: flex;
		position: relative;
		width: 100%;
		align-items: center;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		left: auto;
		top: 0;
		align-items: center;
	}

	.login {
		margin-top: 2rem;
	}
</style>
