<template>
  <div class="q-pa-md">
    <div class="q-pa-sm" align="right">
      <q-btn
        class="bg-grey-4"
        flat
        bordered
        icon="add"
        label="Agregar dirección"
        @click="$emit(`add`)"
      />
    </div>
    <q-table
      class="no-shadow q-px-sm q-mb-xl"
      title="Sus direcciones"
      :rows="rows"
      :columns="columns"
      row-key="alias"
      bordered
      selection="single"
    >
      <template v-slot:body-selection="scope">
        <q-btn
          flat
          round
          size="10px"
          icon="arrow_forward_ios"
          @click="$emit(`select`, scope.row.id)"
        />
      </template>
    </q-table>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  data() {
    return {
      columns: [
        {
          name: "alias",
          field: "alias",
          required: true,
          label: "Alias",
          align: "left",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "formatted",
          align: "left",
          label: "Dirección",
          field: "formatted",
        },
        {
          name: "apto",
          label: "Apartamento",
          field: "apto",
          style: "width: 150px",
          align: "left",
        },
      ],
    };
  },
  props: {
    rows: { type: Array, required: true },
  },
  setup() {
    return {};
  },
});
</script>
