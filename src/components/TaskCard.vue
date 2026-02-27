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
}

const getPriorityColor = () => {
  switch (props.task.priority) {
    case 'high': return 'var(--priority-high)'
    case 'medium': return 'var(--priority-medium)'
    case 'low': return 'var(--priority-low)'
    default: return 'var(--bg-primary)'
  }
}

const getPriorityLabel = () => {
  switch (props.task.priority) {
    case 'high': return 'HIGH'
    case 'medium': return 'MED'
    case 'low': return 'LOW'
    default: return ''
  }
}
</script>

<template>
  <div
    class="task-card"
    :class="{ 'completed': task.completed }"
    draggable="true"
    @dragstart="handleDragStart"
  >
    <div v-if="!isEditing" class="card-content">
      <div class="card-top">
        <span
          class="priority-tag"
          :style="{ background: getPriorityColor() }"
        >{{ getPriorityLabel() }}</span>
        <div class="card-actions">
          <button @click="startEdit" class="action-btn" title="Edit">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button @click="handleDelete" class="action-btn delete" title="Delete">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="card-body">
        <input
          type="checkbox"
          :checked="task.completed"
          @change="handleToggle"
          class="checkbox"
        />
        <div class="task-text">
          <p class="task-title">{{ task.title }}</p>
          <p v-if="task.description" class="task-description">{{ task.description }}</p>
        </div>
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
      <input
        v-model="editDescription"
        type="text"
        class="edit-input"
        placeholder="Description (optional)"
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
  background: var(--white);
  border: var(--border);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  box-shadow: var(--shadow);
  cursor: grab;
  transition: all var(--transition-fast);
}

.task-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px var(--black);
}

.task-card:active {
  cursor: grabbing;
}

.task-card.completed {
  opacity: 0.55;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
}

.priority-tag {
  font-size: 0.6875rem;
  font-weight: 900;
  padding: 2px 8px;
  border: 2px solid var(--black);
  border-radius: var(--radius-sm);
  letter-spacing: 0.05em;
}

.card-actions {
  display: flex;
  gap: var(--spacing-xs);
}

.action-btn {
  width: 28px;
  height: 28px;
  background: var(--bg-primary);
  border: 2px solid var(--black);
  border-radius: var(--radius-sm);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 1px 0px var(--black);
  transition: all var(--transition-fast);
}

.action-btn:hover {
  transform: translate(-1px, -1px);
  box-shadow: 2px 2px 0px var(--black);
}

.action-btn.delete:hover {
  background: var(--accent-orange);
}

.card-body {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
}

.checkbox {
  width: 18px;
  height: 18px;
  margin-top: 2px;
  cursor: pointer;
  flex-shrink: 0;
  accent-color: var(--black);
  border: var(--border);
}

.task-text {
  flex: 1;
  min-width: 0;
}

.task-title {
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--black);
  word-wrap: break-word;
  line-height: 1.4;
}

.task-card.completed .task-title {
  text-decoration: line-through;
  color: #888;
}

.task-description {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  margin-top: var(--spacing-xs);
  word-wrap: break-word;
  line-height: 1.4;
}

/* Edit form */
.edit-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.edit-input {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--bg-primary);
  border: var(--border);
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--black);
  box-shadow: 2px 2px 0px var(--black);
}

.edit-input:focus {
  outline: none;
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0px var(--black);
}

.edit-actions {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: flex-end;
}

.save-btn, .cancel-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  border: var(--border);
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: 0.8125rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 2px 2px 0px var(--black);
  transition: all var(--transition-fast);
}

.save-btn {
  background: var(--brand-yellow);
  color: var(--black);
}

.cancel-btn {
  background: var(--bg-primary);
  color: var(--black);
}

.save-btn:hover, .cancel-btn:hover {
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0px var(--black);
}
</style>
