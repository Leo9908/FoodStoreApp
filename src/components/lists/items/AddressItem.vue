<template>
  <q-item class="q-my-sm q-pr-md row justify-between" style="cursor: pointer">
    <q-item-section class="q-pa-none" avatar>
      <q-avatar color="primary" text-color="white">
        {{ address.alias.substring(0, 1) }}
      </q-avatar>
    </q-item-section>

    <q-item-section @click="[showAddress(), routerDialog.count++]">
      <q-item-label>{{ address.alias }}</q-item-label>
      <q-item-label caption lines="1">{{
        `Apto. ${address.apto}`
      }}</q-item-label>
    </q-item-section>
    <div>
      <q-badge class="q-mr-xs q-mt-xs" floating color="white">
        <q-icon :name="biThreeDotsVertical" color="black" />
        <q-menu anchor="bottom middle" self="top right">
          <q-item clickable @click="deleteAddress(address.id)">
            <q-item-section>{{ $t("actions.delete") }}</q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section>New incognito tab</q-item-section>
          </q-item>
        </q-menu>
      </q-badge>
    </div>
  </q-item>
</template>
<script>
import { defineComponent, ref } from "vue";

import { biThreeDotsVertical } from "@quasar/extras/bootstrap-icons";

import { useMapsStore } from "src/stores/maps";
import { useRouterDialogStore } from "src/stores/router-dialog";
import { storeToRefs } from "pinia";

export default defineComponent({
  props: {
    address: { type: Object, required: true },
  },
  setup() {
    const maps = useMapsStore();
    const { addresses } = storeToRefs(maps);
    const routerDialog = useRouterDialogStore();
    const { selectAddress, deleteAddress } = maps;
    return {
      biThreeDotsVertical,
      addresses,
      routerDialog,
      shape: ref(false),
      selectAddress,
      deleteAddress,
    };
  },
  methods: {
    showAddress() {
      this.$emit("select", this.address);
    },
  },
});
</script>
