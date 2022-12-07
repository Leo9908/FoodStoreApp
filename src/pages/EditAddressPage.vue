<template>
  <q-page padding>
    <!-- content -->
    <div class="q-mt-xl" align="center">
      <edit-address-form-vue :address="address" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

import EditAddressFormVue from "src/components/forms/EditAddressForm.vue";
import { useRoute } from "vue-router";
import { useMapsStore } from "src/stores/maps";
import { storeToRefs } from "pinia";

export default defineComponent({
  // name: 'PageName',
  components: {
    EditAddressFormVue,
  },
  beforeCreate() {
    const route = useRoute();
    const id = route.params.id;
    if (this.existAddress(id)) {
      this.address = this.getAddressById(id);
    }
  },
  setup() {
    const maps = useMapsStore();
    const { getAddressById, existAddress } = storeToRefs(maps);
    const address = ref({});
    return {
      maps,
      getAddressById,
      existAddress,
      address,
    };
  },
});
</script>
