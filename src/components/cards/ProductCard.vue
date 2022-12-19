<template>
  <q-card class="my-card" :style="isSelected ? 'transform: scale(0.95);' : ''">
    <q-img :src="productInfo.imgUrl">
      <div v-if="isSelected" class="absolute-full text-h4 flex flex-center">
        <q-btn
          round
          flat
          size="20px"
          class="absolute"
          icon="chevron_right"
          style="right: 2px; top: 35%"
          @click="[changeAmount(true), number < 20 ? number++ : number]"
        />
        {{ number }}
        <q-btn
          round
          flat
          size="20px"
          class="absolute"
          icon="chevron_left"
          style="left: 2px; top: 35%"
          @click="[changeAmount(false), number > 1 ? number-- : number]"
        />
      </div>
      <slot name="uploader"></slot>
    </q-img>

    <q-card-section>
      <q-btn
        fab
        :disable="isEdit"
        :color="isSelected ? `secondary` : `primary`"
        :icon="isSelected ? `task_alt` : `shopping_basket`"
        class="absolute"
        style="top: 0; right: 12px; transform: translateY(-50%)"
        @click="
          [
            (isSelected = !isSelected),
            selectProduct(),
            isSelected ? number++ : (number = 0),
          ]
        "
      />
      <div class="row no-wrap items-center">
        <div class="col text-h6 ellipsis">{{ productInfo.name }}</div>
      </div>

      <q-rating
        :disable="isEdit"
        v-model="stars"
        :max="5"
        size="32px"
        no-reset
        icon="star_border"
        icon-selected="star"
        icon-half="star_half"
        no-dimming
        @click="rating"
      />
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="text-subtitle1">$・{{ productInfo.price }}</div>
      <div class="text-caption text-grey">
        {{ productInfo.description }}
      </div>
    </q-card-section>
    <q-badge
      color="transparent"
      rounded
      transparent
      class="q-pa-none q-mr-sm q-mt-sm"
      floating
    >
      <q-btn
        v-if="IsAdmin"
        class="q-pa-none q-ma-none"
        style="width: 20px; height: 30px"
        flat
        icon="more_vert"
        color="withe"
      >
        <q-menu :offset="[80, 5]">
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup @click="edit">
              <q-item-section>Editar</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="clear">
              <q-item-section>Eliminar</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-badge>
  </q-card>
</template>

<script>
import { defineComponent, ref, toRef } from "vue";

export default defineComponent({
  components: {
    // ProductMenuVue,
  },
  props: {
    product: {
      type: Object,
      required: false,
      default() {
        return {
          id: null,
          name: "Nombre",
          price: "200",
          description: "Descripción del producto",
          imgUrl: "https://cdn.quasar.dev/img/chicken-salad.jpg",
          rating: 3.5,
        };
      },
    },
    selected: { type: Boolean, required: false, default: false },
    amount: { type: Number, required: false, default: 0 },
    isEditing: { type: Boolean, required: false, default: false },
    isAdmin: { type: Boolean, required: false, default: false },
  },
  setup(props, ctx) {
    const productInfo = toRef(props, "product");
    const isSelected = ref(props.selected);
    const number = ref(props.amount);
    const stars = ref(props.product.rating ? props.product.rating : 3.5);
    const isEdit = toRef(props, "isEditing");
    const IsAdmin = toRef(props, "isAdmin");
    return {
      isEdit,
      IsAdmin,
      productInfo,
      stars,
      isSelected,
      number,
      selectProduct() {
        ctx.emit("add", props.product.id, isSelected.value);
      },
      rating() {
        ctx.emit("select", props.product.id, stars.value);
      },
      changeAmount(action) {
        ctx.emit("increment", props.product.id, action);
      },
      edit() {
        ctx.emit("edit", productInfo.value.id);
      },
      clear() {
        ctx.emit("clear", productInfo.value.id);
      },
    };
  },
});
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 300px
  transition: transform .28s, background-color .28s
</style>
