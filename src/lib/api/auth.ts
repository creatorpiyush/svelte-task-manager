// src/lib/api/auth.js
let mockUser = {
	id: 1,
	name: 'Piyush Anand',
	email: 'piyush.anand@example.com',
	password: 'password'
};

const API_URL = 'https://jsonplaceholder.typicode.com';

let isAuthenticated = false;

export async function login(email: string, password: string) {
	if (email == mockUser.email && password == mockUser.password) {
		isAuthenticated = true;
		return { user: mockUser, token: 'dummy-jwt-token' };
	} else {
		throw new Error('Invalid credentials');
	}
}

export async function logout() {
	isAuthenticated = false;
	return { message: 'Logged out' };
}

export async function register(name: any, email: any, password: any) {
	mockUser = { id: Date.now(), name, email, password };
	isAuthenticated = true;
	return { user: mockUser, token: 'mock-jwt-token' };
}

export async function fetchUser(userId: any) {
	userId = await localStorage.getItem('userId')	
	try {
		const response = await fetch(`${API_URL}/users/${userId}`);
		return response.json();
	} catch (error) {
		console.error('Error fetching user:', error);
		throw error;
	}
}
