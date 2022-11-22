<template>
  <div
    class="q-gutter-y-md full-height column"
    style="max-width: 400px"
    color="light"
  >
    <q-card class="my-card no-shadow">
      <q-card-section
        class="avatar-icon .col .col-md-2 row justify-center q-pb-xs"
      >
        <q-avatar
          :size="tabs == `edit` ? `100px` : `150px`"
          :font-size="tabs == `edit` ? `80px` : `120px`"
          color="primary"
          text-color="white"
        >
          {{ inicial }}
          <q-badge
            class="badge-edit absolute-bottom-right q-mt-xl q-pt-xl"
            floating
            color="transparent"
            align="bottom"
            v-show="tabs == `info`"
          >
            <q-btn
              class="q-mt-md"
              unelevated
              round
              size="12px"
              color="secondary"
              icon="edit"
              @click="[(tabs = `edit`), routerDialog.count++]"
            />
          </q-badge>
        </q-avatar>
      </q-card-section>
      <q-card-section class="profile-info .col .col-md-8 q-pa-xs">
        <q-tab-panels class="q-pb-xs" v-model="tabs">
          <q-tab-panel class="q-pb-xs" name="info">
            <q-card flat bordered class="my-card">
              <q-card-section>
                <div class="wellcome text-h5">
                  {{ $t("wellcome") }} {{ me.name }}
                </div>
              </q-card-section>

              <q-card-section class="wellcome wellcome-des q-pt-none">
                {{ $t("description") }}
              </q-card-section>

              <q-separator inset />

              <q-card-section class="wellcome wellcome-des">
                {{ $t("description2") }}</q-card-section
              >
            </q-card>
          </q-tab-panel>
          <q-tab-panel class="q-pa-none" name="edit">
            <q-card flat bordered class="my-card">
              <q-card-section class="q-pa-none">
                <!-- tabla con información -->
                <UserInfoVue />
              </q-card-section>
            </q-card>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
      <q-card-section
        class="logout .col .col-md-2 row justify-center vertical-bottom q-pt-none"
        v-show="tabs == `info`"
      >
        <q-btn
          color="white"
          text-color="black"
          label="Logout"
          vertical-bottom
          @click="singOut"
        />
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";

import { useAuthStore } from "stores/auth";
import { useRouterDialogStore } from "src/stores/router-dialog";
import { storeToRefs } from "pinia";

import UserInfoVue from "src/components/auth/UserInfo.vue";

export default defineComponent({
  name: "MainLayout",
  props: {
    inicial: { type: String, required: true },
  },
  components: {
    UserInfoVue,
  },
  created() {
    this.$bus.on("go-info", () => {
      this.tabs = "info";
    });
    this.$bus.on("go_back", (value) => {
      if (value == 1) {
        this.tabs = "info";
      }
    });
  },
  setup() {
    const auth = useAuthStore();
    //Asi se usan los actions en el store de Pinia
    const { singOut } = auth;
    const { me } = storeToRefs(auth);
    const routerDialog = useRouterDialogStore();
    return {
      singOut,
      me,
      tabs: ref("info"),
      routerDialog,
    };
  },
});
</script>
<style lang="scss" scoped>
.my-card {
  width: 100%;
}
</style>
