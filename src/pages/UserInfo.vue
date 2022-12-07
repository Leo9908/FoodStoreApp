<template>
  <q-page padding>
    <!-- content -->
    <div><basic-profile-info-vue /></div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

import BasicProfileInfoVue from "src/components/tables/BasicProfileInfo.vue";

export default defineComponent({
  // name: 'PageName',
  components: {
    BasicProfileInfoVue,
  },
});
</script>
