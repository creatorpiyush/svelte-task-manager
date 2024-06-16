<script>
  import { createEventDispatcher } from 'svelte';
  import { taskStore, addTask, updateTask } from '$lib/stores/taskStorage';
  import { get } from 'svelte/store';
  export let task = { id: null, title: '', description: '', status: '', dueDate: '' };
  const dispatch = createEventDispatcher();
  let title = task.title;
  let description = task.description;
  let status = task.status;
  let dueDate = task.dueDate;

  function save() {
    if (task.id) {
      updateTask({ ...task, title, description, status, dueDate });
    } else {
      addTask({ title, description, status, dueDate });
    }
    dispatch('save');
    title = '';
    description = '';
    status = '';
    dueDate = '';
  }
</script>

<div class="task-form">
  <label>
    Title:
    <input type="text" bind:value={title} />
  </label>
  <label>
    Description:
    <textarea bind:value={description}></textarea>
  </label>
  <label>
    Status:
    <select bind:value={status}>
      <option value="Incomplete">Incomplete</option>
      <option value="Complete">Complete</option>
    </select>
  </label>
  <label>
    Due Date:
    <input type="date" bind:value={dueDate} />
  </label>
  <button on:click={save}>Save Task</button>
</div>

<style>
  .task-form {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
    max-width: 600px;
    margin: 1rem auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .task-form label {
    display: flex;
    flex-direction: column;
    font-weight: bold;
  }
  .task-form input,
  .task-form textarea,
  .task-form select {
    width: 100%;
    padding: 0.75rem;
    margin-top: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }
  .task-form button {
    padding: 0.75rem;
    background-color: #004e92;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    align-self: flex-end;
    transition: background-color 0.3s ease;
  }
  .task-form button:hover {
    background-color: #003f7f;
  }
</style>
