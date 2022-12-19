import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useRegisterStore = defineStore("register", {
  state: () => ({
    status: "",
    message: "",
  }),

  getters: {
    getSatus(state) {
      return state.status;
    },
    getMessage(state) {
      return state.message;
    },
  },

  actions: {
    setStatus(status) {
      this.status = status;
    },
    setMessage(message) {
      this.message = message;
    },
  },
});
