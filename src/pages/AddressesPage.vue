<template>
  <q-page padding>
    <!-- content -->
    <div class="q-mx-xl">
      <addresses-table :rows="getAddresses" @select="setSelectedAddress" />
    </div>
  </q-page>
</template>

<script>
import AddressesTable from "components/tables/AddressesTable.vue";
import { useMapsStore } from "src/stores/maps";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

export default {
  // name: 'PageName',
  components: {
    AddressesTable,
  },
  setup() {
    const router = useRouter();
    const maps = useMapsStore();
    const { getAddresses } = storeToRefs(maps);
    return {
      router,
      getAddresses,
      setSelectedAddress(id) {
        router.push({ path: `/profile/address/${id}` });
      },
    };
  },
};
</script>
