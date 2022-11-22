import { defineStore } from "pinia";
import { api } from "src/boot/axios";

import { useAuthStore } from "./auth";

const user = new useAuthStore();

export const useProfileStore = defineStore("profile", {
  state: () => ({
    me: user.me,
    copyMe: user.me,
  }),

  getters: {
    getUser(state) {
      return state.me;
    },
  },

  actions: {
    editUser(userEdited) {
      this.copyMe.name = userEdited.name;
      this.copyMe.last_name = userEdited.last_name;
      this.copyMe.email = userEdited.email;
      this.copyMe.phone = userEdited.phone;
      api.put(`/users/edit/${this.copyMe.id}`, this.copyMe).then(() => {
        this.updateMe();
      });
    },
    updateMe() {
      user.getMe();
    },
  },
});
