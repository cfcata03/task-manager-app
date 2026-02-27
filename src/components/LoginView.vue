<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div class="login-page">
    <div class="deco deco-purple"></div>
    <div class="deco deco-yellow"></div>
    <div class="deco deco-orange"></div>

    <div class="login-box">
      <h1 class="title">Task<br>Manager</h1>
      <p class="subtitle">Organize your work with a kanban board</p>

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
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
  padding: var(--spacing-xl);
  position: relative;
  overflow: hidden;
}

/* Decorative boxes like the portfolio */
.deco {
  position: absolute;
  border: 4px solid var(--black);
}

.deco-purple {
  width: 160px;
  height: 160px;
  background: var(--brand-purple);
  top: 8%;
  right: 10%;
  transform: rotate(12deg);
  box-shadow: var(--shadow-lg);
}

.deco-yellow {
  width: 120px;
  height: 120px;
  background: var(--brand-yellow);
  bottom: 12%;
  left: 8%;
  transform: rotate(-8deg);
  box-shadow: var(--shadow-lg);
}

.deco-orange {
  width: 90px;
  height: 90px;
  background: var(--accent-orange);
  top: 60%;
  right: 6%;
  transform: rotate(5deg);
  box-shadow: var(--shadow);
}

.login-box {
  max-width: 440px;
  width: 100%;
  background: var(--white);
  border: var(--border-thick);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  padding: var(--spacing-xl);
  text-align: center;
  position: relative;
  z-index: 1;
}

.title {
  font-family: var(--font-display);
  font-size: 3.5rem;
  line-height: 1;
  color: var(--black);
  margin-bottom: var(--spacing-md);
}

.subtitle {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
}

.google-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--brand-yellow);
  border: var(--border-thick);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 900;
  color: var(--black);
  cursor: pointer;
  box-shadow: var(--shadow);
  transition: all var(--transition-fast);
}

.google-btn:hover:not(:disabled) {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px var(--black);
}

.google-btn:active:not(:disabled) {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px var(--black);
}

.google-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.google-icon {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
}

.error {
  margin-top: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--accent-orange);
  border: var(--border);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: var(--shadow);
}

@media (max-width: 480px) {
  .title {
    font-size: 2.5rem;
  }

  .login-box {
    padding: var(--spacing-lg);
  }

  .deco-purple {
    width: 100px;
    height: 100px;
  }

  .deco-yellow {
    width: 80px;
    height: 80px;
  }

  .deco-orange {
    display: none;
  }
}
</style>
