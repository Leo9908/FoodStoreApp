import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { SessionStorage } from "quasar";

import { useMapsStore } from "./maps";

import { useProductsStore } from "./products";
import { useProfileStore } from "./profile";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    me: {},
    token: "",
    isAutenticated: false,
    inicial: "U",
  }),

  getters: {
    getToken(state) {
      return state.token;
    },
    isAutenticatedNow(state) {
      return state.isAutenticated;
    },
    getInicial(state) {
      return state.inicial;
    },
    getUserId(state) {
      return state.me.id;
    },
  },

  actions: {
    async doLogin(payload) {
      await api.post("/auth/login", payload).then((response) => {
        const token = response.data.accessToken;
        api.defaults.headers.common["Authorization"] = `Bearer${token}`;
        this.setToken(token);
        this.getMe();
      });
    },
    singOut() {
      api.defaults.headers.common["Authorization"] = "";
      this.removeToken();
      this.removeMe();
    },
    setToken(token) {
      this.token = token;
      this.isAutenticated = true;
      SessionStorage.set("token", JSON.stringify(token));
    },
    removeToken() {
      this.token = "";
      this.isAutenticated = false;
      SessionStorage.remove("token");
      this.removeInicial();
    },
    setMe(me) {
      this.me = me;
    },
    setInicial() {
      this.inicial = this.me.name.substring(0, 1);
    },
    removeInicial() {
      this.inicial = "U";
    },
    getMe() {
      const maps = useMapsStore();
      const product = useProductsStore();
      const profile = useProfileStore();
      api
        .get("/auth/current-user")
        .then((response) => {
          this.setMe(response.data);
          profile.setMe(this.me);
          this.setInicial(response.data.name.substring(0, 1));
          maps.getAllAddress();
          product.getFavoritesProducts();
        })
        .catch((error) => {
          console.log(error);
          this.isAutenticated = false;
        });
    },
    removeMe() {
      const profile = useProfileStore();
      this.me = {};
      profile.clearMe();
    },
    init() {
      const token = SessionStorage.getItem("token");
      if (token) {
        const tokenCopy = token.substring(1, token.length - 1);
        api.defaults.headers.common["Authorization"] = `Bearer${tokenCopy}`;
        this.setToken(JSON.parse(token));
        this.getMe();
      } else {
        this.removeToken();
      }
    },
    async sendEmailChangePassword(email) {
      await api
        .post("/auth/email/send-email", { emailTo: email })
        .then((response) => {});
    },
    async changePassword(password, confirmPassword, route) {
      await api.post("/auth/email/change-password", {
        password: password,
        confirmPassword: confirmPassword,
        tokenPassword: route.params.tokenPassword,
      });
    },
  },
});
