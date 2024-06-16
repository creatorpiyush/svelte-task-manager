import axios from 'axios';
const TASK_API_URL = 'https://jsonplaceholder.typicode.com';

export async function fetchTasks () {
	try {
		const response = await axios.get(`${TASK_API_URL}/todos/`);
		return response.data;
	} catch (error) {
		console.error('Error fetching tasks:', error);
		throw error;
	}
};

export async function getTasks(filters = {}) {
	const query = new URLSearchParams(filters).toString();
	const res = await fetch(`${TASK_API_URL}/todos?${query}`);
	if (!res.ok) throw new Error('Failed to fetch tasks');
	return res.json();
}

export async function addTask(task: any, filters = {}) {
	const query = new URLSearchParams(filters).toString();
	const res = await fetch(`${TASK_API_URL}/todos/${query}`, {
		method: 'POST',
		body: JSON.stringify(task),
		mode: 'no-cors',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	if (!res.ok) throw new Error('Failed to add task');
	return res.json();
}

export async function updateTask(task: any) {
	const res = await fetch(`${TASK_API_URL}/todos`, {
		method: 'PUT',
		body: JSON.stringify(task),
		mode: 'no-cors',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	if (!res.ok) throw new Error('Failed to update task');
	return res.json();
}

export async function deleteTask(id: any) {
	const res = await fetch(`${TASK_API_URL}/todos`, {
		method: 'DELETE',
		body: JSON.stringify({ id }),
		mode: 'no-cors',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	if (!res.ok) throw new Error('Failed to delete task');
	return res.json();
}
