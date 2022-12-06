<template>
  <div class="q-pa-md q-gutter-md">
    <q-btn round @click="authActions()">
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
import { storeToRefs } from "pinia";
import { useAuthStore } from "src/stores/auth";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "AvatarIcon",

  props: {
    inicial: { type: String, required: false, default: "U" },
  },
  setup() {
    const auth = useAuthStore();
    const { isAutenticatedNow } = storeToRefs(auth);
    return {
      isAutenticatedNow,
      authActions() {
        if (!isAutenticatedNow.value) {
          this.$router.push({ path: "/auth/login" });
        }
      },
    };
  },
});
</script>
