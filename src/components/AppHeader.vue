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
      <h1 class="logo">Task<span class="logo-accent">Manager</span></h1>

      <div class="user-section">
        <img v-if="userPhoto" :src="userPhoto" :alt="userName" class="avatar" />
        <span class="user-name">{{ userName }}</span>
        <button @click="authStore.signOut" class="sign-out">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
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
  background: var(--bg-primary);
  border-bottom: var(--border-thick);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--spacing-md) var(--spacing-xl);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-family: var(--font-display);
  font-size: 1.75rem;
  color: var(--black);
  letter-spacing: -0.02em;
}

.logo-accent {
  color: var(--accent-orange);
  margin-left: 0.2em;
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
  border: var(--border);
  box-shadow: 2px 2px 0px var(--black);
}

.user-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.sign-out {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--white);
  border: var(--border);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--black);
  cursor: pointer;
  box-shadow: var(--shadow);
  transition: all var(--transition-fast);
}

.sign-out:hover {
  background: var(--accent-orange);
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px var(--black);
}

.sign-out:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px var(--black);
}

@media (max-width: 768px) {
  .header-content {
    padding: var(--spacing-md);
  }

  .user-name {
    display: none;
  }

  .sign-out-text {
    display: none;
  }

  .sign-out {
    padding: var(--spacing-sm);
  }

  .logo {
    font-size: 1.5rem;
  }
}
</style>
