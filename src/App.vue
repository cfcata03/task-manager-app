<script setup lang="ts">
import { onMounted, computed, watch } from 'vue'
import { useAuthStore } from './stores/auth'
import { useTasksStore } from './stores/tasks'
import LoginView from './components/LoginView.vue'
import AppHeader from './components/AppHeader.vue'
import KanbanBoard from './components/KanbanBoard.vue'
import TaskForm from './components/TaskForm.vue'

const authStore = useAuthStore()
const tasksStore = useTasksStore()

const isAuthenticated = computed(() => !!authStore.user)

onMounted(() => {
  authStore.initAuth()
})

// Watch for auth changes and subscribe/unsubscribe to tasks
const handleAuthChange = () => {
  if (isAuthenticated.value) {
    tasksStore.subscribeToTasks()
  } else {
    tasksStore.unsubscribeFromTasks()
  }
}

// Watch auth state
watch(isAuthenticated, handleAuthChange, { immediate: true })
</script>

<template>
  <div id="app">
    <div v-if="authStore.loading" class="loading-container">
      <div class="spinner"></div>
      <p>Loading...</p>
    </div>

    <template v-else>
      <LoginView v-if="!isAuthenticated" />

      <div v-else class="app-container">
        <AppHeader />

        <main class="main-content">
          <div class="container">
            <TaskForm />
            <KanbanBoard />
          </div>
        </main>
      </div>
    </template>
  </div>
</template>

<style>
:root {
  /* Backgrounds */
  --bg-primary: #0a0a0a;
  --bg-surface: #1a1a1a;
  --bg-surface-hover: #252525;
  --border-color: #2a2a2a;

  /* Text - Adjusted for better contrast */
  --text-primary: #ffffff;
  --text-secondary: #a0a0a0;
  --text-tertiary: #707070;

  /* Accent Colors */
  --accent-blue: #3b82f6;
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;

  /* Priority Colors (slightly desaturated) */
  --priority-high: #ff6b6b;
  --priority-medium: #ffd93d;
  --priority-low: #6bcf7f;

  /* Shadows - Enhanced for dark theme */
  --shadow-card: 0 2px 8px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05);
  --shadow-card-hover: 0 4px 12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08);

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  /* Borders */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;

  /* Transitions */
  --transition-fast: 0.15s ease;
  --transition-normal: 0.2s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: var(--bg-primary);
  min-height: 100vh;
  color: var(--text-primary);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  min-height: 100vh;
}

*:focus-visible {
  outline: 2px solid var(--accent-blue);
  outline-offset: 2px;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: var(--bg-primary);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #2a2a2a;
  border-top-color: var(--accent-blue);
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

.loading-container p {
  margin-top: var(--spacing-md);
  color: var(--text-secondary);
  font-size: 0.875rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.app-container {
  min-height: 100vh;
  background: var(--bg-primary);
}

.main-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--spacing-xl) var(--spacing-md);
}

.container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

@media (max-width: 768px) {
  .main-content {
    padding: var(--spacing-md);
  }
}
</style>
