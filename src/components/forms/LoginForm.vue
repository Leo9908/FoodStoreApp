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
              :label="$t(`login_card.fields.user`)"
              :rules="[
                (val) => (val && val.length > 0) || $t(`errors.emptyField`),
              ]"
            />
            <q-input
              v-model="password"
              :label="$t(`login_card.fields.pass`)"
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
            <div class="q-gutter-sm">
              <q-btn
                :label="$t(`login_card.login`)"
                type="submit"
                color="primary"
              />
              <q-btn
                :label="$t(`buttons_labels.reset`)"
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
        await doLogin(
          {
            usernameOrEmail: nameuser.value,
            password: password.value,
          },
          t,
          router
        );
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
