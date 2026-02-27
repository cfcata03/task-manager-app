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
  /* Portfolio Brand Colors */
  --bg-primary: #eedfd0;
  --bg-surface: #ffffff;
  --brand-purple: #D0B4F4;
  --brand-yellow: #FFC52F;
  --accent-orange: #FF612F;
  --brand-purple-dark: rgb(196, 118, 166);
  --black: #000000;
  --white: #ffffff;

  /* Text */
  --text-primary: #000000;
  --text-secondary: #333333;

  /* Neo-brutalist borders & shadows */
  --border: 3px solid #000000;
  --border-thick: 8px solid #000000;
  --shadow: 4px 4px 0px #000000;
  --shadow-lg: 8px 8px 0px #000000;

  /* Priority */
  --priority-high: #FF612F;
  --priority-medium: #FFC52F;
  --priority-low: #D0B4F4;

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  /* Borders */
  --radius-sm: 0.5rem;
  --radius-md: 0.75rem;
  --radius-lg: 1.5rem;

  /* Transitions */
  --transition-fast: 0.15s ease;
  --transition-normal: 0.2s ease;

  /* Fonts */
  --font-body: 'Archivo', sans-serif;
  --font-display: 'Dela Gothic One', cursive;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-body);
  background: var(--bg-primary);
  min-height: 100vh;
  color: var(--text-primary);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

#app {
  min-height: 100vh;
}

*:focus-visible {
  outline: 3px solid var(--black);
  outline-offset: 2px;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: var(--bg-primary);
  gap: var(--spacing-md);
}

.loading-container p {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--text-primary);
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid var(--black);
  border-top-color: var(--brand-purple);
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
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
  padding: var(--spacing-xl) var(--spacing-xl);
}

.container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

@media (max-width: 768px) {
  .main-content {
    padding: var(--spacing-md);
  }
}
</style>
