<template>
  <q-menu :offset="props.offset" style="width: 250px">
    <q-card>
      <q-card-section class="header-profile bg-grey-4" align="center">
        <div>{{ user.name }}</div>
        <div class="avatar-profile">
          <q-avatar
            class="avatar"
            size="62px"
            color="primary"
            text-color="white"
            ><div class="text-h3">{{ props.inicial }}</div>
          </q-avatar>
        </div>
      </q-card-section>
      <q-card-section class="q-mt-lg" align="center">
        <div class="text-h6 text-weight-regular">
          {{ user.name }} {{ user.last_name }}
        </div>
        <div class="text-subtitle2 text-weight-thin">
          {{
            user.email != undefined
              ? user.email.length > 30
                ? user.email.substring(0, 30)
                : user.email
              : ""
          }}
        </div>
        <div class="q-gutter-sm q-mt-sm">
          <q-btn
            size="10px"
            round
            outline
            style="color: rgba(128, 128, 128, 0.5)"
            :icon="biPencilSquare"
            @click="editProfile"
          >
          </q-btn>
          <q-btn
            v-if="isUser"
            size="10px"
            round
            outline
            style="color: rgba(128, 128, 128, 0.5)"
            :icon="biGeoAltFill"
            @click="editAddresses"
          ></q-btn>
          <q-btn
            v-if="isAdmin"
            size="10px"
            round
            outline
            style="color: rgba(128, 128, 128, 0.5)"
            icon="manage_accounts"
            @click="goToManagement"
          ></q-btn>
          <q-btn
            size="10px"
            round
            outline
            style="color: rgba(128, 128, 128, 0.5)"
            icon="shield"
          ></q-btn>
        </div>
      </q-card-section>
      <q-card-section align="center">
        <div>
          <q-btn
            class="text-weight-regular"
            unelevated
            outline
            @click="confirm = true"
          >
            Cerrar sesi??n
          </q-btn>
          <q-dialog class="q-py-xl" v-model="confirm">
            <q-card style="width: 300px">
              <q-card-section class="row items-center">
                <q-avatar
                  :icon="biBoxArrowDownLeft"
                  color="primary"
                  text-color="white"
                />
                <span class="q-ml-sm">??Usted desea cerrar la sesi??n?</span>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="Cancelar" color="primary" v-close-popup />
                <q-btn
                  flat
                  label="Confirmar"
                  color="primary"
                  v-close-popup
                  @click="logOut"
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </q-card-section>
    </q-card>
  </q-menu>
</template>
<script>
import { defineComponent, ref } from "vue";

import {
  biGeoAltFill,
  biPencilSquare,
  biShieldLock,
  biBoxArrowDownLeft,
} from "@quasar/extras/bootstrap-icons";

import { useProfileStore } from "src/stores/profile";
import { storeToRefs } from "pinia";
import { useAuthStore } from "src/stores/auth";
import { Notify } from "quasar";

import { useRouter } from "vue-router";

export default defineComponent({
  props: {
    offset: { type: Array, required: true },
    inicial: { type: String, required: true, default: "U" },
  },
  setup(props) {
    const router = useRouter();
    const profile = useProfileStore();
    const auth = useAuthStore();
    const { getUser } = storeToRefs(profile);
    const { singOut } = auth;
    const { isUser, isAdmin } = storeToRefs(auth);

    return {
      router,
      props,
      biGeoAltFill,
      biPencilSquare,
      biShieldLock,
      biBoxArrowDownLeft,
      user: getUser,
      singOut,
      isUser,
      isAdmin,
      confirm: ref(false),
      logOut() {
        singOut();
        Notify.create({
          color: "info",
          message: "La sesi??n se ha cerrado",
          icon: "",
        });
        router.push({ path: "/" });
      },
      editProfile() {
        router.push({ path: "/profile/user-info" });
      },
      editAddresses() {
        router.push({ path: "/profile/addresses" });
      },
      goToManagement() {
        router.push({ name: "adminProducts" });
      },
    };
  },
});
</script>
<style lang="scss">
.avatar {
  outline: 3px solid white;
}
.header-profile {
  height: 80px;
}
.avatar-profile {
  position: relative;
  top: 12px;
}
</style>
