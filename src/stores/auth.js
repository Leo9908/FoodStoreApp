import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { SessionStorage } from "quasar";

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
  },

  actions: {
    doLogin(payload) {
      api.post("/auth/login", payload).then((response) => {
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
    setInicial(inicial) {
      this.inicial = inicial;
    },
    removeInicial() {
      this.inicial = "U";
    },
    getMe() {
      api
        .get("/auth/current-user")
        .then((response) => {
          this.setMe(response.data);
          this.setInicial(response.data.name.substring(0, 1));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    init() {
      const token = SessionStorage.getItem("token");
      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer${token}`;
        this.setToken(JSON.parse(token));
        this.getMe();
      } else {
        this.removeToken();
      }
    },
  },
});
