<template>
  <div class="q-pa-md">
    <q-table
      class="no-shadow q-px-sm"
      :title="$t(`addresses.table.title`)"
      :rows="rows"
      :columns="columns"
      row-key="alias"
      binary-state-sort
      bordered
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="alias" :props="props">
            {{ props.row.alias }}
            <q-popup-edit v-model="props.row.alias" v-slot="scope">
              <q-input v-model="scope.value" dense autofocus counter />
            </q-popup-edit>
          </q-td>
          <q-td key="formatted" :props="props">
            {{ props.row.formatted }}
            <q-popup-edit
              v-model="props.row.formatted"
              title="Update formatted"
              buttons
              v-slot="scope"
            >
              <q-input type="textarea" v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="apto" :props="props">
            <div class="text-pre-wrap">{{ props.row.apto }}</div>
            <q-popup-edit v-model="props.row.apto" v-slot="scope">
              <q-input type="textarea" v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="action" :props="props">
            <div class="text-pre-wrap">
              <q-btn
                flat
                round
                size="12px"
                icon="chevron_right"
                @click="editAddress(props.row.id)"
              />
            </div>
          </q-td>
        </q-tr>
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
          required: true,
          label: t("addresses.table.columns.alias"),
          align: "left",
          field: (row) => row.name,
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
        {
          name: "action",
          field: "action",
          style: "width: 20px",
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
  methods: {
    editAddress(id) {
      this.$emit("select", id);
    },
  },
});
</script>
