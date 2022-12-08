<template>
  <div>
    <div style="height: 400; max-width: 300px">
      <q-card class="q-pa-md" flat bordered>
        <q-card-section class="text-h5">{{
          $t("login_card.login")
        }}</q-card-section>
        <q-card-section>
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
              v-model="nameuser"
              label="Your user name or email *"
              :rules="[
                (val) => (val && val.length > 0) || $t(`errors.emptyField`),
              ]"
            />
            <q-input
              v-model="password"
              label="Your password *"
              :type="isPwd ? 'password' : 'text'"
              :rules="[
                (val) => (val && val.length > 0) || $t(`errors.emptyField`),
              ]"
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
        <q-card-section>
          <router-link class="change_pass" to="/auth/change-password">{{
            $t("login_card.forgotten")
          }}</router-link>
        </q-card-section>
      </q-card>
      <div>
        <q-separator class="q-mt-lg q-mb-md" />
        <div>
          <q-btn
            color="grey"
            unelevated
            :label="$t(`login_card.createAccount`)"
            no-caps
            @click="router.push(`/auth/register`)"
          />
        </div>
      </div>
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
    const auth = useAuthStore();
    const { doLogin } = auth;
    const nameuser = ref(null);
    const password = ref(null);
    const { t } = useI18n();
    return {
      router,
      nameuser,
      password,
      isPwd: ref(true),
      async onSubmit() {
        try {
          await doLogin({
            usernameOrEmail: nameuser.value,
            password: password.value,
          });
          Notify.create({
            message: t("login_card.logOk"),
            color: "info",
          });
          router.back();
        } catch (error) {
          Notify.create({
            message: t("login_card.noCorrect"),
            color: "warning",
          });
        }
      },
      onReset() {
        nameuser.value = null;
        password.value = null;
      },
    };
  },
});
</script>
<style lang="scss">
.change_pass {
  text-decoration: none;
}
.change_pass:hover {
  text-decoration: underline;
}
</style>
