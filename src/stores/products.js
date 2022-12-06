import { defineStore } from "pinia";

import { api } from "src/boot/axios";
import { ref } from "vue";

import { useAuthStore } from "./auth";

export const useProductsStore = defineStore("products", {
  state: () => ({
    dishes: [],
    favoriteDishes: [],
    searchedDishes: [],
    mostSoldDishes: [],
    isSearching: ref(false),
  }),

  getters: {
    getName(state) {
      return (productd) =>
        state.dishes.find((product) => product.id == productd).name;
    },
    getPrice(state) {
      return (productd) =>
        state.dishes.find((product) => product.id == productd).precio;
    },
    getRating(state) {
      return (productId) =>
        state.dishes.find((product) => product.id == productId).rating;
    },
  },
  actions: {
    async getProducts() {
      await api.get("/products", { headers: null }).then((response) => {
        this.dishes = response.data;
      });
    },
    async getFavoritesProducts() {
      const user = useAuthStore();
      await api
        .get(`/products/favorites/${user.getUserId}`)
        .then((response) => {
          this.favoriteDishes = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getMostSoldProducts() {
      await api.get("/products/most-sold").then((response) => {
        this.mostSoldDishes = response.data;
      });
    },
    async doRating(productId, stars) {
      const user = useAuthStore();
      await api
        .post(`/products/${user.getUserId}/${productId}/ratings`, {
          stars: stars,
        })
        .then(() => {
          this.updateRating(productId);
        });
    },
    async updateRating(productId) {
      await api.get(`/products/${productId}/ratings`).then((response) => {
        this.dishes.find((dish) => dish.id == productId).rating = response.data;
      });
    },
    async searchDishes(keyWord) {
      await api
        .get(`/products/search/?keyWord=${keyWord}`)
        .then((response) => {
          this.isSearching = true;
          this.searchedDishes = response.data;
          console.log(this.searchedDishes);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    restartSearch() {
      this.isSearching = false;
    },
  },
});
