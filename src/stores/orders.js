import { defineStore } from "pinia";
import { ref } from "vue";
import { Notify } from "quasar";

import { useProductsStore } from "./products";
import { useMapsStore } from "./maps";
import { api } from "src/boot/axios";

import { useAuthStore } from "./auth";

export const useOrdersStore = defineStore("orders", {
  state: () => ({
    productList: new Map(),
    total: ref(0),
    orderTable: [],
    addressOptions: [],
    finalOrder: {},
    totalPrice: 0,
  }),

  getters: {
    isSelected(state) {
      return (productId) => state.productList.has(productId);
    },
    numberProduct(state) {
      return (productId) => state.productList.get(productId);
    },
    getOrderTable(state) {
      return state.orderTable;
    },
    getAddressOptions(state) {
      return state.addressOptions;
    },
    canBeSent(state) {
      return state.orderTable.length > 0;
    },
  },

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
    updateAmount(productId, amount, initialAmount) {
      let newValue = initialAmount - amount;
      this.productList.set(productId, amount);
      this.updatePrice(productId, amount);
      this.total -= newValue;
    },
    updatePrice(productId, amount) {
      let initial = this.orderTable.find(
        (product) => product.id == productId
      ).initialPrice;
      this.orderTable.find((product) => product.id == productId).price =
        initial * amount;
    },
    generateOrder() {
      this.orderTable = [];
      const prod = useProductsStore();
      this.productList.forEach((value, key) => {
        let name = prod.getName(key);
        let price = prod.getPrice(key);
        this.orderTable.push({
          id: key,
          name: name,
          amount: value,
          initialPrice: price,
          price: price * value,
        });
      });
      this.calcTotalPrice();
    },
    generateAddressOptions() {
      this.addressOptions = [];
      const maps = useMapsStore();
      const addresses = maps.addresses;
      addresses.forEach((address) => {
        this.addressOptions.push({ label: address.alias, value: address.id });
      });
    },
    sendOrder(data) {
      this.prepareFinalOrder(data);
      const user = useAuthStore();
      api.post(`/${user.me.id}/orders`, this.finalOrder).then(() => {
        this.clearOrder();
      });
    },
    prepareFinalOrder(data) {
      const maps = useMapsStore();
      let addresses = [];
      let phone = "";
      data.forEach((item) => {
        if (item.name == "selected_address") {
          addresses.push(item.value);
        } else if (item.name == "selected_phone") {
          phone = item.value;
        }
      });
      const convMap = {};
      this.productList.forEach((val, key) => {
        convMap[key] = val;
      });
      this.finalOrder = {
        addresses: addresses,
        products: convMap,
        secondPhone: phone,
      };
    },
    clearOrder() {
      this.productList.clear();
      this.total = 0;
      this.orderTable = [];
      this.addressOptions = [];
      this.finalOrder = {};
    },
    calcTotalPrice() {
      this.totalPrice = 0;
      this.orderTable.forEach((value) => {
        this.totalPrice += value.price;
      });
    },
  },
});
