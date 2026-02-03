<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'

const authStore = useAuthStore()

const userName = computed(() => authStore.user?.displayName || 'User')
const userPhoto = computed(() => authStore.user?.photoURL)
</script>

<template>
  <header>
    <div class="header-content">
      <div class="logo-section">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 11l3 3L22 4"/>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
        </svg>
        <h1>Task Manager</h1>
      </div>

      <div class="user-section">
        <img v-if="userPhoto" :src="userPhoto" :alt="userName" class="avatar" />
        <span class="user-name">{{ userName }}</span>
        <button @click="authStore.signOut" class="sign-out">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          <span class="sign-out-text">Sign out</span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: var(--shadow-card);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--spacing-md) var(--spacing-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  color: var(--accent-blue);
}

h1 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
}

.user-section {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid var(--border-color);
}

.user-name {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.sign-out {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  font-size: 0.8125rem;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.sign-out:hover {
  border-color: var(--danger);
  color: var(--danger);
  background: rgba(239, 68, 68, 0.05);
}

@media (max-width: 768px) {
  .user-name {
    display: none;
  }

  .sign-out-text {
    display: none;
  }

  .sign-out {
    padding: var(--spacing-sm);
  }

  h1 {
    font-size: 1.125rem;
  }
}

@media (max-width: 480px) {
  .logo-section svg {
    width: 24px;
    height: 24px;
  }

  h1 {
    font-size: 1rem;
  }
}
</style>
