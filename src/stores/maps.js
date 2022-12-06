import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

import { Notify } from "quasar";

import { useAuthStore } from "./auth";

export const useMapsStore = defineStore("maps", {
  state: () => ({
    address: {
      alias: ref(null),
      formatted: ref(null),
      apto: ref(null),
      latitude: ref(null),
      longitude: ref(null),
    },
    addresses: [],
  }),

  getters: {
    getAddress(state) {
      return state.address;
    },
    getAddresses(state) {
      return state.addresses;
    },
    getAddressById(state) {
      return (addressId) =>
        state.addresses.find((address) => address.id == addressId);
    },
    getSelectedsAddress(state) {
      return state.selectedsAddress;
    },
  },

  actions: {
    locator() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.address.latitude = position.coords.latitude;
            this.address.longitude = position.coords.longitude;
            this.getAddressFrom();
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
    getAddressFrom() {
      api
        .get(
          `https://api.opencagedata.com/geocode/v1/json?q=${this.address.latitude}+${this.address.longitude}&key=b22fc82a13744ba4a362ab666ee194f9`
        )
        .then((response) => {
          console.log(response);
          this.address.formatted = response.data.results[0].formatted;
          console.log(response.data.results[0].formatted);
        })
        .catch((error) => {
          Notify.create({
            message: "" + error,
            color: "warning",
          });
        });
    },
    setAddress() {
      if (this.address != null) {
        /**
         * Esto es para formar la dirección definitiva para que se guarde toda junta
         * en la BD
         */
        const user = useAuthStore();
        api
          .post(`/users/edit/${user.me.id}/address`, this.address)
          .then(() => {
            this.getAllAddress();
            Notify.create({
              message: "Submited",
              color: "info",
            });
          })
          .catch((error) => {
            Notify.create({
              message: "" + error,
              color: "warning",
            });
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
    removeAddress() {
      this.address.alias = " ";
      this.address.apto = " ";
      this.address.formatted = " ";
      this.address.latitude = " ";
      this.address.longitude = " ";
    },
    deleteAddress(addressId) {
      const user = useAuthStore();
      api
        .delete(`/users/${user.me.id}/address/${addressId}`)
        .then(() => {
          this.getAllAddress();
          Notify.create({
            message: "Deleted",
            color: "info",
          });
        })
        .catch((error) => {
          Notify.create({
            message: error,
            color: "warning",
          });
        });
    },
    updateAddress(address) {
      const user = useAuthStore();
      api
        .put(`/users/${user.me.id}/address/${address.id}`, address)
        .then(() => {
          Notify.create({
            message: "Done",
            color: "info",
          });
        })
        .catch((error) => {
          Notify.create({
            message: error,
            color: "warning",
          });
        });
    },
    /**
     * selecciona o deselecciona los address en la lista
     */
    selectAddress(addresId, action) {
      if (action) {
        this.selectedsAddress.push(addresId);
      } else {
        const index = this.selectedsAddress.indexOf(addresId);
        if (index !== -1) this.selectedsAddress.splice(index, 1);
      }
    },
  },
});
