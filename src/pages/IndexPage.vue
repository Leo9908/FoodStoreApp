<template>
  <q-page padding>
    <div class="index flex flex-center q-mb-md">
      <div v-for="d in products" :key="d">
        <product-card-vue
          class="example-cell"
          :product="d"
          :selected="isSelected(d.id)"
          :amount="numberProduct(d.id)"
          @add="selectProduct"
          @select="ratingProduct"
          @increment="increment"
        />
      </div>
    </div>
    <div class="index flex flex-center q-mb-md">
      <q-card
        v-if="
          onSaleDishes.length == 0 ||
          (isSearching && searchedDishes.length == 0)
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
      this.getOnSaleProducts();
    } catch (error) {
      console.log(error);
    }
  },
  setup() {
    const product = useProductsStore();
    const orders = useOrdersStore();
    const { onSaleDishes, searchedDishes, isSearching } = storeToRefs(product);
    const { getOnSaleProducts, doRating, downloadImages } = product;
    const { isSelected, numberProduct } = storeToRefs(orders);
    const { addProduct, deleteProduct, increment, decrement } = orders;
    return {
      downloadImages,

      onSaleDishes,
      getOnSaleProducts,
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
      return this.onSaleDishes;
    },
  },
});
</script>
