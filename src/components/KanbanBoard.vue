<script setup lang="ts">
import { ref } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import type { TaskStatus } from '@/stores/tasks'
import TaskCard from './TaskCard.vue'

const tasksStore = useTasksStore()
const draggedOverColumn = ref<TaskStatus | null>(null)

const columns: { status: TaskStatus; title: string; color: string }[] = [
  { status: 'to-do',       title: 'To Do',       color: 'var(--white)' },
  { status: 'in-progress', title: 'In Progress',  color: 'var(--brand-yellow)' },
  { status: 'done',        title: 'Done',         color: 'var(--brand-purple)' }
]

const getTasksForStatus = (status: TaskStatus) => {
  switch (status) {
    case 'to-do':        return tasksStore.todoTasks
    case 'in-progress':  return tasksStore.inProgressTasks
    case 'done':         return tasksStore.doneTasks
    default:             return []
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

const handleDelete = (taskId: string) => tasksStore.deleteTask(taskId)
const handleUpdate = (taskId: string, updates: any) => tasksStore.updateTask(taskId, updates)
const handleToggleComplete = (taskId: string, completed: boolean) => tasksStore.toggleTaskComplete(taskId, completed)
</script>

<template>
  <div class="kanban-board">
    <div
      v-for="column in columns"
      :key="column.status"
      class="kanban-column"
      :class="{ 'drag-over': draggedOverColumn === column.status }"
      :style="{ background: column.color }"
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
          <p>Drop tasks here</p>
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
  align-items: start;
}

.kanban-column {
  border: var(--border-thick);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: box-shadow var(--transition-fast);
  min-height: 300px;
}

.kanban-column.drag-over {
  box-shadow: 10px 10px 0px var(--black);
  transform: translate(-2px, -2px);
}

.column-header {
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.column-title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  color: var(--black);
}

.task-count {
  background: var(--black);
  color: var(--white);
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 900;
  padding: 2px 10px;
  border-radius: 999px;
  min-width: 28px;
  text-align: center;
}

.column-content {
  flex: 1;
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  overflow-y: auto;
  max-height: calc(100vh - 380px);
  min-height: 200px;
}

.column-content::-webkit-scrollbar {
  width: 6px;
}

.column-content::-webkit-scrollbar-track {
  background: transparent;
}

.column-content::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

.empty-state {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
  border: 3px dashed rgba(0, 0, 0, 0.25);
  border-radius: var(--radius-md);
  color: rgba(0, 0, 0, 0.4);
  font-weight: 700;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
}

/* Responsive */
@media (max-width: 1024px) {
  .kanban-board {
    grid-template-columns: 1fr;
  }

  .column-content {
    max-height: none;
  }
}

@media (max-width: 640px) {
  .column-header {
    padding: var(--spacing-md);
  }
}
</style>
