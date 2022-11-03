<template>
  <div class="q-pa-none">
    <q-markup-table class="no-shadow">
      <tbody>
        <tr>
          <td class="text-left">{{ $t("edit_profile.name") }}</td>
          <td class="text-right">
            {{ me.name }}
            <q-popup-edit v-model="me.name" buttons v-slot="scope">
              <q-input v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </td>
        </tr>
        <tr>
          <td class="text-left">{{ $t("edit_profile.last_name") }}</td>
          <td class="text-right">
            {{ me.last_name }}
            <q-popup-edit v-model="me.last_name" buttons v-slot="scope">
              <q-input v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </td>
        </tr>
        <tr>
          <td class="text-left">{{ $t("edit_profile.email") }}</td>
          <td class="text-right">
            {{ me.email }}
            <q-popup-edit v-model="me.email" buttons v-slot="scope">
              <q-input v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </td>
        </tr>
        <tr>
          <td class="text-left">{{ $t("edit_profile.phone") }}</td>
          <td class="text-right">
            {{ me.phone }}
            <q-popup-edit v-model="me.phone" buttons v-slot="scope">
              <q-input
                v-model="scope.value"
                dense
                autofocus
                mask="(##) ### - ###"
                unmasked-value
              />
            </q-popup-edit>
          </td>
        </tr>
        <tr>
          <td class="text-left">{{ $t("edit_profile.municipality") }}</td>
          <td class="text-right">
            {{ me.municipality }}
            <q-popup-edit v-model="me.municipality" buttons v-slot="scope">
              <q-input v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </td>
        </tr>
        <tr>
          <td class="text-left">{{ $t("edit_profile.address") }}</td>
          <td class="text-right">
            {{ me.address }}
            <q-popup-edit v-model="me.address" buttons v-slot="scope">
              <q-input v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
    <q-separator inset />
    <div class="row justify-center q-pa-md">
      <q-btn
        label="Save"
        @click="
          {
            this.$bus.emit(`go-info`, `info`), updateUser();
          }
        "
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

import { useProfileStore } from "src/stores/profile";
import { storeToRefs } from "pinia";

export default {
  data() {
    return {
      me: {
        name: this.user.name,
        last_name: this.user.last_name,
        email: this.user.email,
        phone: this.user.phone,
        municipality: this.user.municipality,
        address: this.user.address,
      },
    };
  },
  setup() {
    const profile = new useProfileStore();
    const { getUser } = storeToRefs(profile);
    const user = getUser;
    const { editUser } = profile;
    return {
      profile,
      getUser,
      user,
      editUser,
    };
  },
  methods: {
    updateUser() {
      try {
        console.log(this.me);
        this.editUser(this.me);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
