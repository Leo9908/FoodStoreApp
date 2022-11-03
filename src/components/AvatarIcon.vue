<template>
  <div class="q-pa-md q-gutter-md">
    <q-btn round @click="openLoginDialog">
      <q-avatar
        size="42px"
        font-size="25px"
        color="secondary"
        text-color="white"
        >{{ inicial }}
      </q-avatar>
    </q-btn>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "AvatarIcon",

  props: {
    inicial: { type: String, required: false, default: "U" },
  },
  setup(props) {
    return {};
  },
  methods: {
    openLoginDialog() {
      this.$bus.emit("open-dialog");
    },
  },
});
</script>
