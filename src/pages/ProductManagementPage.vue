<template>
  <q-page padding>
    <!-- content -->
    <table-vue-vue
      :pcolumns="columns"
      :prows="rows"
      @select="editAddProduct"
      @click="deleteProduct"
      ptitle="Productos"
      :ptype="{ pronoun: `el`, name: `producto` }"
      :loading="loading"
      :onRequest="onRequest"
      :pagination="pagination"
    />
  </q-page>
</template>

<script>
import { useProductsStore } from "src/stores/products";

import TableVueVue from "src/components/tables/TableVue.vue";

import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { ref } from "vue";

export default {
  // name: 'PageName',
  components: {
    TableVueVue,
  },
  beforeCreate() {
    this.getAllProducts();
  },
  setup() {
    const router = useRouter();
    const product = useProductsStore();
    const { getAllProducts } = product;
    const { products } = storeToRefs(product);
    const rows = ref([]);
    const loading = ref(null);
    const columns = [
      {
        name: "name",
        required: true,
        label: "Nombre",
        align: "left",
        field: (row) => row.name,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "price",
        align: "center",
        label: "Precio",
        field: "price",
        sortable: true,
      },
      {
        name: "onSale",
        label: "¿En venta?",
        field: (row) => (row.onSale ? "Sí" : "No"),
      },
      {
        name: "rating",
        label: "Calificación",
        field: (row) => Math.round(row.rating),
      },
      {
        name: "actions",
        label: "Acciones",
        field: "actions",
        align: "right",
      },
    ];
    /**
     * Esto es para la paginación
     */
    const pagination = ref({
      sortBy: "id",
      descending: false,
      page: 1,
      rowsPerPage: 3,
      rowsNumber: 10,
    });
    // emulate ajax call
    // SELECT * FROM ... WHERE...LIMIT...
    function fetchFromServer(startRow, count, filter, sortBy, descending) {
      product.getAllProducts(startRow, count, sortBy, descending, filter);
      const data = products.value;
      console.log(data);
      // handle sortBy
      return data.slice(startRow, startRow + count);
    }

    function getRowsNumberCount(filter) {
      if (!filter) {
        return products.length;
      }
      let count = 0;
      products.forEach((treat) => {
        if (treat.name.includes(filter) || treat.description.includes(filter)) {
          ++count;
        }
      });
      return count;
    }
    function onRequest(props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      const filter = props.filter;

      loading.value = true;

      // emulate server

      // update rowsCount with appropriate value
      pagination.value.rowsNumber = getRowsNumberCount(filter);

      // get all rows if "All" (0) is selected
      const fetchCount =
        rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage;

      // calculate starting row of data
      const startRow = (page - 1) * rowsPerPage;

      // fetch data from "server"
      const returnedData = fetchFromServer(
        startRow,
        fetchCount,
        filter,
        sortBy,
        descending
      );

      // clear out existing data and add new
      rows.value.splice(0, rows.value.length, ...returnedData);

      // don't forget to update local pagination object
      pagination.value.page = page;
      pagination.value.rowsPerPage = rowsPerPage;
      pagination.value.sortBy = sortBy;
      pagination.value.descending = descending;

      // ...and turn of loading indicator
      loading.value = false;
    }
    return {
      getAllProducts,
      editAddProduct(id) {
        if (id != undefined) {
          router.push({ name: "editProduct", params: { id: id } });
        } else {
          router.push({ name: "addProduct" });
        }
      },
      deleteProduct(id, r) {
        if (id != undefined && r == true) {
          product.delete(id, true);
        }
      },
      columns,
      rows,
      products,
      loading,
      onRequest,
      pagination,
    };
  },
};
</script>
