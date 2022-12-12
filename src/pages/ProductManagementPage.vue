<template>
  <q-page padding>
    <!-- content -->
    <products-table-vue :products="products" />
  </q-page>
</template>

<script>
import { useProductsStore } from "src/stores/products";

import ProductsTableVue from "src/components/tables/ProductsTable.vue";
import { storeToRefs } from "pinia";

export default {
  // name: 'PageName',
  components: {
    ProductsTableVue,
  },
  beforeCreate() {
    this.getAllProducts();
  },
  setup() {
    const product = useProductsStore();
    const { getAllProducts } = product;
    const { products } = storeToRefs(product);
    return {
      getAllProducts,
      products,
    };
  },
};
</script>
