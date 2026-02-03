<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import TaskItem from './TaskItem.vue'

const tasksStore = useTasksStore()

type FilterType = 'all' | 'active' | 'completed'
const activeFilter = ref<FilterType>('all')

const filteredTasks = computed(() => {
  switch (activeFilter.value) {
    case 'active':
      return tasksStore.activeTasks
    case 'completed':
      return tasksStore.completedTasks
    default:
      return tasksStore.tasks
  }
})
</script>

<template>
  <div class="task-list-wrapper">
    <div class="filters">
      <button
        @click="activeFilter = 'all'"
        :class="{ active: activeFilter === 'all' }"
      >
        All
      </button>
      <button
        @click="activeFilter = 'active'"
        :class="{ active: activeFilter === 'active' }"
      >
        Active
      </button>
      <button
        @click="activeFilter = 'completed'"
        :class="{ active: activeFilter === 'completed' }"
      >
        Completed
      </button>
    </div>

    <div v-if="filteredTasks.length === 0" class="empty">
      <p>{{ activeFilter === 'all' ? 'No tasks yet' : 'No tasks found' }}</p>
    </div>

    <div v-else class="task-list">
      <TaskItem
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
      />
    </div>
  </div>
</template>

<style scoped>
.task-list-wrapper {
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  overflow: hidden;
}

.filters {
  display: flex;
  border-bottom: 1px solid #e5e5e5;
}

.filters button {
  flex: 1;
  padding: 0.875rem;
  background: none;
  border: none;
  font-size: 0.875rem;
  color: #666;
  cursor: pointer;
  transition: all 0.15s;
}

.filters button:hover {
  background: #f9f9f9;
}

.filters button.active {
  color: #1a1a1a;
  font-weight: 500;
  border-bottom: 2px solid #1a1a1a;
}

.empty {
  padding: 3rem 1.25rem;
  text-align: center;
}

.empty p {
  color: #999;
  font-size: 0.9375rem;
}

.task-list {
  display: flex;
  flex-direction: column;
}
</style>
