<template>
  <div class="auth-dialog q-pa-none q-gutter-sm">
    <q-dialog v-model="fullHeight" full-height @hide="restoreCount">
      <q-card
        class="column full-height"
        style="width: 300px; max-width: 500px"
        v-if="!isAutenticatedNow"
      >
        <q-card-section class="q-pb-xs">
          <q-tabs
            v-model="logintabs"
            dense
            class="text-grey"
            align="justify"
            narrow-indicator
          >
            <q-tab name="login" label="Login" />
            <q-tab name="register" label="Register" />
          </q-tabs>
        </q-card-section>

        <q-card-section class="col q-pt-none">
          <q-tab-panels v-model="logintabs" animated>
            <q-tab-panel name="login">
              <LoginFormVue />
            </q-tab-panel>
            <q-tab-panel class="q-pt-xs" name="register">
              <RegisterForm />
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>
      </q-card>
      <q-card
        class="column full-height"
        style="width: 300px; max-width: 500px"
        v-else
      >
        <EditProfileVue :inicial="inicial" />
        <q-card-section
          class="absolute-bottom z-top row justify-center q-pa-none"
          style="height: 40px; background-color: rgba(0, 0, 0, 0.4)"
          v-if="count > 0"
        >
          <q-btn
            class="go-back col vertical-top"
            @click="
              [
                this.$bus.emit(`go_back`, count),
                count > 0 ? routerDialog.count-- : routerDialog.count,
              ]
            "
            flat
            :icon="biArrowLeft"
          ></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";

import { biArrowLeft } from "@quasar/extras/bootstrap-icons";

import { computed } from "vue";

import LoginFormVue from "src/components/auth/LoginForm.vue";
import RegisterForm from "src/components/auth/RegisterForm.vue";
import EditProfileVue from "./EditProfile.vue";

import { useAuthStore } from "stores/auth";
import { useRouterDialogStore } from "stores/router-dialog";
import { storeToRefs } from "pinia";

export default defineComponent({
  components: {
    LoginFormVue,
    RegisterForm,
    EditProfileVue,
  },
  data() {
    return {
      fullHeight: ref(false),
    };
  },
  setup() {
    const auth = useAuthStore();
    const { isAutenticatedNow, inicial } = storeToRefs(auth);
    const routerDialog = useRouterDialogStore();
    const count = computed(() => routerDialog.count);
    const { restoreCount } = routerDialog;
    return {
      logintabs: ref("login"),
      isAutenticatedNow,
      inicial,
      biArrowLeft,
      routerDialog,
      count,
      restoreCount,
    };
  },
  created() {
    this.$bus.on("open-dialog", () => {
      this.fullHeight = ref(true);
    });
    this.$bus.on("close-dialog", () => {
      this.fullHeight = ref(false);
    });
    this.$bus.on("go-auth", () => {
      this.logintabs = "login";
    });
  },
});
</script>
<style lang="scss">
.go-back {
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 100%;
}
</style>
