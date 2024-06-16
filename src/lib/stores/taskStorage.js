import { writable } from 'svelte/store';
import { fetchTasks } from '../api/tasks';

const taskStore = writable([]);

const loadTasks = async() => {
    try {
        const tasks = await fetchTasks();
        // @ts-ignore
        taskStore.set(tasks);
    } catch (error) {
        console.error('Failed to load tasks:', error);
    }  
};

const addTask = (/** @type {{ title: string; description: string; status: string; dueDate: string; }} */ task) => {
    // @ts-ignore
    taskStore.update((tasks) => [...tasks, {...task, id: tasks.length + 1 }]);
};

const updateTask = (/** @type {{ title?: string; description?: string; status?: string; dueDate?: string; id: any; }} */ updatedTask) => {
    taskStore.update((tasks) =>
        // @ts-ignore
        tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
};

const deleteTask = (/** @type {any} */ id) => {
    // @ts-ignore
    taskStore.update((tasks) => tasks.filter((task) => task.id !== id));
};

export { taskStore, loadTasks, addTask, updateTask, deleteTask };