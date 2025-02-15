import { defineStore } from 'pinia'

export const useVareblesStore = defineStore('vareble', {
  state: () => ({
    roleList: {
      1: 'Пользователь',
      2: 'Менеджер',
    },
    popUpState: "",
    selectedTour: null
  }),

  actions: {
    getRoleName(roleId) {
      return this.roleList[roleId];
    },
    setPopUpState(state) {
      this.popUpState = state
    },
    setSelectedTour(tourId) {
      this.selectedTour = tourId
    }
  },

  getters: {
    getRoleList: (state) => state.roleList
  },
  persist: true // теперь данные сохраняются в localStorage

})
