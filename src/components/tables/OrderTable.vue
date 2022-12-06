<template>
  <div class="q-pa-md">
    <q-table
      :title="$t(`orders.table.label`)"
      :rows="orderTable"
      :columns="columns"
      row-key="name"
      binary-state-sort
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="amount" :props="props">
            {{ props.row.amount }}
            <q-popup-edit
              v-model.number="props.row.amount"
              buttons
              label-set="Save"
              label-cancel="Close"
              :validate="amountRangeValidation"
              @hide="amountRangeValidation"
              @save="
                (value, initialValue) =>
                  updateAmount(props.row.id, value, initialValue)
              "
              v-slot="scope"
            >
              <q-input
                type="number"
                v-model.number="scope.value"
                :hint="$t(`hints.range`, [1, 20])"
                :error="errorAmount"
                :error-message="errorMessageAmount"
                dense
                autofocus
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="price" :props="props">
            <div class="text-pre-wrap">{{ props.row.price }}</div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

import { useOrdersStore } from "src/stores/orders";
import { storeToRefs } from "pinia";

export default defineComponent({
  beforeCreate() {
    this.generateOrder();
  },
  data() {
    return {
      columns: [
        {
          name: "name",
          required: true,
          label: this.$t("orders.table.columns.product"),
          align: "left",
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "amount",
          align: "center",
          label: this.$t("orders.table.columns.amount"),
          field: "amount",
          sortable: true,
        },
        {
          name: "price",
          label: this.$t("orders.table.columns.price"),
          field: "price",
          sortable: true,
          style: "width: 10px",
        },
      ],
    };
  },
  setup() {
    const order = useOrdersStore();
    const { generateOrder } = order;
    const { orderTable } = storeToRefs(order);

    const errorAmount = ref(false);
    const errorMessageAmount = ref("");

    return {
      orderTable,
      generateOrder,
      updateAmount(productId, value, initialValue) {
        order.updateAmount(productId, value, initialValue);
      },
      errorAmount,
      errorMessageAmount,
    };
  },
  methods: {
    amountRangeValidation(val) {
      if (val < 1 || val > 20) {
        this.errorAmount = true;
        this.errorMessageAmount = this.$t("errors.range", [0, 20]);
        return false;
      }
      this.errorAmount = false;
      this.errorMessageAmount = "";
      return true;
    },
  },
});
</script>
