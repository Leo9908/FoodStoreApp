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
      </q-tabs>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      tab: ref("most_sold"),
    };
  },
};
</script>
