<template>
  <q-page padding>
    <!-- content -->
    <div :class="[isDesktop ? `q-ma-xl` : `q-ma-sm`, `q-pb-md`]">
      <q-card bordered flat>
        <div class="text-h5 q-ma-sm" style="margin-left: 20px">
          {{
            isEditing
              ? $t("admin.products.edit.title")
              : $t("admin.products.add.title")
          }}
        </div>
        <form-vue-vue
          class="q-gutter-md"
          :data="inputs"
          @select="editAddProduct"
        >
          <template v-slot:left>
            <FoodCardVue style="margin: 20px" :dish="product" />
          </template>
          <template v-slot:select>
            <q-select
              options-dense
              v-model="accepted"
              :options="options"
              label="Tipo"
            />
            <div>
              <q-toggle v-model="onSales" />Desesa poner el producto en venta
            </div>
          </template>
        </form-vue-vue>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { storeToRefs } from "pinia";

import FormVueVue from "src/components/forms/FormVue.vue";
import FoodCardVue from "src/components/cards/FoodCard.vue";

import { ref } from "vue";

import { useProductsStore } from "src/stores/products";

import { useI18n } from "vue-i18n";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

export default {
  // name: 'PageName',
  components: {
    FormVueVue,
    FoodCardVue,
  },
  props: {
    id: { type: Number, required: false },
  },
  beforeCreate() {
    if (this.exitProduct(this.id)) {
      this.product = Object.assign({}, this.getProductById(this.id));
      this.type = this.getProductType(this.product.type, this.t);
      this.onSales = this.product.onSale;
    }
    this.options = this.getAllTypes(this.t);
    this.$bus.on("updated", (data) => {
      this.product.name = data[0].value;
      this.product.precio = data[1].value;
      this.product.description = data[2].value;
    });
  },
  beforeRouteLeave(to, from, next) {
    if (this.isSave == false) {
      this.$q
        .dialog({
          title: this.t("admin.products.table.actions.confirm"),
          message: this.t("admin.products.table.actions.save"),
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          next();
        })
        .onCancel(() => {
          next(false);
        });
    } else {
      next();
    }
  },
  data() {
    const inputs = {
      inputs: [
        {
          index: 0,
          label: "Name",
          name: "name",
          value: this.product.name ? this.product.name : null,
          rules: [(val) => !!val || "Field is required"],
        },
        {
          index: 1,
          label: "Price",
          name: "price",
          value: this.product.precio ? this.product.precio : null,
          rules: [(val) => !!val || "Field is required"],
        },
        {
          index: 2,
          label: "Description",
          name: "description",
          value: this.product.description ? this.product.description : null,
          rules: [
            (val) => !!val || "Field is required",
            (val) => val.length <= 110 || "Please use maximum 110 characters",
          ],
        },
      ],
    };
    return {
      inputs,
      accepted: ref({
        label: this.type ? this.type : this.options[0].label,
        value: this.product.type ? this.product.type : this.options[0].value,
      }),
    };
  },
  setup(props) {
    const router = useRouter();
    const products = useProductsStore();
    const { getProductById, exitProduct, getAllTypes, getProductType } =
      storeToRefs(products);
    const { updateProduct } = products;
    const product = ref({});
    const type = ref(null);
    const options = ref([]);
    const { t } = useI18n();
    const $q = useQuasar();
    const isEditing = props.id != undefined ? true : false;
    const isSave = ref(false);
    return {
      router,
      getProductById,
      exitProduct,
      getAllTypes,
      getProductType,
      updateProduct,
      product,
      type,
      options,
      t,
      isMobile: $q.platform.is.mobile,
      isDesktop: $q.platform.is.desktop,
      onSales: ref(false),
      isEditing,
      isSave,
    };
  },
  methods: {
    editAddProduct(data) {
      if (data != undefined) {
        this.isSave = true;
        const edited = {
          id: this.product.id,
          name: data[0].value,
          precio: data[1].value,
          description: data[2].value,
          type: this.accepted.value,
          onSale: this.onSales,
          //para probar nada mas
          imgUrl: "src/assets/icons/chef_hat.png",
        };
        this.updateProduct(edited, this.t, this.router);
      }
    },
  },
  watch: {
    accepted(newVal, oldVal) {
      this.product.type = newVal.value;
    },
  },
};
</script>
