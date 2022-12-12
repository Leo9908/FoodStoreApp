<template>
  <q-page class="index flex flex-center q-mb-md">
    <food-card-vue v-for="d in products" v-bind:key="d" :dish="d" />
    <q-card
      v-if="
        onSaleDishes.length == 0 || (isSearching && searchedDishes.length == 0)
      "
      flat
      bordered
      class="q-ma-md bg-grey-2"
    >
      <q-card-section>{{
        !isSearching
          ? `Lo sentimos. No hay productos
             en venta en estos momentos,
             por favor regrese más tarde. Gracias`
          : `No hay coincidencias`
      }}</q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

import FoodCardVue from "src/components/cards/FoodCard.vue";

import { useProductsStore } from "stores/products";

import { storeToRefs } from "pinia";

export default defineComponent({
  name: "IndexPage",
  components: {
    FoodCardVue,
  },

  created() {
    try {
      this.getOnSaleProducts();
    } catch (error) {
      console.log(error);
    }
  },
  data() {
    return {};
  },
  setup() {
    const product = useProductsStore();
    const { onSaleDishes, searchedDishes, isSearching } = storeToRefs(product);
    const { getOnSaleProducts } = product;
    return {
      onSaleDishes,
      getOnSaleProducts,
      searchedDishes,
      isSearching,
    };
  },
  computed: {
    products() {
      if (this.isSearching) {
        return this.searchedDishes;
      }
      return this.onSaleDishes;
    },
  },
});
</script>
