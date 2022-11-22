<template>
  <div class="q-pa-none">
    <div class="q-gutter-y-md">
      <q-tabs
        v-model="tab"
        indicator-color="transparent"
        active-color="white"
        class="text-grey-5"
        shrink
        stretch
      >
        <q-tab name="most_sold" :label="$t(`index_tab.most_sold`)" />
        <q-tab name="food" :label="$t(`index_tab.food`)" />
        <q-tab name="combos" :label="$t(`index_tab.combos`)" />
        <q-tab
          name="favorite"
          :label="$t(`index_tab.favorite`)"
          v-if="isAutenticatedNow"
        />
      </q-tabs>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

import { useAuthStore } from "src/stores/auth";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const auth = new useAuthStore();
    const { isAutenticatedNow } = storeToRefs(auth);
    return {
      tab: ref("most_sold"),
      isAutenticatedNow,
    };
  },
};
</script>
