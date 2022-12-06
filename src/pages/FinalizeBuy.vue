<template>
  <q-page padding>
    <section class="row justify-between">
      <section class="col">
        <order-table-vue />
      </section>
      <section class="col">
        <send-order-vue />
      </section>
    </section>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

import OrderTableVue from "src/components/tables/OrderTable.vue";
import SendOrderVue from "src/components/forms/SendOrder.vue";

export default defineComponent({
  components: {
    OrderTableVue,
    SendOrderVue,
  },
});
</script>
