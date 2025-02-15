import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null
  }),

  actions: {
    login(userData, token) {
      this.user = userData
      this.token = token
    },
    logout() {
      this.user = null
      this.token = null
    }
  },

  getters: {
    isAuthenticated: (state) => !!state.token
  }
  
})
