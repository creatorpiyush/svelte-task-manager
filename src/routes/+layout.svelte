<script>
	import { onMount } from 'svelte';
	import { authStorage, loadAuthState } from '$lib/stores/authStorage';
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import './styles.css';

	let isAuthenticated = false;

	onMount(async () => {
		await loadAuthState();
	});

	authStorage.subscribe((value) => {
		isAuthenticated = value.isAuthenticated;
	});

	
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<Footer />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
