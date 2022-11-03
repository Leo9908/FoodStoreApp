<template>
  <q-btn round color="secondary" icon="shopping_basket">
    <q-badge color="red" floating transparent>
      {{ countProducts }}
    </q-badge>
  </q-btn>
</template>
<script>
import { defineComponent } from "vue";

import { useProductsStore } from "stores/products";

import { storeToRefs } from "pinia";

export default defineComponent({
  name: "ButtonIndex",
  setup() {
    const products = new useProductsStore();
    const { countProducts } = storeToRefs(products);
    return {
      countProducts,
    };
  },
});
</script>
