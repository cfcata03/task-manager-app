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
    status: 'to-do'  // Default to 'to-do' status
  })

  title.value = ''
  description.value = ''
  priority.value = 'medium'
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="task-form">
    <div class="form-content">
      <input
        v-model="title"
        type="text"
        placeholder="Add a new task..."
        required
        class="task-input"
        autofocus
      />

      <textarea
        v-model="description"
        placeholder="Description (optional)"
        rows="2"
        class="description-input"
      />

      <div class="form-footer">
        <select v-model="priority" class="priority-select">
          <option value="low">🟢 Low Priority</option>
          <option value="medium">🟡 Medium Priority</option>
          <option value="high">🔴 High Priority</option>
        </select>

        <button type="submit" :disabled="!title.trim()" class="add-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Task
        </button>
      </div>
    </div>
  </form>
</template>

<style scoped>
.task-form {
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-card);
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.task-input {
  width: 100%;
  padding: var(--spacing-md);
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  font-size: 0.9375rem;
  color: var(--text-primary);
  font-family: inherit;
  transition: all var(--transition-fast);
}

.task-input::placeholder {
  color: var(--text-tertiary);
}

.task-input:focus {
  outline: none;
  border-color: var(--accent-blue);
  background: var(--bg-surface-hover);
}

.description-input {
  width: 100%;
  padding: var(--spacing-md);
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  color: var(--text-primary);
  font-family: inherit;
  resize: vertical;
  min-height: 60px;
  transition: all var(--transition-fast);
}

.description-input::placeholder {
  color: var(--text-tertiary);
}

.description-input:focus {
  outline: none;
  border-color: var(--accent-blue);
  background: var(--bg-surface-hover);
}

.form-footer {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
}

.priority-select {
  padding: var(--spacing-md);
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  color: var(--text-primary);
  cursor: pointer;
  font-family: inherit;
  transition: all var(--transition-fast);
  flex: 1;
}

.priority-select:focus {
  outline: none;
  border-color: var(--accent-blue);
}

.priority-select:hover {
  background: var(--bg-surface-hover);
}

.add-btn {
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--accent-blue);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  white-space: nowrap;
}

.add-btn:hover:not(:disabled) {
  background: #2563eb;
  transform: translateY(-1px);
}

.add-btn:active:not(:disabled) {
  transform: translateY(0);
}

.add-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .form-footer {
    flex-direction: column;
  }

  .priority-select,
  .add-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
