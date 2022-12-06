import { defineStore } from "pinia";
import { api } from "src/boot/axios";

import { useAuthStore } from "./auth";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    me: {},
    copyMe: {},
  }),

  getters: {
    getUser(state) {
      return state.me;
    },
    getPhone(state) {
      return state.me.phone;
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
    setMe(me) {
      this.me = me;
      this.copyMe = me;
    },
    clearMe() {
      this.me = {};
      this.copyMe = {};
    },
    updateMe() {
      const user = useAuthStore();
      user.getMe();
      this.me = user.me;
    },
  },
});
