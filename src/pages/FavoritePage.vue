<template>
  <q-page class="index flex flex-center q-mb-md">
    <food-card-vue v-for="d in products" v-bind:key="d" :dish="d" />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

import FoodCardVue from "src/components/cards/FoodCard.vue";

import { useProductsStore } from "stores/products";

import { storeToRefs } from "pinia";

export default defineComponent({
  name: "FavoritePage",
  components: {
    FoodCardVue,
  },
  created() {
    try {
      this.getFavoritesProducts();
    } catch (error) {
      console.log(error);
    }
  },
  data() {
    return {};
  },
  setup() {
    const product = useProductsStore();
    const { favoriteDishes, searchedDishes, isSearching } =
      storeToRefs(product);
    const { getFavoritesProducts } = product;
    return {
      favoriteDishes,
      getFavoritesProducts,
      searchedDishes,
      isSearching,
    };
  },
  computed: {
    products() {
      if (this.isSearching) {
        return this.searchedDishes;
      }
      return this.favoriteDishes;
    },
  },
});
</script>
