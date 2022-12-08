<template>
  <div class="q-pa-xl" align="center">
    <q-markup-table
      :class="[`markup`, isDesktop ? `q-px-lg` : `q-px-xs`]"
      separator="horizontal"
      flat
      bordered
    >
      <thead>
        <tr>
          <div
            class="row no-wrap items-center q-my-lg justify-between"
            style="width: 100%"
          >
            <div class="text-h4 q-ml-md text-black">
              {{ $t("edit_profile.table.title") }}
            </div>
          </div>
        </tr>
      </thead>
      <tbody class="markup-body">
        <tr>
          <td v-if="isDesktop" class="text-left">
            {{ $t("edit_profile.table.name") }}
          </td>
          <td class="text-left">
            <div v-if="isMobile" class="text-overline">
              {{ $t("edit_profile.table.name") }}
            </div>
            {{ user.name }}
            <q-popup-edit
              class="popups"
              v-model="user.name"
              buttons
              v-slot="scope"
              :validate="() => !$refs.myInput.hasError"
            >
              <q-input
                v-model="scope.value"
                dense
                autofocus
                counter
                @keyup.enter="scope.set"
                ref="myInput"
                :rules="[(val) => !!val || $t(`errors.required`)]"
              />
            </q-popup-edit>
          </td>
          <td class="text-right">
            <q-icon size="20px" name="chevron_left" />
          </td>
        </tr>
        <tr>
          <td v-if="isDesktop" class="text-left">
            {{ $t("edit_profile.table.last_name") }}
          </td>
          <td class="text-left">
            <div v-if="isMobile" class="text-overline">
              {{ $t("edit_profile.table.last_name") }}
            </div>
            {{ user.last_name }}
            <q-popup-edit
              v-model="user.last_name"
              buttons
              :label-set="$t(`buttons_labels.save`)"
              :label-cancel="$t(`buttons_labels.cancel`)"
              v-slot="scope"
              :validate="() => !$refs.myInput.hasError"
            >
              <q-input
                v-model="scope.value"
                dense
                autofocus
                counter
                @keyup.enter="scope.set"
                ref="myInput"
                :rules="[(val) => !!val || $t(`errors.required`)]"
              />
            </q-popup-edit>
          </td>
          <td class="text-right">
            <q-icon size="20px" name="chevron_left" />
          </td>
        </tr>
        <tr>
          <td v-if="isDesktop" class="text-left">
            {{ $t("edit_profile.table.email") }}
          </td>
          <td class="text-left">
            <div v-if="isMobile" class="text-overline">
              {{ $t("edit_profile.table.email") }}
            </div>
            {{ user.email }}
            <q-popup-edit
              v-model="user.email"
              buttons
              :label-set="$t(`buttons_labels.save`)"
              :label-cancel="$t(`buttons_labels.cancel`)"
              :validate="() => !$refs.myInput.hasError"
              v-slot="scope"
            >
              <q-input
                type="email"
                v-model="scope.value"
                :hint="$t(`edit_profile.hints.email`)"
                dense
                autofocus
                @keyup.enter="scope.set"
                ref="myInput"
                :rules="[
                  (value) => value.includes('@') || $t(`errors.letters`, [`@`]),
                ]"
              />
            </q-popup-edit>
          </td>
          <td class="text-right">
            <q-icon size="20px" name="chevron_left" />
          </td>
        </tr>
        <tr>
          <td v-if="isDesktop" class="text-left">
            {{ $t("edit_profile.table.phone") }}
          </td>
          <td class="text-left">
            <div v-if="isMobile" class="text-overline">
              {{ $t("edit_profile.table.phone") }}
            </div>
            {{
              user.phone == null ? $t("edit_profile.table.noPhone") : user.phone
            }}
            <q-popup-edit
              v-model="user.phone"
              buttons
              v-slot="scope"
              :validate="() => !$refs.myInput.hasError"
            >
              <q-input
                v-model="scope.value"
                dense
                autofocus
                counter
                :hint="$t(`edit_profile.hints.phone`)"
                mask="(##) ### - ###"
                unmasked-value
                @keyup.enter="scope.set"
                ref="myInput"
                :rules="[
                  (val) => val.length >= 8 || $t(`errors.digites2`, [8]),
                ]"
              />
            </q-popup-edit>
          </td>
          <td class="text-right">
            <q-icon size="20px" name="chevron_left" />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

import { useProfileStore } from "src/stores/profile";
import { storeToRefs } from "pinia";
import { Notify, useQuasar } from "quasar";

export default defineComponent({
  setup() {
    const profile = useProfileStore();
    const { getUser } = storeToRefs(profile);
    const { editUser } = profile;
    const user = getUser;
    const $q = useQuasar();
    return {
      user,
      editUser,
      isMobile: $q.platform.is.mobile,
      isDesktop: $q.platform.is.desktop,
    };
  },
  watch: {
    async "user.name"() {
      try {
        this.editUser(this.user);
        Notify.create({
          color: "info",
          message: this.$t("edit_profile.edited"),
        });
      } catch (error) {
        console.log(error);
        Notify.create({
          color: "warning",
          message: this.$t("edit_profile.noEdited"),
        });
      }
    },
    async "user.last_name"() {
      try {
        this.editUser(this.user);
        Notify.create({
          color: "info",
          message: this.$t("edit_profile.edited"),
        });
      } catch (error) {
        console.log(error);
        Notify.create({
          color: "warning",
          message: this.$t("edit_profile.noEdited"),
        });
      }
    },
    async "user.email"() {
      try {
        this.editUser(this.user);
        Notify.create({
          color: "info",
          message: this.$t("edit_profile.edited"),
        });
      } catch (error) {
        console.log(error);
        Notify.create({
          color: "warning",
          message: this.$t("edit_profile.noEdited"),
        });
      }
    },
    async "user.phone"() {
      try {
        this.editUser(this.user);
        Notify.create({
          color: "info",
          message: this.$t("edit_profile.edited"),
        });
      } catch (error) {
        console.log(error);
        Notify.create({
          color: "warning",
          message: this.$t("edit_profile.noEdited"),
        });
      }
    },
  },
});
</script>
<style>
.markup {
  height: 380px;
}
.markup-body {
  height: 250px;
}
.popups {
  max-width: 100px;
}
</style>
