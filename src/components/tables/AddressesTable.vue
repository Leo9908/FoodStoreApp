<template>
  <div class="q-pa-md">
    <div class="q-pa-sm" align="right">
      <q-btn
        class="bg-grey-4"
        flat
        bordered
        icon="add"
        :label="$t(`addresses.actions.add`)"
        @click="$emit(`add`)"
      />
    </div>
    <q-table
      class="no-shadow q-px-sm q-mb-xl"
      :title="$t(`addresses.table.title`)"
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
import { useI18n } from "vue-i18n";

export default defineComponent({
  data() {
    const { t } = useI18n();
    return {
      columns: [
        {
          name: "alias",
          field: "alias",
          required: true,
          label: t("addresses.table.columns.alias"),
          align: "left",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "formatted",
          align: "left",
          label: t("addresses.table.columns.address"),
          field: "formatted",
        },
        {
          name: "apto",
          label: t("addresses.table.columns.apto"),
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
