import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || "", // Загружаем токен из localStorage при запуске
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
  },
  persist: true // теперь данные сохраняются в localStorage

  
})
