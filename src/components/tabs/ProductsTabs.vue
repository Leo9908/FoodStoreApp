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
        <q-route-tab name="food" to="/" :label="$t(`index_tab.food`)" />
        <q-route-tab
          name="most_sold"
          to="/most-sold"
          :label="$t(`index_tab.most_sold`)"
        />
        <q-route-tab
          name="combos"
          to="/combos"
          :label="$t(`index_tab.combos`)"
        />
        <q-route-tab
          name="favorite"
          to="/favorite"
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
