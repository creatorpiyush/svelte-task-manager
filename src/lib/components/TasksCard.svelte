<script>
  import { createEventDispatcher } from 'svelte';
  // @ts-ignore
  export let task;
  const dispatch = createEventDispatcher();

  function editTask() {
    // @ts-ignore
    dispatch('edit', task);
  }
</script>

<div class="task-card">
  <h2><a href={`/tasks/${task.id}`}>{task.title}</a></h2>
  <p>{task.description}</p>
  <p>Status: {task.status}</p>
  <p>Due Date: {task.dueDate}</p>
  <button on:click={editTask}>Edit</button>
</div>

<style>
  .task-card {
    background: white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
  }
  .task-card h2 {
    margin: 0 0 0.5rem 0;
  }
  .task-card a {
    color: #004e92;
    text-decoration: none;
  }
  .task-card a:hover {
    text-decoration: underline;
  }
  .task-card button {
    padding: 0.5rem 1rem;
    background-color: #004e92;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .task-card button:hover {
    background-color: #003f7f;
  }
</style>
