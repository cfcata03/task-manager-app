<script setup lang="ts">
import { ref } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import type { TaskStatus } from '@/stores/tasks'
import TaskCard from './TaskCard.vue'

const tasksStore = useTasksStore()
const draggedOverColumn = ref<TaskStatus | null>(null)

const columns: { status: TaskStatus; title: string }[] = [
  { status: 'to-do', title: 'To Do' },
  { status: 'in-progress', title: 'In Progress' },
  { status: 'done', title: 'Done' }
]

const getTasksForStatus = (status: TaskStatus) => {
  switch (status) {
    case 'to-do':
      return tasksStore.todoTasks
    case 'in-progress':
      return tasksStore.inProgressTasks
    case 'done':
      return tasksStore.doneTasks
    default:
      return []
  }
}

const handleDragStart = (task: any, e: DragEvent) => {
  e.dataTransfer!.effectAllowed = 'move'
  e.dataTransfer!.setData('taskId', task.id)
  e.dataTransfer!.setData('sourceStatus', task.status || 'to-do')
}

const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
  e.dataTransfer!.dropEffect = 'move'
}

const handleDragEnter = (status: TaskStatus) => {
  draggedOverColumn.value = status
}

const handleDragLeave = () => {
  draggedOverColumn.value = null
}

const handleDrop = (targetStatus: TaskStatus, e: DragEvent) => {
  e.preventDefault()
  const taskId = e.dataTransfer!.getData('taskId')
  const sourceStatus = e.dataTransfer!.getData('sourceStatus')

  draggedOverColumn.value = null

  if (sourceStatus !== targetStatus) {
    tasksStore.updateTaskStatus(taskId, targetStatus)
  }
}

const handleDelete = (taskId: string) => {
  tasksStore.deleteTask(taskId)
}

const handleUpdate = (taskId: string, updates: any) => {
  tasksStore.updateTask(taskId, updates)
}

const handleToggleComplete = (taskId: string, completed: boolean) => {
  tasksStore.toggleTaskComplete(taskId, completed)
}
</script>

<template>
  <div class="kanban-board">
    <div
      v-for="column in columns"
      :key="column.status"
      class="kanban-column"
      :class="{ 'drag-over': draggedOverColumn === column.status }"
      @drop="handleDrop(column.status, $event)"
      @dragover="handleDragOver"
      @dragenter="handleDragEnter(column.status)"
      @dragleave="handleDragLeave"
    >
      <div class="column-header">
        <h3 class="column-title">{{ column.title }}</h3>
        <span class="task-count">{{ getTasksForStatus(column.status).length }}</span>
      </div>

      <div class="column-content">
        <TaskCard
          v-for="task in getTasksForStatus(column.status)"
          :key="task.id"
          :task="task"
          @delete="handleDelete"
          @update="handleUpdate"
          @toggle-complete="handleToggleComplete"
        />

        <div v-if="getTasksForStatus(column.status).length === 0" class="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <path d="M9 11l3 3L22 4"/>
          </svg>
          <p>No tasks</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.kanban-board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
  height: calc(100vh - 280px);
  min-height: 400px;
}

.kanban-column {
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all var(--transition-normal);
}

.kanban-column.drag-over {
  border-color: var(--accent-blue);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.column-header {
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-primary);
}

.column-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.task-count {
  background: var(--bg-surface-hover);
  color: var(--text-secondary);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  min-width: 24px;
  text-align: center;
}

.column-content {
  flex: 1;
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  overflow-y: auto;
  overflow-x: hidden;
}

.column-content::-webkit-scrollbar {
  width: 8px;
}

.column-content::-webkit-scrollbar-track {
  background: var(--bg-surface);
}

.column-content::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 4px;
}

.column-content::-webkit-scrollbar-thumb:hover {
  background: var(--bg-surface-hover);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
  color: var(--text-tertiary);
  text-align: center;
  flex: 1;
}

.empty-state svg {
  opacity: 0.3;
  margin-bottom: var(--spacing-md);
}

.empty-state p {
  font-size: 0.875rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .kanban-board {
    grid-template-columns: 1fr;
    height: auto;
  }

  .kanban-column {
    min-height: 300px;
  }
}

@media (max-width: 640px) {
  .column-content {
    padding: var(--spacing-sm);
  }

  .column-header {
    padding: var(--spacing-sm) var(--spacing-md);
  }
}
</style>
