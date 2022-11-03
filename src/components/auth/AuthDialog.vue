<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="fullHeight" full-height>
      <q-card
        class="column full-height"
        style="width: 300px"
        v-if="!isAutenticatedNow"
      >
        <q-card-section>
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
            <q-tab-panel name="register">
              <RegisterForm />
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>
      </q-card>
      <q-card class="column full-height" style="width: 300px" v-else>
        <EditProfileVue :inicial="getInicial" />
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";

import LoginFormVue from "src/components/auth/LoginForm.vue";
import RegisterForm from "src/components/auth/RegisterForm.vue";
import EditProfileVue from "./EditProfile.vue";

import { useAuthStore } from "stores/auth";
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
    const auth = new useAuthStore();
    const { isAutenticatedNow, getInicial } = storeToRefs(auth);
    return {
      logintabs: ref("login"),
      isAutenticatedNow,
      getInicial,
    };
  },
  created() {
    this.$bus.on("open-dialog", () => {
      this.fullHeight = ref(true);
    });
    this.$bus.on("close-dialog", () => {
      this.fullHeight = ref(false);
    });
  },
});
</script>
