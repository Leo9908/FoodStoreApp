import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

import { Notify } from "quasar";

import { useAuthStore } from "./auth";

export const useMapsStore = defineStore("maps", {
  state: () => ({
    addresses: [],
  }),

  getters: {
    getAddressById(state) {
      return (addressId) =>
        state.addresses.find((address) => address.id == addressId);
    },
    getSelectedsAddress(state) {
      return state.selectedsAddress;
    },
    existAddress(state) {
      return (addresId) =>
        state.addresses.find((address) => address.id == addresId) != null;
    },
  },

  actions: {
    locator(address) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            address.latitude = position.coords.latitude;
            address.longitude = position.coords.longitude;
            this.getAddressFrom(address);
          },
          (error) => {
            Notify.create({
              message: "" + error,
              color: "warning",
            });
          }
        );
      } else {
        console.log("El navegador no soporta la geolocalización");
      }
    },
    async getAddressFrom(address) {
      await api
        .get(
          `https://api.opencagedata.com/geocode/v1/json?q=${address.latitude}+${address.longitude}&key=b22fc82a13744ba4a362ab666ee194f9`
        )
        .then((response) => {
          address.formatted = response.data.results[0].formatted;
        })
        .catch((error) => {
          Notify.create({
            message: "" + error,
            color: "warning",
          });
        });
    },
    async setAddress(address) {
      if (address != null) {
        const user = useAuthStore();
        await api
          .post(`/users/edit/${user.me.id}/address`, address)
          .then(() => {
            this.getAllAddress();
          });
      } else {
        console.log("La dirección es nula");
      }
    },
    getAllAddress() {
      const user = useAuthStore();
      api
        .get(`/users/${user.me.id}/address`)
        .then((response) => {
          this.addresses = response.data;
        })
        .catch((error) => {
          Notify.create({
            message: "" + error,
            color: "warning",
          });
        });
    },
    deleteAddress(addressId) {
      const user = useAuthStore();
      api
        .delete(`/users/${user.me.id}/address/${addressId}`)
        .then(() => {
          this.getAllAddress();
          Notify.create({
            message: "Dirección eliminada",
            color: "info",
          });
        })
        .catch((error) => {
          Notify.create({
            message: "Error al eliminar dirección",
            color: "warning",
          });
        });
    },
    async updateAddress(editedAddress) {
      if (editedAddress.id != undefined) {
        const user = useAuthStore();
        await api
          .put(
            `/users/${user.me.id}/address/${editedAddress.id}`,
            editedAddress
          )
          .then(() => {
            this.getAllAddress();
          });
      } else {
        this.setAddress(editedAddress);
      }
    },
  },
});
