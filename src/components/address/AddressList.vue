<template>
  <div class="q-pa-none" style="max-width: 350px">
    <q-toolbar
      class="bg-primary text-white q-mt-sm"
      style="border-radius: 3px"
      v-if="tabs == `addresses`"
    >
      <q-toolbar-title>{{
        $t("edit_profile.addressList.name")
      }}</q-toolbar-title>
      <q-btn
        flat
        class="no-shadow"
        text-color="white"
        color="secondary"
        icon="add"
        @click="[(tabs = `add-address`), routerDialog.count++]"
      />
    </q-toolbar>
    <q-tab-panels v-model="tabs">
      <q-tab-panel
        class="q-pa-none column"
        name="addresses"
        style="height: 330px"
      >
        <q-list class="q-px-none">
          <q-item-label header>{{
            $t("edit_profile.addressList.subtitle")
          }}</q-item-label>
          <q-separator />
          <q-scroll-area style="height: 250px; width: 260px">
            <div class="q-py-xs" v-for="address in addresses" :key="address.id">
              <address-item-vue :address="address" @select="showAddressNow" />
            </div>
          </q-scroll-area>
        </q-list>
      </q-tab-panel>
      <q-tab-panel class="row justify-center" name="add-address">
        <add-adress-vue />
      </q-tab-panel>
      <q-tab-panel class="row justify-center" name="show-address">
        <edit-address-vue :showAddress="showAddress" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

import { useMapsStore } from "src/stores/maps";

import { storeToRefs } from "pinia";

import { useRouterDialogStore } from "stores/router-dialog";

import AddressItemVue from "../lists/items/AddressItem.vue";
import AddAdressVue from "../forms/AddAdress.vue";
import EditAddressVue from "../forms/EditAddress.vue";

export default defineComponent({
  components: {
    AddressItemVue,
    AddAdressVue,
    EditAddressVue,
  },
  data() {
    return {
      showAddress: {},
    };
  },
  created() {
    this.$bus.on("go_back", (value) => {
      if (value == 3) {
        this.tabs = "addresses";
      }
    });
  },
  setup() {
    const routerDialog = new useRouterDialogStore();
    const maps = useMapsStore();
    const { addresses } = storeToRefs(maps);
    const { deleteAddress } = maps;
    return {
      tabs: ref("addresses"),
      routerDialog,
      addresses,
      deleteAddress,
    };
  },
  methods: {
    showAddressNow(address) {
      console.log(address);
      this.showAddress = address;
      this.tabs = "show-address";
    },
  },
});
</script>
