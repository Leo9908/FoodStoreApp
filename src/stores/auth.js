import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { SessionStorage } from "quasar";

import { useMapsStore } from "./maps";

import User from "./objects/User";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    me: new User(),
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
      api
        .get("/auth/current-user")
        .then((response) => {
          this.setMe(response.data);
          this.setInicial(response.data.name.substring(0, 1));
          maps.getAllAddress();
        })
        .catch((error) => {
          console.log(error);
          this.isAutenticated = false;
        });
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
  },
});
