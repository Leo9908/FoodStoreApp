<template>
  <q-card class="my-card">
    <q-img class="img_food" :src="dish.imgUrl" />

    <q-card-section>
      <q-btn
        fab
        :color="colorBtn"
        @click="insertRemoveProduct()"
        :icon="icon"
        class="absolute"
        style="top: 0; right: 12px; transform: translateY(-50%)"
      />

      <div class="row no-wrap items-center">
        <div class="col text-h6 ellipsis">
          {{ dish.name }}
        </div>
      </div>

      <q-rating v-model="stars" :max="5" size="32px" />
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="text-subtitle1">
        $ {{ dish.precio }}・{{ getType(dish.type) }}
      </div>
      <div class="text-caption text-grey">
        {{ dish.description }}
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
import { ref } from "vue";
import { defineComponent } from "vue";

import { useProductsStore } from "src/stores/products";

export default defineComponent({
  name: `foodCard`,
  props: {
    dish: { type: Object, required: true },
  },
  data() {
    return {
      colorBtn: "secondary",
      icon: "shopping_cart",
    };
  },
  setup() {
    const products = new useProductsStore();
    const { setProduct, removeProduct, removeAllById } = products;
    return {
      products,
      stars: ref(4),
      setProduct,
      removeProduct,
      removeAllById,
    };
  },
  methods: {
    getType(num) {
      switch (num) {
        case 1:
          return `${this.$t(`products.breakfast`)}`;
        case 2:
          return `${this.$t(`products.lunch`)}`;
        case 3:
          return `${this.$t(`products.dinner`)}`;
        case 4:
          return `${this.$t(`products.garnish`)}`;
        case 5:
          return `${this.$t(`products.fast_food`)}`;
        case 6:
          return `${this.$t(`products.canned_food`)}`;
        case 7:
          return `${this.$t(`products.side_dish`)}`;
        default:
          return `${this.$t(`products.breakfast`)}`;
      }
    },
    /**
     * This method allows you to add a product to the order
     */
    insertRemoveProduct() {
      if (this.colorBtn === "secondary") {
        this.colorBtn = "negative";
        this.icon = "done";
        this.setProduct(this.dish);
      } else {
        this.colorBtn = "secondary";
        this.icon = "shopping_cart";
        this.removeAllById(this.dish.id);
      }
    },
  },
});
</script>
<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 300px;
  max-height: 400px;
  min-height: 400px;
  margin: 5px;
}
.img_food {
  width: 100%;
  height: 200px;
}
</style>
