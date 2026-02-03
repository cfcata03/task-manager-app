<script setup lang="ts">
import { ref } from 'vue'
import type { Task } from '@/stores/tasks'

const props = defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  delete: [taskId: string]
  update: [taskId: string, updates: Partial<Task>]
  toggleComplete: [taskId: string, completed: boolean]
}>()

const isEditing = ref(false)
const editTitle = ref(props.task.title)
const editDescription = ref(props.task.description)

const handleDragStart = (e: DragEvent) => {
  e.dataTransfer!.effectAllowed = 'move'
  e.dataTransfer!.setData('taskId', props.task.id)
  e.dataTransfer!.setData('sourceStatus', props.task.status || 'to-do')
}

const handleToggle = () => {
  emit('toggleComplete', props.task.id, !props.task.completed)
}

const handleDelete = () => {
  if (confirm('Delete this task?')) {
    emit('delete', props.task.id)
  }
}

const startEdit = () => {
  isEditing.value = true
  editTitle.value = props.task.title
  editDescription.value = props.task.description
}

const saveEdit = () => {
  if (editTitle.value.trim()) {
    emit('update', props.task.id, {
      title: editTitle.value.trim(),
      description: editDescription.value.trim()
    })
    isEditing.value = false
  }
}

const cancelEdit = () => {
  isEditing.value = false
  editTitle.value = props.task.title
  editDescription.value = props.task.description
}

const getPriorityColor = () => {
  switch (props.task.priority) {
    case 'high': return 'var(--priority-high)'
    case 'medium': return 'var(--priority-medium)'
    case 'low': return 'var(--priority-low)'
    default: return 'var(--border-color)'
  }
}
</script>

<template>
  <div
    class="task-card"
    :class="{ 'completed': task.completed, 'editing': isEditing }"
    :style="{ borderLeftColor: getPriorityColor() }"
    draggable="true"
    @dragstart="handleDragStart"
  >
    <div v-if="!isEditing" class="card-content">
      <div class="card-main">
        <input
          type="checkbox"
          :checked="task.completed"
          @change="handleToggle"
          class="checkbox"
        />
        <div class="task-info">
          <h4 class="task-title">{{ task.title }}</h4>
          <p v-if="task.description" class="task-description">{{ task.description }}</p>
        </div>
      </div>
      <div class="card-actions">
        <button @click="startEdit" class="action-btn edit-btn" title="Edit">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
        <button @click="handleDelete" class="action-btn delete-btn" title="Delete">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
        </button>
      </div>
    </div>

    <div v-else class="edit-form">
      <input
        v-model="editTitle"
        type="text"
        class="edit-input"
        placeholder="Task title"
        @keyup.enter="saveEdit"
        @keyup.esc="cancelEdit"
      />
      <textarea
        v-model="editDescription"
        class="edit-textarea"
        placeholder="Description (optional)"
        rows="2"
        @keyup.esc="cancelEdit"
      />
      <div class="edit-actions">
        <button @click="saveEdit" class="save-btn">Save</button>
        <button @click="cancelEdit" class="cancel-btn">Cancel</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-left: 4px solid;
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-card);
  cursor: grab;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-card-hover);
  background: var(--bg-surface-hover);
}

.task-card.completed {
  opacity: 0.6;
}

.task-card.editing {
  cursor: default;
}

.card-content {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  justify-content: space-between;
}

.card-main {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  flex: 1;
  min-width: 0;
}

.checkbox {
  width: 18px;
  height: 18px;
  margin-top: 2px;
  cursor: pointer;
  flex-shrink: 0;
  accent-color: var(--accent-blue);
}

.task-info {
  flex: 1;
  min-width: 0;
}

.task-title {
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
  word-wrap: break-word;
}

.task-card.completed .task-title {
  text-decoration: line-through;
  color: var(--text-secondary);
}

.task-description {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.5;
  word-wrap: break-word;
}

.card-actions {
  display: flex;
  gap: var(--spacing-xs);
  flex-shrink: 0;
}

.action-btn {
  background: none;
  border: none;
  color: var(--text-tertiary);
  cursor: pointer;
  padding: var(--spacing-xs);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn:hover {
  background: var(--bg-primary);
}

.edit-btn:hover {
  color: var(--accent-blue);
}

.delete-btn:hover {
  color: var(--danger);
}

/* Edit form styles */
.edit-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.edit-input,
.edit-textarea {
  width: 100%;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: var(--spacing-sm);
  color: var(--text-primary);
  font-family: inherit;
  font-size: 0.875rem;
}

.edit-input:focus,
.edit-textarea:focus {
  outline: none;
  border-color: var(--accent-blue);
}

.edit-textarea {
  resize: vertical;
  min-height: 60px;
}

.edit-actions {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: flex-end;
}

.save-btn,
.cancel-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: var(--radius-sm);
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.save-btn {
  background: var(--accent-blue);
  color: white;
}

.save-btn:hover {
  background: #2563eb;
}

.cancel-btn {
  background: var(--bg-primary);
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
}

.cancel-btn:hover {
  background: var(--bg-surface-hover);
  color: var(--text-primary);
}
</style>
