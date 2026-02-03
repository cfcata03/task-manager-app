<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div class="login-page">
    <div class="login-box">
      <div class="logo">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 11l3 3L22 4"/>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
        </svg>
      </div>

      <h1>Task Manager</h1>
      <p>Organize your work with a simple kanban board</p>

      <button @click="authStore.signInWithGoogle" class="google-btn" :disabled="authStore.loading">
        <svg class="google-icon" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        <span v-if="authStore.loading">Signing in...</span>
        <span v-else>Continue with Google</span>
      </button>

      <div v-if="authStore.error" class="error">
        {{ authStore.error }}
      </div>

      <p class="footer-text">
        Your tasks are securely stored and synced across devices
      </p>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg,
    rgba(59, 130, 246, 0.1) 0%,
    rgba(10, 10, 10, 1) 100%
  ), var(--bg-primary);
  padding: var(--spacing-xl);
}

.login-box {
  max-width: 400px;
  width: 100%;
  text-align: center;
  background: var(--bg-surface);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-card-hover);
}

.logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--accent-blue), #2563eb);
  border-radius: 20px;
  margin-bottom: var(--spacing-lg);
  color: white;
}

h1 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
  color: var(--text-primary);
}

p {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
  font-size: 0.9375rem;
  line-height: 1.5;
}

.google-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.google-btn:hover:not(:disabled) {
  border-color: var(--accent-blue);
  background: var(--bg-surface-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-card-hover);
}

.google-btn:active:not(:disabled) {
  transform: translateY(0);
}

.google-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.google-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.error {
  margin-top: var(--spacing-md);
  padding: var(--spacing-md);
  background: rgba(239, 68, 68, 0.1);
  color: var(--danger);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
}

.footer-text {
  margin-top: var(--spacing-xl);
  margin-bottom: 0;
  font-size: 0.8125rem;
  color: var(--text-tertiary);
}

@media (max-width: 480px) {
  .login-box {
    padding: var(--spacing-lg);
  }

  h1 {
    font-size: 1.75rem;
  }

  .logo {
    width: 64px;
    height: 64px;
  }

  .logo svg {
    width: 48px;
    height: 48px;
  }
}
</style>
