<script setup lang="ts">
import { ref } from 'vue'
import { useTasksStore, type Task } from '@/stores/tasks'

const props = defineProps<{
  task: Task
}>()

const tasksStore = useTasksStore()
const isEditing = ref(false)
const editTitle = ref(props.task.title)
const editDescription = ref(props.task.description)
const editPriority = ref(props.task.priority)

const priorityColors = {
  low: '#10b981',
  medium: '#f59e0b',
  high: '#ef4444'
}

const handleToggle = () => {
  tasksStore.toggleTaskComplete(props.task.id, !props.task.completed)
}

const handleDelete = () => {
  if (confirm('Delete this task?')) {
    tasksStore.deleteTask(props.task.id)
  }
}

const startEdit = () => {
  editTitle.value = props.task.title
  editDescription.value = props.task.description
  editPriority.value = props.task.priority
  isEditing.value = true
}

const saveEdit = async () => {
  if (!editTitle.value.trim()) return

  await tasksStore.updateTask(props.task.id, {
    title: editTitle.value.trim(),
    description: editDescription.value.trim(),
    priority: editPriority.value
  })

  isEditing.value = false
}
</script>

<template>
  <div class="task-item" :class="{ completed: task.completed, editing: isEditing }">
    <div v-if="!isEditing" class="task-view">
      <input
        type="checkbox"
        :checked="task.completed"
        @change="handleToggle"
        class="checkbox"
      />

      <div class="task-content">
        <div class="task-title">{{ task.title }}</div>
        <div v-if="task.description" class="task-description">{{ task.description }}</div>
      </div>

      <div
        class="priority-dot"
        :style="{ background: priorityColors[task.priority] }"
        :title="task.priority"
      ></div>

      <div class="task-actions">
        <button @click="startEdit" class="action-btn">Edit</button>
        <button @click="handleDelete" class="action-btn delete">Delete</button>
      </div>
    </div>

    <div v-else class="task-edit">
      <input v-model="editTitle" type="text" class="edit-input" />
      <textarea v-model="editDescription" rows="2" class="edit-textarea"></textarea>

      <div class="edit-footer">
        <select v-model="editPriority" class="edit-select">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <div class="edit-actions">
          <button @click="isEditing = false" class="action-btn">Cancel</button>
          <button @click="saveEdit" class="action-btn save">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-item {
  border-bottom: 1px solid #e5e5e5;
  transition: background 0.15s;
}

.task-item:hover {
  background: #fafafa;
}

.task-item:last-child {
  border-bottom: none;
}

.task-view {
  display: flex;
  align-items: flex-start;
  gap: 0.875rem;
  padding: 1rem 1.25rem;
}

.checkbox {
  margin-top: 0.25rem;
  cursor: pointer;
  width: 18px;
  height: 18px;
}

.task-content {
  flex: 1;
  min-width: 0;
}

.task-title {
  font-size: 0.9375rem;
  color: #1a1a1a;
  margin-bottom: 0.25rem;
}

.task-description {
  font-size: 0.8125rem;
  color: #666;
  line-height: 1.4;
}

.task-item.completed .task-title {
  text-decoration: line-through;
  color: #999;
}

.task-item.completed .task-description {
  color: #bbb;
}

.priority-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-top: 0.5rem;
  flex-shrink: 0;
}

.task-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.375rem 0.75rem;
  background: transparent;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  font-size: 0.8125rem;
  color: #666;
  cursor: pointer;
  transition: all 0.15s;
}

.action-btn:hover {
  border-color: #999;
}

.action-btn.delete:hover {
  border-color: #ef4444;
  color: #ef4444;
}

.action-btn.save {
  background: #1a1a1a;
  color: #fff;
  border-color: #1a1a1a;
}

.action-btn.save:hover {
  background: #000;
}

.task-edit {
  padding: 1rem 1.25rem;
}

.edit-input,
.edit-textarea,
.edit-select {
  width: 100%;
  padding: 0.625rem;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  font-size: 0.875rem;
  font-family: inherit;
  margin-bottom: 0.75rem;
}

.edit-input:focus,
.edit-textarea:focus,
.edit-select:focus {
  outline: none;
  border-color: #1a1a1a;
}

.edit-textarea {
  resize: vertical;
}

.edit-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.edit-select {
  width: auto;
  margin-bottom: 0;
}

.edit-actions {
  display: flex;
  gap: 0.5rem;
}

@media (max-width: 640px) {
  .task-actions {
    flex-direction: column;
  }
}
</style>
