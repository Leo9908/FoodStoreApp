<template>
  <q-page
    class="fit row wrap justify-center items-start content-center q-mb-lg"
  >
    <food-card-vue v-for="d in dishes" v-bind:key="d" :dish="d" />
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
      this.getProducts();
    } catch (error) {
      console.log(error);
    }
  },
  setup() {
    const product = new useProductsStore();
    const { dishes } = storeToRefs(product);
    const { getProducts } = product;
    return {
      dishes,
      getProducts,
    };
  },
});
</script>
