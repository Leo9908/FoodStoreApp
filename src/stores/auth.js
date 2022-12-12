import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, SessionStorage } from "quasar";

import { useMapsStore } from "./maps";

import { useProductsStore } from "./products";
import { useProfileStore } from "./profile";

import User from "./objects/User";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    me: new User(),
    token: "",
    isAutenticated: false,
    inicial: "U",
    roles: [],
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
    isAdmin(state) {
      return state.roles.includes("ROLE_ADMIN");
    },
    isUser(state) {
      return state.roles.includes("ROLE_USER");
    },
  },

  actions: {
    async doLogin(payload, t, router) {
      try {
        const token = await (
          await api.post("/auth/login", payload)
        ).data.accessToken;
        api.defaults.headers.common["Authorization"] = `Bearer${token}`;
        this.getMe();
        this.setToken(token);
        Notify.create({
          message: t("login_card.logOk"),
          color: "info",
        });
        router.push({ path: "/" });
      } catch (error) {
        Notify.create({
          message: t("login_card.noCorrect"),
          color: "warning",
        });
      }
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
    async getMe() {
      const maps = useMapsStore();
      const product = useProductsStore();
      const profile = useProfileStore();
      try {
        this.me = await (await api.get("/auth/current-user")).data;
        this.getRoles();
        profile.setMe(this.me);
        this.setInicial(this.me.name.substring(0, 1));
        maps.getAllAddress();
        product.getFavoritesProducts();
      } catch (error) {
        console.log(error);
      }
    },
    getRoles() {
      this.me.roles.forEach((role) => {
        this.roles.push(role.name);
      });
    },
    removeMe() {
      const profile = useProfileStore();
      profile.$reset();
      this.me = new User();
      this.roles = [];
    },
    init() {
      const token = SessionStorage.getItem("token");
      if (token) {
        const tokenCopy = token.substring(1, token.length - 1);
        api.defaults.headers.common["Authorization"] = `Bearer${tokenCopy}`;
        this.getMe();
        this.setToken(JSON.parse(token));
      } else {
        this.removeToken();
      }
    },
    async sendEmailChangePassword(email) {
      try {
        await api.post("/auth/email/send-email", { emailTo: email });
      } catch (error) {
        console.log(error);
      }
    },
    async changePassword(password, confirmPassword, token) {
      await api.post("/auth/email/change-password", {
        password: password,
        confirmPassword: confirmPassword,
        tokenPassword: token,
      });
    },
  },
});
