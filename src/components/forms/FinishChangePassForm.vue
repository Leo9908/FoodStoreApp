<template>
  <div>
    <div style="height: 400; max-width: 300px">
      <q-card class="q-pa-md" flat bordered>
        <q-card-section class="text-h5">{{
          $t("login_card.required")
        }}</q-card-section>
        <q-card-section>
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
              v-model="password"
              label="Your password *"
              :type="isPwd ? 'password' : 'text'"
              :rules="[
                (val) => (val && val.length > 0) || $t(`errors.emptyField`),
                (val) => val.length >= 8 || $t(`errors.digites`, [8]),
              ]"
              dense
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                /> </template
            ></q-input>
            <q-input
              v-model="confirmPassword"
              label="Confirm your password *"
              :type="isPwd ? 'password' : 'text'"
              :rules="[
                (val) => (val && val.length > 0) || $t(`errors.emptyField`),
                (val) => val.length >= 8 || $t(`errors.digites`, [8]),
                (val) => val == password || $t(`login_card.noEquals`),
              ]"
              dense
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                /> </template
            ></q-input>
            <div>
              <q-btn label="Submit" type="submit" color="primary" />
              <q-btn
                label="Reset"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script>
import { Notify } from "quasar";
import { useAuthStore } from "src/stores/auth";
import { defineComponent, ref, toRefs } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  props: {
    token: { type: String, required: true },
  },
  setup(props, ctx) {
    const password = ref(null);
    const confirmPassword = ref(null);
    const auth = useAuthStore();
    const { changePassword } = auth;
    const { t } = useI18n();
    const { token } = toRefs(props);
    return {
      password,
      confirmPassword,
      isPwd: ref(true),
      async onSubmit() {
        try {
          await changePassword(
            password.value,
            confirmPassword.value,
            token.value
          );
          Notify.create({
            color: "info",
            message: t("login_card.changedPass"),
          });
          ctx.emit("select");
        } catch (error) {
          console.log(error);
          Notify.create({
            color: "warning",
            message: t("login_card.noEquals"),
          });
        }
      },
      onReset() {
        password.value = null;
        confirmPassword.value = null;
      },
    };
  },
});
</script>
