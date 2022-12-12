import { defineStore } from "pinia";
import { Notify } from "quasar";

import { api } from "src/boot/axios";
import { ref } from "vue";

import { useAuthStore } from "./auth";

export const useProductsStore = defineStore("products", {
  state: () => ({
    onSaleDishes: [],
    favoriteDishes: [],
    searchedDishes: [],
    mostSoldDishes: [],
    isSearching: ref(false),
    products: [],
  }),

  getters: {
    getName(state) {
      return (productd) =>
        state.onSaleDishes.find((product) => product.id == productd).name;
    },
    getPrice(state) {
      return (productd) =>
        state.onSaleDishes.find((product) => product.id == productd).precio;
    },
    getRating(state) {
      return (productId) =>
        state.onSaleDishes.find((product) => product.id == productId).rating;
    },
    getProductType(state) {
      return (type, $t) => {
        switch (type) {
          case 1:
            return $t(`products.breakfast`);
          case 2:
            return $t(`products.lunch`);
          case 3:
            return $t(`products.dinner`);
          case 4:
            return $t(`products.garnish`);
          case 5:
            return $t(`products.fast_food`);
          case 6:
            return $t(`products.canned_food`);
          case 7:
            return $t(`products.side_dish`);
          default:
            return $t(`products.breakfast`);
        }
      };
    },
    getAllTypes(state) {
      return ($t) => [
        { label: $t(`products.breakfast`), value: 1 },
        { label: $t(`products.lunch`), value: 2 },
        { label: $t(`products.dinner`), value: 3 },
        { label: $t(`products.garnish`), value: 4 },
        { label: $t(`products.fast_food`), value: 5 },
        { label: $t(`products.canned_food`), value: 6 },
        { label: $t(`products.side_dish`), value: 7 },
      ];
    },
    getProductById(state) {
      return (id) => state.products.find((product) => product.id == id);
    },
    exitProduct(state) {
      return (id) => state.products.find((product) => product.id == id) != null;
    },
  },
  actions: {
    async getOnSaleProducts() {
      await api.get("/products/on-sale", { headers: null }).then((response) => {
        this.onSaleDishes = response.data;
      });
    },
    async getAllProducts() {
      try {
        this.products = await (
          await api.get("/products", { headers: null })
        ).data;
      } catch (error) {
        console.log(error);
      }
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
        this.onSaleDishes.find((dish) => dish.id == productId).rating =
          response.data;
      });
    },
    async searchDishes(keyWord) {
      await api
        .get(`/products/search/?keyWord=${keyWord}`)
        .then((response) => {
          this.isSearching = true;
          this.searchedDishes = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async setProduct(product, t, router) {
      if (product.id == null) {
        try {
          const newProduct = await (await api.post("/products", product)).data;
          this.products.push(newProduct);
          Notify.create({
            color: "info",
            message: t("responses.add", [t("products.name")]),
          });
          router.back();
        } catch (error) {
          console.log(error);
          Notify.create({
            color: "warning",
            message: t("responses.errors.noAdd", [t("products.name")]),
          });
        }
      } else {
        this.updateProduct(product, t, router);
      }
    },
    async updateProduct(edited, t, router) {
      if (edited.id != undefined) {
        try {
          const editedProduct = await (
            await api.put(`/products/${edited.id}`, edited)
          ).data;
          let localEdited = this.getProductById(editedProduct.id);
          localEdited = editedProduct;
          Notify.create({
            color: "info",
            message: t("responses.edited", [t("products.name")]),
          });
          router.back();
        } catch (error) {
          console.log(error);
          Notify.create({
            color: "warning",
            message: t("responses.errors.noEdited", [t("products.name")]),
          });
        }
      } else {
        this.setProduct(edited, t, router);
      }
    },
    async delete(id, t) {
      try {
        await api.delete(`/products/${id}`);
        Notify.create({
          color: "info",
          message: "Eliminado",
        });
      } catch (error) {
        console.log(error);
        Notify.create({
          color: "warning",
          message: error,
        });
      }
    },
    restartSearch() {
      this.isSearching = false;
    },
  },
});
