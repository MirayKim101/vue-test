import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: []
  }),
  actions: {
    addUser(user) {
      this.users.push(user);
      this.saveToLocalStorage();
    },
    loadFromLocalStorage() {
      const storedUsers = localStorage.getItem('userData');
      if (storedUsers) {
        this.users = JSON.parse(storedUsers);
      }
    },
    saveToLocalStorage() {
      localStorage.setItem('userData', JSON.stringify(this.users));
    }
  }
});
