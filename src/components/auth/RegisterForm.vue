<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        v-model="name"
        label="Your name *"
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        v-model="last_name"
        label="Your last name *"
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        v-model="email"
        type="email"
        label="Your email *"
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        v-model="password"
        label="Your password *"
        :type="isPwd ? 'password' : 'text'"
        :rules="[
          (val) => val.length >= 5 || 'Please use more than 5 characters',
        ]"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          /> </template
      ></q-input>

      <q-toggle v-model="accept" label="I accept the license and terms" />

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
  </div>
</template>

<script>
import { ref } from "vue";

import { useQuasar } from "quasar";

import { useRegisterStore } from "src/stores/register";

export default {
  setup() {
    const register = new useRegisterStore();
    const { registerUser } = register;
    const name = ref(null);
    const last_name = ref(null);
    const email = ref(null);
    const password = ref(null);
    const accept = ref(false);
    const notify = new useQuasar();

    return {
      name,
      last_name,
      email,
      password,
      accept,
      registerUser,
      notify,
      isPwd: ref(true),
      onReset() {
        name.value = null;
        last_name.value = null;
        email.value = null;
        password.value = null;
        accept.value = false;
      },
    };
  },
  methods: {
    async onSubmit() {
      if (this.accept !== true) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "You need to accept the license and terms first",
        });
      } else {
        try {
          await this.registerUser({
            name: this.name,
            last_name: this.last_name,
            user: this.email.substring(0, this.email.indexOf("@")),
            email: this.email,
            pass: this.password,
          });
          this.$q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Submitted",
          });
        } catch (error) {
          console.log(error);
          this.notify.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: error.response.message,
          });
        }
      }
    },
  },
};
</script>
