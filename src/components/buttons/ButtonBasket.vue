<template>
  <q-btn round color="secondary" icon="shopping_basket">
    <q-badge color="red" floating transparent>
      {{ props.number }}
    </q-badge>
  </q-btn>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ButtonIndex",
  props: {
    number: { type: Number, required: false, default: 0 },
  },
  setup(props) {
    return {
      props,
    };
  },
});
</script>
