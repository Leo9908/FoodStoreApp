import { defineStore } from "pinia";
import { api } from "src/boot/axios";

import { useAuthStore } from "./auth";

const user = new useAuthStore();

export const useProfileStore = defineStore("profile", {
  state: () => ({
    me: user.me,
  }),

  getters: {
    getUser(state) {
      return state.me;
    },
  },

  actions: {
    editUser(userEdited) {
      this.me.name = userEdited.name;
      this.me.last_name = userEdited.last_name;
      this.me.email = userEdited.email;
      this.me.phone = userEdited.phone;
      this.me.municipality = userEdited.municipality;
      this.me.address = userEdited.address;
      user.setMe(this.me);
      api.put(`/users/edit/${this.me.id}`, this.me).then((response) => {
        user.setMe(response.data);
      });
    },
  },
});
