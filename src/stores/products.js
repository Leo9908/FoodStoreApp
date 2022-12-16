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
    imgServer: `${process.env.API}/products-img/files/`,
  }),

  getters: {
    getName(state) {
      return (productd) =>
        state.onSaleDishes.find((product) => product.id == productd).name;
    },
    getPrice(state) {
      return (productd) =>
        state.onSaleDishes.find((product) => product.id == productd).price;
    },
    getRating(state) {
      return (productId) =>
        state.onSaleDishes.find((product) => product.id == productId).rating;
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
      try {
        this.onSaleDishes = await (
          await api.get("/products/on-sale", { headers: null })
        ).data;
      } catch (error) {
        console.log(error);
      }
    },
    async getAllProducts() {
      try {
        this.products = await (
          await api.get("/products/no-deleted", { headers: null })
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
      try {
        await api.post(`/products/${user.getUserId}/${productId}/ratings`, {
          stars: stars,
        });
        this.updateRating(productId);
        Notify.create({
          message: "Gracias por su calificación",
          color: "info",
          icon: "thumb_up",
        });
      } catch (error) {
        Notify.create({
          message: error,
          color: "warning",
        });
      }
    },
    async updateRating(productId) {
      await api.get(`/products/${productId}/ratings`).then((response) => {
        this.onSaleDishes.find((dish) => dish.id == productId).rating =
          response.data;
      });
    },
    async searchDishes(keyWord) {
      try {
        this.searchedDishes = await (
          await api.get(`/products/search/?keyWord=${keyWord}`)
        ).data;
        console.log(this.searchDishes);
        this.isSearching = true;
      } catch (error) {
        console.log(error);
      }
    },
    restartSearch() {
      this.isSearching = false;
    },
    async setProduct(product, router) {
      if (product.id == null) {
        try {
          const newProduct = await (await api.post("/products", product)).data;
          this.products.push(newProduct);
          Notify.create({
            color: "info",
            message: "Producto añadido",
          });
          router.back();
        } catch (error) {
          console.log(error);
          Notify.create({
            color: "warning",
            message: "Error al añadir producto",
          });
        }
      } else {
        this.updateProduct(product, router);
      }
    },
    async updateProduct(edited, router) {
      if (edited.id != undefined) {
        try {
          const editedProduct = await (
            await api.put(`/products/${edited.id}`, edited)
          ).data;
          let localEdited = this.getProductById(editedProduct.id);
          localEdited = editedProduct;
          Notify.create({
            color: "info",
            message: "Producto editado",
          });
          router.back();
        } catch (error) {
          console.log(error);
          Notify.create({
            color: "warning",
            message: "Error al editar producto",
          });
        }
      } else {
        this.setProduct(edited, router);
      }
    },
    async delete(id) {
      try {
        await api.delete(`/products/${id}`);
        Notify.create({
          color: "info",
          message: "Eliminado",
        });
        const deleted = this.getProductById(id);
        const index = this.products.indexOf(deleted);
        this.products.splice(index, 1);
      } catch (error) {
        Notify.create({
          color: "warning",
          message: "Error al eliminar el producto",
        });
      }
    },
    async uploadImage(file) {
      const auth = useAuthStore();
      return new Promise((resolve, reject) => {
        // Retrieve JWT token from your store.
        const token = auth.token;
        resolve({
          url: "https://localhost/api/products-img/upload",
          method: "POST",
          headers: [{ name: "Authorization", value: `Bearer ${token}` }],
        });
      });
    },
    async downloadImages(id) {
      try {
        const urls = await (
          await api.get("/products-img/files/{filename:.+}")
        ).data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
