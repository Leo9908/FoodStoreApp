<template>
  <div class="q-pa-md">
    <q-table
      class="q-px-sm"
      style="height: 400px"
      flat
      bordered
      :title="$t(`admin.products.table.title`)"
      :rows="rows"
      :columns="columns"
      row-key="index"
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      :filter="filter"
    >
      <template v-slot:top-right>
        <div class="row q-gutter-md">
          <q-input
            class="col md-1"
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn
            outline
            class=".col-md md-2"
            :label="$t(`actions.add`, [$t(`products.name`)])"
            icon="add"
            @click="add"
          ></q-btn>
        </div>
      </template>
      <template v-slot:body-cell-action="scope">
        <q-td :props="scope" class="q-gutter-xs">
          <q-btn
            :label="$t(`admin.products.table.actions.a1`)"
            icon="edit"
            outline
            key="xs-1"
            v-model="scope.row"
            @click="edit(scope.row.id)"
          />
          <q-btn
            :label="$t(`admin.products.table.actions.a2`)"
            icon="delete"
            align="between"
            color="secondary"
            outline
            key="xs-2"
            v-model="scope.row"
            @click="confirm(scope.row.id)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { useProductsStore } from "src/stores/products";
import { ref, toRef } from "vue";
import { useI18n } from "vue-i18n";

import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

export default {
  props: {
    products: { type: Array, required: false },
  },
  setup(props) {
    const router = useRouter();
    const product = useProductsStore();
    const { getProductType } = storeToRefs(product);
    const products = toRef(props, "products");
    const $q = useQuasar();
    const { t } = useI18n();
    function confirm(id) {
      $q.dialog({
        title: t("admin.products.table.actions.confirm"),
        message: t("admin.products.table.actions.message"),
        cancel: true,
        persistent: true,
      }).onOk(() => {
        product.delete(id, t);
      });
    }
    return {
      filter: ref(""),
      getProductType,
      pagination: ref({
        rowsPerPage: 0,
      }),
      columns: [
        {
          name: "name",
          required: true,
          label: t(`admin.products.table.columns.c1`),
          align: "left",
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "calories",
          align: "center",
          label: t(`admin.products.table.columns.c2`),
          field: "precio",
          sortable: true,
        },
        {
          name: "fat",
          label: t(`admin.products.table.columns.c3`),
          field: (row) => getProductType.value(row.type, t),
          sortable: true,
        },
        {
          name: "onSale",
          label: t(`admin.products.table.columns.c4`),
          field: (row) =>
            row.onSale ? t("admin.products.table.columns.onSale") : `No`,
        },
        {
          name: "rating",
          label: t(`admin.products.table.columns.c5`),
          field: (row) => Math.round(row.rating),
        },
        {
          name: "action",
          label: t(`admin.products.table.columns.c6`),
          field: "action",
          align: "right",
        },
      ],
      edit(id) {
        router.push({ name: "editProduct", params: { id: id } });
      },
      add() {
        router.push({ name: "addProduct" });
      },
      rows: products,
      confirm,
      t,
    };
  },
};
</script>
