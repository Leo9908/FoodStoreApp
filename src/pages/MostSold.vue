<template>
  <q-page padding class="index flex flex-center q-mb-md">
    <div>
      <div v-for="d in products" :key="d">
        <product-card-vue
          :product="d"
          :selected="isSelected(d.id)"
          :amount="numberProduct(d.id)"
          @add="selectProduct"
          @select="ratingProduct"
          @increment="increment"
        />
      </div>
    </div>
    <div class="index flex flex-center q-ma-md">
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
            ? `Lo sentimos. No hay productos
             en esta sección, por favor regrese
             más tarde. Gracias`
            : `No hay coincidencias`
        }}</q-card-section>
      </q-card>
    </div>
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
      this.getMostSoldProducts();
    } catch (error) {
      console.log(error);
    }
  },
  setup() {
    const product = useProductsStore();
    const orders = useOrdersStore();
    const { mostSoldDishes, searchedDishes, isSearching } =
      storeToRefs(product);
    const { getMostSoldProducts, doRating } = product;
    const { isSelected, numberProduct } = storeToRefs(orders);
    const { addProduct, deleteProduct, increment, decrement } = orders;
    return {
      mostSoldDishes,
      getMostSoldProducts,
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
      return this.mostSoldDishes;
    },
  },
});
</script>
