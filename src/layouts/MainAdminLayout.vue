<template>
  <q-layout view="hHh lpR lFf">
    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="src/assets/icons/chef_hat.png" />
          </q-avatar>
          Gustó Administración
        </q-toolbar-title>
        <div>
          <avatar-icon-vue />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer bordered v-model="leftDrawerOpen" show-if-above :breakpoint="500">
      <q-scroll-area class="fit">
        <q-list padding class="menu-list">
          <q-item
            clickable
            v-ripple
            @click="router.push({ name: `adminProducts` })"
          >
            <q-item-section avatar>
              <q-icon name="restaurant_menu" />
            </q-item-section>

            <q-item-section> Gestión de productos </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="router.push({ name: `reports` })">
            <q-item-section avatar>
              <q-icon name="assignment" />
            </q-item-section>

            <q-item-section> Reportes de ventas </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="goHome">
            <q-item-section avatar>
              <q-icon name="store" />
            </q-item-section>

            <q-item-section> Tienda Gustó </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="drafts" />
            </q-item-section>

            <q-item-section> Drafts </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";

import AvatarIconVue from "src/components/AvatarIcon.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "src/stores/auth";
import { useQuasar } from "quasar";

export default {
  components: {
    AvatarIconVue,
  },
  beforeRouteEnter(to, from) {
    const auth = useAuthStore();
    if (!auth.isAutenticatedNow || !auth.isAdmin) {
      return { name: "notFound" };
    }
  },
  setup() {
    const leftDrawerOpen = ref(false);
    const router = useRouter();
    const $q = useQuasar();
    return {
      leftDrawerOpen,
      router,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      goHome() {
        $q.dialog({
          title: "Confirmar",
          message: `¿Desea salir de la página de administración?`,
          cancel: "Cancelar",
          ok: "Aceptar",
          persistent: true,
        }).onOk(() => {
          router.push({ name: `home` });
        });
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.menu-list .q-item {
  border-radius: 0 32px 32px 0;
}
</style>
