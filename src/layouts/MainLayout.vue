<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="header-index" elevated>
      <q-toolbar>
        <q-toolbar-title class="title text-h4 q-ml-none q-mt-xs q-pl-none row">
          <div>
            <q-img src="../assets/icon-chef.png" height="70px" width="140px" />
          </div>
        </q-toolbar-title>
        <LanguageSelect class="language" />
        <ButtonBasketVue :number="total" />
        <AvatarIcon :inicial="inicial" />
      </q-toolbar>
      <ProductsTabsVue class="float-center" />
    </q-header>
    <div class="q-pa-xs q-gutter-sm">
      <AuthDialogVue style="height: 0px" />
    </div>
    <section>
      <div>
        <carousel-index-vue class="carousel" />
      </div>
      <div class="row justify-center q-py-md">
        <SearchProductVue
          class="col-4"
          :style="isMobile ? `width: 220px` : `width: 500px`"
        />
      </div>
    </section>
    <FooterIndexVue class="absolute-bottom" />
    <q-page-container style="padding-top: 0px; padding-bottom: 150px">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

import LanguageSelect from "components/selects/LanguageSelect.vue";
import AvatarIcon from "components/AvatarIcon.vue";

import AuthDialogVue from "src/components/auth/AuthDialog.vue";
import ProductsTabsVue from "src/components/tabs/ProductsTabs.vue";
import FooterIndexVue from "src/components/loyouts/FooterIndex.vue";
import ButtonBasketVue from "src/components/buttons/ButtonBasket.vue";
import CarouselIndexVue from "src/components/CarouselIndex.vue";
import SearchProductVue from "src/components/inputs/SearchProduct.vue";

import { useAuthStore } from "stores/auth";
import { storeToRefs } from "pinia";

import { useOrdersStore } from "src/stores/orders";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "MainLayout",
  components: {
    AuthDialogVue,
    LanguageSelect,
    AvatarIcon,
    ProductsTabsVue,
    FooterIndexVue,
    ButtonBasketVue,
    SearchProductVue,
    CarouselIndexVue,
  },
  setup() {
    const auth = useAuthStore();
    const { inicial } = storeToRefs(auth);
    const order = useOrdersStore();
    const { total } = storeToRefs(order);
    const $q = useQuasar();
    return {
      inicial,
      search: ref(null),
      total,
      isMobile: $q.platform.is.mobile,
    };
  },
});
</script>
<style lang="scss">
.language {
  margin-right: 10px;
}
</style>
