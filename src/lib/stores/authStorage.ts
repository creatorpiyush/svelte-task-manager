import { writable } from 'svelte/store';
import { fetchUser } from '../api/auth';

export const authStorage = writable({
	isAuthenticated: false,
	user: null
});

export async function loadAuthState() {
	if (typeof window !== 'undefined') {
		// Check if the code is running on the client side
		let authToken = await localStorage.getItem('authToken');
		let userId = await localStorage.getItem('userId');
		const user = await fetchUser(userId);
		// const userDetails = JSON.parse(userId || '{}');
		if (authToken) {
			authStorage.set({
				isAuthenticated: true,
				user: user
			});
		}
	}
}

export async function loadUser(userId: any) {
	userId = await localStorage.getItem('userId');
	console.log(userId);
	try {
		const user = await fetchUser(userId);
		authStorage.set({
			isAuthenticated: true,
			user
		});
	} catch (error) {
		console.error('Failed to load user:', error);
	}
}
