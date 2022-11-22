<template>
  <div>
    <q-input
      dense
      rounded
      outlined
      type="search"
      v-model="search"
      :label="$t(`index.search`)"
    >
      <template v-slot:append> <q-icon name="search" /> </template
    ></q-input>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    return {
      search: ref(null),
    };
  },
});
</script>
