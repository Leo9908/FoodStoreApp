<template>
  <div class="row justify-center">
    <div>
      <google-maps-vue />
    </div>
    <q-form class="col" @submit="onSubmit" @reset="onReset">
      <q-input
        bottom-slots
        v-model="address.alias"
        label="Alias"
        dense
        rounded
        outlined
        style="width: 250px"
        type="text"
        :rules="[(val) => (val && val.length > 0) || `Por favor escriba algo`]"
      >
      </q-input>
      <q-input
        bottom-slots
        v-model="address.formatted"
        :label="$t(`add_address.address`)"
        dense
        rounded
        outlined
        style="width: 250px"
        type="textarea"
        autogrow
        :rules="[(val) => (val && val.length > 0) || `Por favor escriba algo`]"
      >
        <template v-slot:after>
          <q-btn round dense flat :icon="biGeoFill" @click="locatorPressed" />
        </template>
      </q-input>
      <q-input
        bottom-slots
        v-model="address.apto"
        :label="$t(`add_address.apto`)"
        dense
        rounded
        outlined
        style="width: 250px"
        type="text"
        :rules="[(val) => (val && val.length > 0) || `Por favor escriba algo`]"
      >
      </q-input>
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";

import { biGeoFill } from "@quasar/extras/bootstrap-icons";

import GoogleMapsVue from "../cards/GoogleMaps.vue";

import { useMapsStore } from "stores/maps";
import { storeToRefs } from "pinia";

export default defineComponent({
  components: {
    GoogleMapsVue,
  },
  setup() {
    const maps = useMapsStore();
    const { locator, removeAddress, setAddress } = maps;
    const { address } = storeToRefs(maps);
    return {
      biGeoFill,
      locator,
      address,
      removeAddress,
      setAddress,
    };
  },
  methods: {
    locatorPressed() {
      this.locator();
    },
    onSubmit() {
      this.setAddress();
      this.removeAddress();
    },
    onReset() {
      this.removeAddress();
    },
  },
});
</script>
