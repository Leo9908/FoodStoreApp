<template>
  <div class="q-pa-md">
    <q-table
      ref="tableRef"
      :grid="false"
      flat
      bordered
      class="q-px-sm"
      style="height: 450px"
      :title="ptitle"
      :rows="rows"
      :columns="columns"
      row-key="index"
      :virtual-scroll="scroll"
      :pagination="pagination"
      :filter="filter"
      :loading="loading"
      @request="onRequest"
    >
      <template v-slot:top-right>
        <div class="row q-gutter-md">
          <q-input
            class="col md-1"
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Buscar"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn
            outline
            class=".col-md md-2"
            :label="`Añadir ${props.ptype.name}`"
            icon="add"
            @click="add"
          ></q-btn>
        </div>
      </template>
      <template v-slot:body-cell-actions="scope">
        <q-td :props="scope" class="q-gutter-xs">
          <q-btn
            label="Editar"
            icon="edit"
            outline
            key="xs-1"
            v-model="scope.row"
            @click="edit(scope.row.id)"
          />
          <q-btn
            label="Eliminar"
            icon="delete"
            align="between"
            color="secondary"
            outline
            key="xs-2"
            v-model="scope.row"
            @click="confirm(scope.row.id)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref, toRef, toRefs, onMounted } from "vue";

export default {
  props: {
    pcolumns: { type: Array, required: true },
    prows: { type: Array, required: false },
    ptitle: { type: String, required: false },
    ptype: { type: Object, required: true },
    onRequest: { type: Function, required: false },
    loading: { type: Boolean, required: false, default: false },
    pagination: { type: Object, required: false },
    scroll: { type: Boolean, required: false, default: false },
  },

  setup(props, ctx) {
    const tableRef = ref();
    const filter = ref("");
    const rows = toRef(props, "prows");
    const { pcolumns } = toRefs(props);
    const columns = pcolumns.value;
    const $q = useQuasar();
    function confirm(id) {
      $q.dialog({
        title: "Confirmar",
        message: `¿Desea eliminar ${props.ptype.pronoun} ${props.ptype.name}?`,
        cancel: "Cancelar",
        ok: "Aceptar",
        persistent: true,
      }).onOk(() => {
        ctx.emit("click", id, true);
      });
    }
    onMounted(() => {
      // get initial data from server (1st page)
      tableRef.value.requestServerInteraction();
    });
    return {
      tableRef,
      props,
      columns,
      rows,
      filter,

      confirm,

      edit(id) {
        ctx.emit("select", id);
      },
      add() {
        ctx.emit("select");
      },
    };
  },
};
</script>

<style lang="sass">
.my-sticky-dynamic
  /* height or max-height is important */
  height: 410px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */
    background-color: #fff

  thead tr th
    position: sticky
    z-index: 1
  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
  thead tr:first-child th
    top: 0
</style>
