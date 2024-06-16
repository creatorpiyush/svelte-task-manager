<script context="module">
  import { getTaskById } from '$lib/stores/taskStorage';

  export async function load({ params }) {
    const id = params.id;
    const task = getTaskById(id);

    if (!task) {
      return {
        status: 404,
        error: new Error('Task not found')
      };
    }

    return { props: { task } };
  }
</script>

<script>
  export let task;
</script>

<main>
  <div class="task-detail">
    <h1>{task.title}</h1>
    <p>{task.description}</p>
    <p>Status: {task.status}</p>
    <p>Due Date: {task.dueDate}</p>
  </div>
</main>

<style>
  .task-detail {
    max-width: 600px;
    margin: 0 auto;
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.2rem;
    margin: 0.5rem 0;
  }
</style>
