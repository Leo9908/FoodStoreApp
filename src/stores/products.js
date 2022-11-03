import { defineStore } from "pinia";

import { api } from "src/boot/axios";

export const useProductsStore = defineStore("products", {
  state: () => ({
    dishes: [],
    selectedProducts: [],
  }),

  getters: {
    countProducts(state) {
      return state.selectedProducts.length;
    },
  },
  actions: {
    async getProducts() {
      await api.get("/products", { headers: null }).then((response) => {
        this.dishes = response.data;
      });
    },
    setProduct(dish) {
      this.selectedProducts.push(dish);
    },
    removeProduct(dish) {
      var myIndex = this.selectedProducts.indexOf(dish);
      if (myIndex !== -1) this.selectedProducts.splice(myIndex, 1);
    },
    removeAllById(id) {
      let indexs = [];
      for (let i = 0; i < this.selectedProducts.length; i++) {
        if (this.selectedProducts[i].id == id) {
          indexs.push(i);
        }
      }
      indexs.forEach((i) => {
        this.selectedProducts.splice(i, 1);
      });
    },
  },
});
