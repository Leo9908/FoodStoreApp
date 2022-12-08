<template>
  <div>
    <div style="height: 400; max-width: 300px">
      <q-card class="q-pa-md" flat bordered>
        <q-card-section class="text-h5">{{
          $t("login_card.changePassoword")
        }}</q-card-section>
        <q-card-section class="on-left" align="left">
          {{ $t("login_card.infoChangePass") }}
        </q-card-section>
        <q-card-section>
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
              v-model="nameuserOrEmail"
              label="Your user name or email *"
              :rules="[
                (val) => (val && val.length > 0) || $t(`errors.emptyField`),
              ]"
            />
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
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const nameuserOrEmail = ref(null);
    const auth = useAuthStore();
    const { sendEmailChangePassword } = auth;
    const { t } = useI18n();
    return {
      nameuserOrEmail,
      router,
      async onSubmit() {
        try {
          await sendEmailChangePassword(nameuserOrEmail.value);
          Notify.create({
            color: "info",
            message: t("login_card.sendingEmail"),
          });
          router.push({ path: "/auth/login" });
        } catch (error) {
          console.log(error);
          Notify.create({
            color: "warning",
            message: t("login_card.errorSending"),
          });
        }
      },
      onReset() {
        nameuserOrEmail.value = null;
      },
    };
  },
});
</script>
