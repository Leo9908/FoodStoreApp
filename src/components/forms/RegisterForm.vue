<template>
  <div>
    <div>
      <q-card
        class="q-pa-md"
        flat
        bordered
        style="height: 400; max-width: 300px"
      >
        <q-card-section class="text-h5">Crear cuenta</q-card-section>
        <q-card-section>
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
              v-model="name"
              label="Nombre"
              :rules="[
                (val) => (val && val.length > 0) || `Por favor escriba algo`,
              ]"
              dense
            />
            <q-input
              v-model="last_name"
              label="Apellidos"
              :rules="[
                (val) => (val && val.length > 0) || `Por favor escriba algo`,
              ]"
              dense
            />
            <q-input
              v-model="email"
              type="email"
              label="Correo electrónico"
              :rules="[
                (val) => (val && val.length > 0) || `Por favor escriba algo`,
              ]"
              dense
            />
            <q-input
              v-model="password"
              label="Contraseña"
              :type="isPwd ? 'password' : 'text'"
              :rules="[
                (val) => (val && val.length > 0) || `Por favor escriba algo`,
                (val) =>
                  (val && val.length > 8) ||
                  `Debe contener al menos 8 caracteres`,
              ]"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                /> </template
            ></q-input>

            <q-toggle
              class="float-left q-mb-lg"
              v-model="accept"
              label="Acepto los terminos"
            />

            <div>
              <q-btn label="Registrar" type="submit" color="primary" />
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
          <div>
            ¿Ya tiene una cuenta?
            <RouterLink to="/auth/login">Iniciar sesión</RouterLink>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import { Notify } from "quasar";

import { useAuthStore } from "src/stores/auth";
import { RouterLink, useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();

    const auth = useAuthStore();
    const { registerUser } = auth;
    const name = ref(null);
    const last_name = ref(null);
    const email = ref(null);
    const password = ref(null);
    const accept = ref(false);

    return {
      router,
      name,
      last_name,
      email,
      password,
      accept,
      registerUser,
      isPwd: ref(true),
      async onSubmit() {
        if (accept.value !== true) {
          Notify.create({
            color: "warning",
            icon: "warning",
            message: "Debe aceptar los terminos",
          });
        } else {
          await registerUser(
            {
              name: name.value,
              last_name: last_name.value,
              user: email.value.substring(0, email.value.indexOf("@")),
              email: email.value,
              pass: password.value,
            },
            router
          );
        }
      },
      onReset() {
        name.value = null;
        last_name.value = null;
        email.value = null;
        password.value = null;
        accept.value = false;
      },
    };
  },
  components: { RouterLink },
});
</script>
