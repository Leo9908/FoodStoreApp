<template>
  <q-page padding>
    <!-- content -->
    <div :class="[isDesktop ? `q-ma-xl` : `q-ma-sm`, `q-pb-md`]">
      <q-card class="q-pb-md" bordered flat>
        <div class="text-h5 q-ma-sm" style="margin-left: 20px">
          {{ isEditing ? "Edición de productos" : "Nuevo producto" }}
        </div>
        <form-vue-vue
          class="q-gutter-md"
          :data="inputs"
          @select="editAddProduct"
        >
          <template v-slot:left>
            <div class="q-gutter-sm" style="margin: 20px">
              <ProductCardVue :product="product" :isEditing="true" />
              <UploaderVueVue @add="uploadImgProduct">
                <template v-slot:>
                  <!-- Aquí debe ir la carta para que se muestre la imagen cargada -->
                </template>
              </UploaderVueVue>
              <!-- //aqui va la carta del producto -->
            </div>
          </template>
          <template v-slot:select>
            <div>
              <q-toggle v-model="onSales" />¿Desesa poner el producto en venta?
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

import { ref } from "vue";

import { useProductsStore } from "src/stores/products";

import ProductCardVue from "src/components/cards/ProductCard.vue";
import UploaderVueVue from "src/components/uploader/UploaderVue.vue";

import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

export default {
  // name: 'PageName',
  components: {
    FormVueVue,
    ProductCardVue,
    UploaderVueVue,
  },
  props: {
    id: { type: Number, required: false },
  },
  beforeCreate() {
    if (this.exitProduct(this.id)) {
      this.product = Object.assign({}, this.getProductById(this.id));
      this.onSales = this.product.onSale;
    }
    this.$bus.on("updated", (data) => {
      this.product.name = data[0].value;
      this.product.price = data[1].value;
      this.product.description = data[2].value;
    });
  },
  beforeRouteLeave(to, from, next) {
    if (this.isSave == false) {
      this.$q
        .dialog({
          title: "Confirmar",
          message: "¿Desea salir sin guardar el producto?",
          cancel: "Cancelar",
          ok: "Aceptar",
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
          label: "Nombre",
          name: "name",
          value: this.product.name ? this.product.name : null,
          rules: [(val) => !!val || "Campo requerido"],
        },
        {
          index: 1,
          label: "Precio",
          name: "price",
          value: this.product.price ? this.product.price : null,
          rules: [
            (val) => !!val || "Campo requerido",
            (val) => val > 0 || `Por favor entre un precio real`,
          ],
        },
        {
          index: 2,
          label: "Descripción",
          name: "description",
          value: this.product.description ? this.product.description : null,
          rules: [
            (val) => !!val || "Campo requerido",
            (val) =>
              val.length <= 110 || "Por favor, use un máximo de 110 caracteres",
          ],
        },
      ],
    };
    return {
      inputs,
    };
  },
  setup(props) {
    const router = useRouter();
    const products = useProductsStore();
    const { getProductById, exitProduct, imgServer } = storeToRefs(products);
    const { updateProduct, uploadImage } = products;
    const product = ref({});
    const $q = useQuasar();
    const isEditing = props.id != undefined ? true : false;
    const isSave = ref(false);
    const filename = ref(null);
    return {
      router,
      getProductById,
      exitProduct,
      imgServer,
      updateProduct,
      uploadImage,
      product,
      filename,

      isMobile: $q.platform.is.mobile,
      isDesktop: $q.platform.is.desktop,
      onSales: ref(false),
      isEditing,
      isSave,
    };
  },
  methods: {
    uploadImgProduct(filename) {
      if (filename != null) {
        this.filename = filename;
        this.product.imgUrl = this.imgServer + filename;
      }
    },
    editAddProduct(data) {
      if (data != undefined) {
        this.isSave = true;
        const edited = {
          id: this.product.id,
          name: data[0].value,
          price: data[1].value,
          description: data[2].value,
          onSale: this.onSales,
          //para probar nada mas
          imgUrl: this.imgServer + this.filename,
        };
        this.updateProduct(edited, this.router);
      } else {
        Notify.create({
          color: "warning",
          icon: "warning",
          message: "Por favor agregue una imagen al producto",
        });
      }
    },
  },
};
</script>
