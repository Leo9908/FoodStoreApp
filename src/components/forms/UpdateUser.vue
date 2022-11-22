<template>
  <q-form @submit="updateUser">
    <q-markup-table class="no-shadow">
      <tbody>
        <tr>
          <td class="text-left">{{ $t("edit_profile.name") }}</td>
          <td class="text-right">
            {{ me.name }}
            <q-popup-edit v-model="props.me.name" auto-save v-slot="scope">
              <q-input v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </td>
        </tr>
        <tr>
          <td class="text-left">{{ $t("edit_profile.last_name") }}</td>
          <td class="text-right">
            {{ me.last_name }}
            <q-popup-edit v-model="props.me.last_name" auto-save v-slot="scope">
              <q-input v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </td>
        </tr>
        <tr>
          <td class="text-left">{{ $t("edit_profile.email") }}</td>
          <td class="text-right">
            {{ `${me.email.substring(0, 22)}...` }}
            <q-popup-edit
              v-model.string="props.me.email"
              auto-save
              v-slot="scope"
              :validate="emailValidation"
              @hide="emailValidation"
            >
              <q-input
                type="email"
                v-model.number="scope.value"
                dense
                autofocus
                :error="errorEmail"
                :error-message="errorMessageEmail"
              />
            </q-popup-edit>
          </td>
        </tr>
        <tr>
          <td class="text-left">{{ $t("edit_profile.phone") }}</td>
          <td class="text-right">
            {{ me.phone }}
            <q-popup-edit
              v-model.number="props.me.phone"
              auto-save
              v-slot="scope"
              :validate="phoneValidation"
              @hide="phoneValidation"
            >
              <q-input
                v-model.number="scope.value"
                dense
                autofocus
                mask="(##) ### - ###"
                unmasked-value
                :error="errorPhone"
                :error-message="errorMessagePhone"
              />
            </q-popup-edit>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
    <div class="row justify-center q-pa-md">
      <q-btn
        class="q-ma-md"
        style="width: 100%"
        color="primary"
        :icon="biGeoAltFill"
        :label="$t(`edit_profile.addressList.name`)"
        @click="[this.$bus.emit(`add-address`), routerDialog.count++]"
      />
    </div>
    <q-separator inset />
    <div class="row justify-center q-pa-md">
      <q-btn type="submit" label="Save" />
    </div>
  </q-form>
</template>
<script>
import { defineComponent, ref } from "vue";
import { Notify } from "quasar";

import { useRouterDialogStore } from "src/stores/router-dialog";
import { useProfileStore } from "src/stores/profile";

import { biGeoAltFill } from "@quasar/extras/bootstrap-icons";

export default defineComponent({
  props: {
    me: { type: Object, required: true },
  },
  setup(props) {
    const routerDialog = useRouterDialogStore();
    const profile = useProfileStore();
    const { editUser } = profile;
    const errorEmail = ref(false);
    const errorMessageEmail = ref("");
    const errorPhone = ref(false);
    const errorMessagePhone = ref("");
    return {
      routerDialog,
      biGeoAltFill,
      props,
      editUser,
      errorEmail,
      errorMessageEmail,
      errorPhone,
      errorMessagePhone,
    };
  },
  methods: {
    updateUser() {
      try {
        this.editUser(this.me);
        this.$bus.emit("go-info");
        Notify.create({
          message: "Submited",
          color: "info",
        });
      } catch (error) {
        console.log(error);
      }
    },
    emailValidation(val) {
      if (!val.includes("@")) {
        this.errorEmail = true;
        this.errorMessageEmail = this.$t("errors.letters", ["@"]);
        return false;
      }
      this.errorEmail = false;
      this.errorMessageEmail = "";
      return true;
    },
    phoneValidation(val) {
      if (val.toString().length < 8) {
        this.errorPhone = true;
        this.errorMessagePhone = this.$t("errors.digites", [8]);
        return false;
      }
      this.errorPhone = false;
      this.errorMessagePhone = "";
      return true;
    },
  },
});
</script>
