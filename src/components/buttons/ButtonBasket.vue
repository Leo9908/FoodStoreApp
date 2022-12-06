<template>
  <RouterLink to="buyout" style="text-decoration: inherit; color: inherit"
    ><q-btn round color="secondary" icon="shopping_basket">
      <q-badge color="red" floating transparent>
        {{ props.number }}
      </q-badge>
    </q-btn>
  </RouterLink>
</template>
<script>
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";

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
  components: { RouterLink },
});
</script>
