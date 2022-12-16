<template>
  <q-page class="index flex flex-center q-mb-md">
    <!-- <food-card-vue v-for="d in products" v-bind:key="d" :dish="d" /> -->
    <product-card-vue
      v-for="d in products"
      :key="d"
      :product="d"
      :selected="isSelected(d.id)"
      :amount="numberProduct(d.id)"
      @add="selectProduct"
      @select="ratingProduct"
      @increment="increment"
    />
    <q-card
      v-if="
        favoriteDishes.length == 0 ||
        (isSearching && searchedDishes.length == 0)
      "
      flat
      bordered
      class="q-ma-md bg-grey-2"
    >
      <q-card-section>{{
        !isSearching
          ? `Lo sentimos. No hay productos
             en esta seción, debe dar una
             evaluación perfecta a alguno de
             nuestros productos. Gracias`
          : `No hay coincidencias`
      }}</q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

import ProductCardVue from "src/components/cards/ProductCard.vue";

import { useProductsStore } from "stores/products";

import { storeToRefs } from "pinia";
import { useOrdersStore } from "src/stores/orders";

export default defineComponent({
  name: "IndexPage",
  components: {
    ProductCardVue,
  },

  created() {
    try {
      this.getFavoritesProducts();
    } catch (error) {
      console.log(error);
    }
  },
  setup() {
    const product = useProductsStore();
    const orders = useOrdersStore();
    const { favoriteDishes, searchedDishes, isSearching } =
      storeToRefs(product);
    const { getFavoritesProducts, doRating } = product;
    const { isSelected, numberProduct } = storeToRefs(orders);
    const { addProduct, deleteProduct, increment, decrement } = orders;
    return {
      favoriteDishes,
      getFavoritesProducts,
      isSelected,
      numberProduct,
      searchedDishes,
      isSearching,
      selectProduct(id, action) {
        action ? addProduct(id) : deleteProduct(id);
      },
      ratingProduct(id, stars) {
        doRating(id, stars);
      },
      increment(id, action) {
        action ? increment(id) : decrement(id);
      },
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
