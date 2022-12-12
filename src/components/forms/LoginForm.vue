<template>
  <div>
    <div style="height: 400; max-width: 300px">
      <q-card class="q-pa-md" flat bordered>
        <q-card-section class="text-h5">Iniciar sesión</q-card-section>
        <q-card-section>
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
              v-model="nameuser"
              label="Nombre de usuario o correo"
              :rules="[
                (val) => (val && val.length > 0) || `Por favor escriba algo`,
              ]"
            />
            <q-input
              v-model="password"
              label="Contraseña"
              :type="isPwd ? 'password' : 'text'"
              :rules="[
                (val) => (val && val.length > 0) || `Por favor escriba algo`,
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
              <q-btn label="Iniciar sesión" type="submit" color="primary" />
              <q-btn
                label="Reiniciar"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </q-card-section>
        <q-card-section>
          <router-link class="change_pass" to="/auth/change-password">
            ¿Olvidaste tu contraseña?
          </router-link>
        </q-card-section>
      </q-card>
      <div>
        <q-separator class="q-mt-lg q-mb-md" />
        <div>
          <q-btn
            color="grey"
            unelevated
            label="Crear tu cuenta en Gustó"
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

import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const auth = useAuthStore();
    const { doLogin } = auth;
    const nameuser = ref(null);
    const password = ref(null);

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
