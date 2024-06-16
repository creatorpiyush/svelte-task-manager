<script>
	// @ts-nocheck

	import TaskForm from '$lib/components/TasksForm.svelte';
	import TaskCard from '$lib/components/TasksCard.svelte';
	import CategoryFilter from '$lib/components/CategoryFilter.svelte';
	import { taskStore, loadTasks } from '$lib/stores/taskStorage';
	import { authStorage, loadUser } from '$lib/stores/authStorage';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { dev } from '$app/environment';

	/**
	 * @type {any[]}
	 */
	let tasks = [];
	let selectedCategory = '';
	let currentTask = { id: null, title: '', description: '', status: '', dueDate: '' };
	let user;
	let isAuthenticated = false;
	let sortOption = 'dueDate';

	// @ts-ignore
	onMount(async () => {
		const unsubscribeUser = authStorage.subscribe(
			(/** @type {{ isAuthenticated: boolean; user: any; }} */ value) => {
				isAuthenticated = value.isAuthenticated;
				user = value.user;
				if (!isAuthenticated) {
					goto('/login');
				}
			}
		);

		if (isAuthenticated) {
			// console.log('====================================');
			// console.log('Tasks Page');
			// console.log('====================================');
			await loadTasks();
			const unsubscribeTasks = taskStore.subscribe((/** @type {any[]} */ value) => {
				tasks = value;
			});

			// console.log('====================================');
			// console.log(tasks);
			// console.log('====================================');

			return () => {
				unsubscribeTasks();
				unsubscribeUser();
			};
		}
	});

	/**
	 * @param {{ id: null; title: string; description: string; status: string; dueDate: string; }} task
	 */
	function editTask(task) {
		currentTask = task;
	}

	function saveTask() {
		currentTask = { id: null, title: '', description: '', status: '', dueDate: '' };
	}

	/**
	 * @param {string} category
	 */
	function filterTasks(category) {
		selectedCategory = category;
	}

	/**
	 * @param {string} option
	 */
	function sortTasks(option) {
		sortOption = option;
	}

	$: filteredTasks = tasks
		.filter(
			(task) => (selectedCategory ? task.status === selectedCategory : true)
			// @ts-ignore
		)
		.sort((a, b) => (sortOption === 'dueDate' ? new Date(a.dueDate) - new Date(b.dueDate) : 0));
</script>

{#if isAuthenticated}
	<h1>Task Manager</h1>
	<h2>Welcome {user.name}</h2>

	<CategoryFilter
		{selectedCategory}
		on:filter={(/** @type {{ detail: any; }} */ event) => filterTasks(event.detail)}
	/>

	<label for="sort">Sort by:</label>
	<select id="sort" on:change={(event) => sortTasks(event.target.value)}>
		<option value="dueDate">Due Date</option>
	</select>

	<TaskForm task={currentTask} on:save={saveTask} />

	{#each filteredTasks as task}
		<TaskCard {task} on:edit={(/** @type {{ detail: any; }} */ event) => editTask(event.detail)} />
	{/each}
{/if}

<style>
	select {
		margin-left: 1rem;
	}
</style>
