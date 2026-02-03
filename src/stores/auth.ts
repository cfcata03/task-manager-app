import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth'
import { auth } from '@/firebase/config'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  // Initialize auth state listener
  const initAuth = () => {
    onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser
      loading.value = false
    })
  }

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      error.value = null
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
    } catch (err: any) {
      error.value = err.message
      console.error('Error signing in:', err)
    }
  }

  // Sign out
  const signOut = async () => {
    try {
      error.value = null
      await firebaseSignOut(auth)
    } catch (err: any) {
      error.value = err.message
      console.error('Error signing out:', err)
    }
  }

  return {
    user,
    loading,
    error,
    initAuth,
    signInWithGoogle,
    signOut
  }
})
