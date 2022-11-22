import { defineStore } from "pinia";
import { ref } from "vue";

export const useOrdersStore = defineStore("orders", {
  state: () => ({
    productList: new Map(),
    total: ref(0),
  }),

  getters: {},

  actions: {
    addProduct(productId) {
      this.productList.set(productId, 1);
      this.total++;
    },
    deleteProduct(productId) {
      let value = this.productList.get(productId);
      this.productList.delete(productId);
      this.total -= value;
    },
    increment(productId) {
      let value = this.productList.get(productId);
      this.productList.set(productId, ++value);
      this.total++;
    },
    decrement(productId) {
      let value = this.productList.get(productId);
      this.productList.set(productId, --value);
      this.total--;
    },
  },
});
