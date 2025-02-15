import { defineStore } from 'pinia'

export const useVareblesStore = defineStore('vareble', {
  state: () => ({
    roleList: {
      1: 'Пользователь',
      2: 'Менеджер',
    }
  }),

  actions: {
    getRoleName(roleId) {
      return this.roleList[roleId];
    }
  },

  getters: {
    getRoleList: (state) => state.roleList
  },
  persist: true // теперь данные сохраняются в localStorage

})
