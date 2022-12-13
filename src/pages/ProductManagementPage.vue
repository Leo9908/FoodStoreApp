<template>
  <q-page padding>
    <!-- content -->
    <table-vue-vue
      :pcolumns="columns"
      :prows="products"
      @select="editAddProduct"
      @click="deleteProduct"
      ptitle="Productos"
      :ptype="{ pronoun: `el`, name: `producto` }"
    />
  </q-page>
</template>

<script>
import { useProductsStore } from "src/stores/products";

import TableVueVue from "src/components/tables/TableVue.vue";

import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

export default {
  // name: 'PageName',
  components: {
    TableVueVue,
  },
  beforeCreate() {
    this.getAllProducts();
  },
  setup() {
    const router = useRouter();
    const product = useProductsStore();
    const { getAllProducts } = product;
    const { products, getProductType } = storeToRefs(product);
    const columns = [
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
        name: "actions",
        label: "Acciones",
        field: "actions",
        align: "right",
      },
    ];
    return {
      getAllProducts,
      editAddProduct(id) {
        if (id != undefined) {
          router.push({ name: "editProduct", params: { id: id } });
        } else {
          router.push({ name: "addProduct" });
        }
      },
      deleteProduct(id, r) {
        if (id != undefined && r == true) {
          product.delete(id);
        }
      },
      columns,
      products,
    };
  },
};
</script>
