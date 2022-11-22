<template>
  <q-card class="product my-card" bordered>
    <q-img class="img_food" :src="dish.imgUrl">
      <div v-if="isSelected" class="absolute-full text-h4 flex flex-center">
        <q-btn
          :ripple="false"
          flat
          class="absolute-left no-shadow"
          :icon="biDashLg"
          style="width: 50px"
          @click="
            [
              number > 1 ? decrement(dish.id) : number,
              number > 1 ? number-- : number,
            ]
          "
        />
        {{ number }}
        <q-btn
          :ripple="false"
          flat
          class="absolute-right no-shadow"
          :icon="biPlusLg"
          style="width: 50px"
          @click="
            [
              number < 20 ? increment(dish.id) : number,
              number < 20 ? number++ : number,
            ]
          "
        />
      </div>
    </q-img>

    <q-card-section class="q-pt-xs q-pb-none">
      <q-btn
        fab
        :color="colorBtn"
        @click="
          [
            insertRemoveProduct(),
            isSelected ? number++ : (number = 0),
            isSelected ? addProduct(dish.id) : deleteProduct(dish.id),
          ]
        "
        :icon="icon"
        class="absolute"
        style="top: 0; right: 12px; transform: translateY(-50%)"
      />

      <div class="row no-wrap items-center">
        <div class="col text-h6 ellipsis">
          {{ dish.name }}
        </div>
      </div>
      <div class="q-py-none" style="height: 50px">
        <q-rating class="vertical-top" v-model="stars" :max="5" size="32px" />
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="text-subtitle1">
        $ {{ dish.precio }}・{{ getType(dish.type) }}
      </div>
      <div class="text-caption text-grey" style="font-size: 16px">
        {{ dish.description }}
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
import { defineComponent, ref } from "vue";

import { biDashLg, biPlusLg } from "@quasar/extras/bootstrap-icons";

import { useOrdersStore } from "src/stores/orders";

export default defineComponent({
  name: `foodCard`,
  props: {
    dish: { type: Object, required: true },
  },
  data() {
    return {
      icon: "shopping_cart",
    };
  },
  setup() {
    const order = useOrdersStore();
    const { addProduct, deleteProduct, increment, decrement } = order;
    return {
      stars: ref(4),
      colorBtn: "secondary",
      isSelected: ref(false),
      number: ref(0),
      biDashLg,
      biPlusLg,
      addProduct,
      deleteProduct,
      increment,
      decrement,
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
      if (this.isSelected) {
        this.isSelected = false;
        this.colorBtn = `secondary`;
        this.icon = "shopping_cart";
      } else {
        this.isSelected = true;
        this.colorBtn = `negative`;
        this.icon = "done";
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
  box-shadow: none;
}
.img_food {
  width: 100%;
  height: 200px;
}
</style>
