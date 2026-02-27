<script setup lang="ts">
import { ref } from 'vue'
import { useTasksStore } from '@/stores/tasks'

const tasksStore = useTasksStore()

const title = ref('')
const description = ref('')
const priority = ref<'low' | 'medium' | 'high'>('medium')

const handleSubmit = async () => {
  if (!title.value.trim()) return

  await tasksStore.addTask({
    title: title.value.trim(),
    description: description.value.trim(),
    completed: false,
    priority: priority.value,
    status: 'to-do'
  })

  title.value = ''
  description.value = ''
  priority.value = 'medium'
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="task-form">
    <h2 class="form-title">Add a Task</h2>

    <div class="form-fields">
      <input
        v-model="title"
        type="text"
        placeholder="What needs to be done?"
        required
        class="task-input"
      />

      <input
        v-model="description"
        type="text"
        placeholder="Description (optional)"
        class="task-input"
      />
    </div>

    <div class="form-footer">
      <div class="priority-group">
        <button
          type="button"
          @click="priority = 'low'"
          class="priority-btn"
          :class="{ active: priority === 'low' }"
          style="--btn-color: var(--priority-low)"
        >Low</button>
        <button
          type="button"
          @click="priority = 'medium'"
          class="priority-btn"
          :class="{ active: priority === 'medium' }"
          style="--btn-color: var(--priority-medium)"
        >Medium</button>
        <button
          type="button"
          @click="priority = 'high'"
          class="priority-btn"
          :class="{ active: priority === 'high' }"
          style="--btn-color: var(--priority-high)"
        >High</button>
      </div>

      <button type="submit" :disabled="!title.trim()" class="add-btn">
        + Add Task
      </button>
    </div>
  </form>
</template>

<style scoped>
.task-form {
  background: var(--white);
  border: var(--border-thick);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-lg);
}

.form-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--black);
  margin-bottom: var(--spacing-lg);
}

.form-fields {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.task-input {
  flex: 1;
  padding: var(--spacing-md);
  background: var(--bg-primary);
  border: var(--border);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--black);
  transition: all var(--transition-fast);
  box-shadow: var(--shadow);
}

.task-input::placeholder {
  color: #888;
  font-weight: 400;
}

.task-input:focus {
  outline: none;
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px var(--black);
}

.form-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md);
}

.priority-group {
  display: flex;
  gap: var(--spacing-sm);
}

.priority-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--bg-primary);
  border: var(--border);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--black);
  cursor: pointer;
  box-shadow: 2px 2px 0px var(--black);
  transition: all var(--transition-fast);
}

.priority-btn:hover {
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0px var(--black);
}

.priority-btn.active {
  background: var(--btn-color);
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0px var(--black);
}

.add-btn {
  padding: var(--spacing-md) var(--spacing-xl);
  background: var(--brand-yellow);
  border: var(--border-thick);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 900;
  color: var(--black);
  cursor: pointer;
  box-shadow: var(--shadow);
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.add-btn:hover:not(:disabled) {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px var(--black);
}

.add-btn:active:not(:disabled) {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px var(--black);
}

.add-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .form-fields {
    flex-direction: column;
  }

  .form-footer {
    flex-direction: column;
    align-items: stretch;
  }

  .add-btn {
    text-align: center;
  }
}
</style>
