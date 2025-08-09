import { create } from 'zustand'
import { signInWithPopup, signOut, User } from 'firebase/auth'
import { auth, provider } from '@/configs/firebase'
import { Path } from '@/routes/routes'

interface UserState {
  user: User | null
  isLoggedIn: boolean
  isLoading: boolean
  handleLogin: (navigate?: (path: string) => void) => Promise<void>
  handleLogout: (navigate?: (path: string) => void) => Promise<void>
  setUser: (user: User | null) => void
}

export const useUserStore = create<UserState>((set, _) => ({
  user: null,
  isLoggedIn: false,
  isLoading: false,

  setUser: (user: User | null) => {
    set({
      user,
      isLoggedIn: !!user,
      isLoading: false,
    })
  },

  handleLogin: async (navigate?: (path: string) => void) => {
    try {
      set({ isLoading: true })
      const result = await signInWithPopup(auth, provider)
      set({
        user: result.user,
        isLoggedIn: true,
        isLoading: false,
      })
      console.log('Login successful:', result.user.email)

      // Navigate to my-page after login
      if (navigate) {
        navigate(Path.MyPage)
      }
    } catch (error) {
      console.error('Login error:', error)
      set({ isLoading: false })
      throw error
    }
  },

  handleLogout: async (navigate?: (path: string) => void) => {
    try {
      set({ isLoading: true })
      await signOut(auth)
      set({
        user: null,
        isLoggedIn: false,
        isLoading: false,
      })
      console.log('Logout successful')

      // Navigate to column page after logout
      if (navigate) {
        navigate(Path.ColumnPage)
      }
    } catch (error) {
      console.error('Logout error:', error)
      set({ isLoading: false })
      throw error
    }
  },
}))
