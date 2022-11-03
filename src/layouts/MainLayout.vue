<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> {{ $t("nameSite") }} </q-toolbar-title>
        <LanguageSelect class="language" />
        <ButtonBasketVue />
        <AvatarIcon :inicial="getInicial" />
      </q-toolbar>
      <ProductsTabsVue class="float-left" />
    </q-header>
    <FooterIndexVue class="absolute-bottom" />
    <div>
      <carousel-index-vue class="carousel" />
    </div>
    <div class="q-pa-md q-gutter-sm">
      <AuthDialogVue style="height: 0px" />
    </div>
    <q-page-container class="q-mt-none q-pt-none" style="padding-top: 0px">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

import LanguageSelect from "components/selects/LanguageSelect.vue";
import AvatarIcon from "components/AvatarIcon.vue";
import AuthDialogVue from "src/components/auth/AuthDialog.vue";
import CarouselIndexVue from "src/components/CarouselIndex.vue";
import ProductsTabsVue from "src/components/tabs/ProductsTabs.vue";
import FooterIndexVue from "src/components/loyouts/FooterIndex.vue";
import ButtonBasketVue from "src/components/buttons/ButtonBasket.vue";

import { useAuthStore } from "stores/auth";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "MainLayout",
  components: {
    LanguageSelect,
    AvatarIcon,
    AuthDialogVue,
    CarouselIndexVue,
    ProductsTabsVue,
    FooterIndexVue,
    ButtonBasketVue,
  },
  setup() {
    const auth = new useAuthStore();
    const { getInicial } = storeToRefs(auth);
    return {
      getInicial,
    };
  },
});
</script>
<style lang="scss">
.language {
  margin-right: 10px;
}
.carousel {
  min-width: 100%;
  padding: 0px;
  padding-top: 120px;
}
</style>
