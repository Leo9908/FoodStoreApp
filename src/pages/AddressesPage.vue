<template>
  <q-page padding>
    <!-- content -->
    <div class="q-mx-xl">
      <table-vue-vue
        :pcolumns="columns"
        :prows="addresses"
        ptitle="Sus direcciones"
        :ptype="{ pronoun: `la`, name: `dirección` }"
        @select="editAddAddress"
        @click="deleteAddress"
      />
    </div>
  </q-page>
</template>

<script>
import TableVueVue from "src/components/tables/TableVue.vue";

import { useMapsStore } from "src/stores/maps";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

export default {
  // name: 'PageName',
  components: {
    TableVueVue,
  },
  setup() {
    const router = useRouter();
    const maps = useMapsStore();
    const { addresses } = storeToRefs(maps);
    const columns = [
      {
        name: "alias",
        field: "alias",
        required: true,
        label: "Alias",
        align: "left",
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "formatted",
        align: "left",
        label: "Dirección",
        field: "formatted",
      },
      {
        name: "apto",
        label: "Apartamento",
        field: "apto",
        style: "width: 150px",
        align: "left",
      },
      {
        name: "actions",
        label: "Acciones",
        field: "actions",
        align: "right",
      },
    ];
    return {
      router,
      addresses,
      columns,
      editAddAddress(id) {
        if (id != undefined) {
          router.push({ name: "editAddress", params: { id: id } });
        } else {
          router.push({ name: "addAddress" });
        }
      },
      deleteAddress(id, r) {
        if (id != undefined && r == true) {
          maps.deleteAddress(id);
        }
      },
    };
  },
};
</script>
