<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        v-model="nameuser"
        :label="$t(`login_card.fields.user`)"
        :rules="[(val) => (val && val.length > 0) || `Por favor escriba algo`]"
      />
      <q-input
        v-model="password"
        :label="$t(`login_card.fields.pass`)"
        :type="isPwd ? 'password' : 'text'"
        :rules="[(val) => (val && val.length > 0) || `Por favor escriba algo`]"
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
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useAuthStore } from "stores/auth";

export default {
  setup() {
    const notify = useQuasar();
    const auth = useAuthStore();
    const nameuser = ref(null);
    const password = ref(null);

    return {
      nameuser,
      password,
      isPwd: ref(true),
      auth,
      notify,
      onReset() {
        nameuser.value = null;
        password.value = null;
      },
    };
  },
  methods: {
    async onSubmit() {
      try {
        await this.auth.doLogin({
          usernameOrEmail: this.nameuser,
          password: this.password,
        });
        this.notify.notify({
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
          message: error.response.data.message,
        });
      }
    },
    closedDialog() {
      this.$bus.emit("close-dialog");
    },
  },
};
</script>
