import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  type Unsubscribe
} from 'firebase/firestore'
import { db } from '@/firebase/config'
import { useAuthStore } from './auth'

export type TaskStatus = 'to-do' | 'in-progress' | 'done'

export interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  status?: TaskStatus  // Optional for backward compatibility
  createdAt: any
  updatedAt: any
  userId: string
  assignedTo?: string[]
}

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  let unsubscribe: Unsubscribe | null = null

  const authStore = useAuthStore()

  // Computed properties
  const completedTasks = computed(() => tasks.value.filter(t => t.completed))
  const activeTasks = computed(() => tasks.value.filter(t => !t.completed))
  const highPriorityTasks = computed(() =>
    tasks.value.filter(t => t.priority === 'high' && !t.completed)
  )

  // Kanban board computed properties (with backward compatibility)
  const todoTasks = computed(() =>
    tasks.value.filter(t => (t.status || 'to-do') === 'to-do' && !t.completed)
  )
  const inProgressTasks = computed(() =>
    tasks.value.filter(t => t.status === 'in-progress')
  )
  const doneTasks = computed(() =>
    tasks.value.filter(t => t.status === 'done' || (t.completed && !t.status))
  )

  // Subscribe to real-time updates
  const subscribeToTasks = () => {
    if (!authStore.user) return

    const tasksRef = collection(db, 'tasks')
    const q = query(tasksRef, orderBy('createdAt', 'desc'))

    unsubscribe = onSnapshot(q,
      (snapshot) => {
        tasks.value = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Task[]
        loading.value = false
      },
      (err) => {
        error.value = err.message
        console.error('Error fetching tasks:', err)
        loading.value = false
      }
    )
  }

  // Unsubscribe from updates
  const unsubscribeFromTasks = () => {
    if (unsubscribe) {
      unsubscribe()
      unsubscribe = null
    }
    tasks.value = []
  }

  // Add a new task
  const addTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
    if (!authStore.user) return

    try {
      error.value = null
      const tasksRef = collection(db, 'tasks')
      await addDoc(tasksRef, {
        ...taskData,
        status: taskData.status || 'to-do',  // Default to 'to-do'
        userId: authStore.user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
    } catch (err: any) {
      error.value = err.message
      console.error('Error adding task:', err)
    }
  }

  // Update a task
  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    try {
      error.value = null
      const taskRef = doc(db, 'tasks', taskId)
      await updateDoc(taskRef, {
        ...updates,
        updatedAt: serverTimestamp()
      })
    } catch (err: any) {
      error.value = err.message
      console.error('Error updating task:', err)
    }
  }

  // Toggle task completion
  const toggleTaskComplete = async (taskId: string, completed: boolean) => {
    await updateTask(taskId, { completed })
  }

  // Update task status (syncs with completed field)
  const updateTaskStatus = async (taskId: string, status: TaskStatus) => {
    await updateTask(taskId, {
      status,
      completed: status === 'done'
    })
  }

  // Delete a task
  const deleteTask = async (taskId: string) => {
    try {
      error.value = null
      const taskRef = doc(db, 'tasks', taskId)
      await deleteDoc(taskRef)
    } catch (err: any) {
      error.value = err.message
      console.error('Error deleting task:', err)
    }
  }

  return {
    tasks,
    loading,
    error,
    completedTasks,
    activeTasks,
    highPriorityTasks,
    todoTasks,
    inProgressTasks,
    doneTasks,
    subscribeToTasks,
    unsubscribeFromTasks,
    addTask,
    updateTask,
    toggleTaskComplete,
    updateTaskStatus,
    deleteTask
  }
})
