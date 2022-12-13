<template>
  <q-uploader
    :factory="uploadImage"
    label="Cargar imagen de producto"
    field-name="file"
    accept="image/*"
    :max-file-size="256000"
    max-files="1"
    color="secondary"
    flat
    bordered
    style="max-width: 300px"
  />
</template>
<script>
import { useProductsStore } from "src/stores/products";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const products = useProductsStore();
    const { uploadImage } = products;
    return {
      uploadImage,
    };
  },
});
</script>
