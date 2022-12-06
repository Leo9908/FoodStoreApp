<template>
  <q-page padding>
    <!-- content -->
    <FinishChangePassFormVue />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

import FinishChangePassFormVue from "src/components/forms/FinishChangePassForm.vue";

export default defineComponent({
  // name: 'PageName',
  components: {
    FinishChangePassFormVue,
  },
});
</script>
