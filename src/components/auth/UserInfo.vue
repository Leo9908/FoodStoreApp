<template>
  <div class="q-pa-none">
    <q-tab-panels v-model="tabs" class="q-pa-none">
      <q-tab-panel name="data" class="q-pa-none">
        <update-user-vue />
      </q-tab-panel>
      <q-tab-panel name="address" class="q-pa-none">
        <q-card class="row justify-center">
          <q-card-section class="q-pa-none" style="max-width: 270px">
            <address-list-vue />
          </q-card-section>
        </q-card>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

import AddressListVue from "../address/AddressList.vue";
import UpdateUserVue from "../forms/UpdateUser.vue";

export default defineComponent({
  components: {
    AddressListVue,
    UpdateUserVue,
  },
  data() {
    return {
      addressToRemove: [],
    };
  },
  created() {
    this.$bus.on("go_back", (value) => {
      if (value == 2) {
        this.tabs = "data";
      }
    });
    this.$bus.on("add-address", () => {
      this.tabs = "address";
    });
    this.$bus.on("select-address", (addresId, action) => {
      console.log(addresId);
      if (action) {
        this.addressToRemove.push(addresId);
      } else {
        const index = this.addressToRemove.indexOf(addresId);
        if (index !== -1) this.addressToRemove.splice(index, 1);
      }
      console.log(this.addressToRemove);
    });
    this.$bus.on("delete_address", () => {});
  },
  setup() {
    return {
      tabs: ref("data"),
    };
  },
});
</script>
