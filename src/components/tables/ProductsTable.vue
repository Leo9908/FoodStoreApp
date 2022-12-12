<template>
  <div class="q-pa-md">
    <q-table
      class="q-px-sm"
      style="height: 400px"
      flat
      bordered
      title="Productos"
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
            placeholder="Buscar"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn
            outline
            class=".col-md md-2"
            label="Añadir producto"
            icon="add"
            @click="add"
          ></q-btn>
        </div>
      </template>
      <template v-slot:body-cell-action="scope">
        <q-td :props="scope" class="q-gutter-xs">
          <q-btn
            label="Editar"
            icon="edit"
            outline
            key="xs-1"
            v-model="scope.row"
            @click="edit(scope.row.id)"
          />
          <q-btn
            label="Eliminar"
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

    function confirm(id) {
      $q.dialog({
        title: "Confirmar",
        message: "¿Desea eliminar el producto?",
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
          label: "Nombre",
          align: "left",
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "precio",
          align: "center",
          label: "Precio",
          field: "precio",
          sortable: true,
        },
        {
          name: "type",
          label: "Tipo",
          field: (row) => getProductType.value(row.type),
          sortable: true,
        },
        {
          name: "onSale",
          label: "¿En venta?",
          field: (row) => (row.onSale ? "Sí" : "No"),
        },
        {
          name: "rating",
          label: "Calificación",
          field: (row) => Math.round(row.rating),
        },
        {
          name: "action",
          label: "Acciones",
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
    };
  },
};
</script>
