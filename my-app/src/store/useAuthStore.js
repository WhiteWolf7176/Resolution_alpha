import { create } from 'zustand'
import { supabase } from '../supabaseClient'

const useAuthStore = create((set, get) => ({
  // State
  session: null,
  user: null,
  loading: true,
  isAdmin: false,

  // Initialize auth state
  initialize: async () => {
    try {
      // Get initial session
      const { data: { session } } = await supabase.auth.getSession()
      const user = session?.user ?? null
      const isAdmin = user?.user_metadata?.role === 'admin' || user?.email === 'admin@example.com'
      
      set({ session, user, isAdmin, loading: false })

      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          const user = session?.user ?? null
          const isAdmin = user?.user_metadata?.role === 'admin' || user?.email === 'admin@example.com'
          set({ session, user, isAdmin, loading: false })
        }
      )

      return () => subscription.unsubscribe()
    } catch (error) {
      console.error('Error initializing auth:', error)
      set({ loading: false })
    }
  },

  // Login with Google
  loginWithGoogle: async () => {
    try {
      set({ loading: true })
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      })
      
      if (error) {
        console.error('Error logging in with Google:', error)
        set({ loading: false })
        throw error
      }
    } catch (error) {
      set({ loading: false })
      throw error
    }
  },

  // Logout
  logout: async () => {
    try {
      set({ loading: true })
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Error logging out:', error)
        set({ loading: false })
        throw error
      }
      
      set({ session: null, user: null, isAdmin: false, loading: false })
    } catch (error) {
      set({ loading: false })
      throw error
    }
  },

  // Update user profile
  updateProfile: async (updates) => {
    try {
      set({ loading: true })
      const { error } = await supabase.auth.updateUser(updates)
      
      if (error) {
        console.error('Error updating profile:', error)
        set({ loading: false })
        throw error
      }
      
      // Refresh user data
      const { data: { user } } = await supabase.auth.getUser()
      set({ user, loading: false })
    } catch (error) {
      set({ loading: false })
      throw error
    }
  },

  // Getters
  getUser: () => get().user,
  getSession: () => get().session,
  isAuthenticated: () => !!get().user,
  isUserAdmin: () => get().isAdmin,
  isLoading: () => get().loading,
}))

export default useAuthStore 