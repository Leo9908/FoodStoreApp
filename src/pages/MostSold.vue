<template>
  <q-page class="index flex flex-center q-mb-md">
    <food-card-vue v-for="d in products" v-bind:key="d" :dish="d" />
    <q-card
      v-if="
        mostSoldDishes.length == 0 ||
        (isSearching && searchedDishes.length == 0)
      "
      flat
      bordered
      class="q-ma-md bg-grey-2"
    >
      <q-card-section>{{
        !isSearching
          ? $t("products.errors.noProducts")
          : $t("products.errors.noMatches")
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
  name: "MostSold",
  components: {
    FoodCardVue,
  },
  created() {
    try {
      this.getMostSoldProducts();
    } catch (error) {
      console.log(error);
    }
  },
  setup() {
    const product = useProductsStore();
    const { mostSoldDishes, searchedDishes, isSearching } =
      storeToRefs(product);
    const { getMostSoldProducts } = product;
    return {
      mostSoldDishes,
      getMostSoldProducts,
      searchedDishes,
      isSearching,
    };
  },
  computed: {
    products() {
      if (this.isSearching) {
        return this.searchedDishes;
      }
      return this.mostSoldDishes;
    },
  },
});
</script>
