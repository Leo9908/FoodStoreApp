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
            <div class="text-h4 q-ml-md text-black">Información</div>
          </div>
        </tr>
      </thead>
      <tbody class="markup-body">
        <tr>
          <td v-if="isDesktop" class="text-left">Nombre</td>
          <td class="text-left">
            <div v-if="isMobile" class="text-overline">Nombre</div>
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
                :rules="[(val) => !!val || `Campo obligatorio`]"
              />
            </q-popup-edit>
          </td>
          <td class="text-right">
            <q-icon size="20px" name="chevron_left" />
          </td>
        </tr>
        <tr>
          <td v-if="isDesktop" class="text-left">Apellidos</td>
          <td class="text-left">
            <div v-if="isMobile" class="text-overline">Apellidos</div>
            {{ user.last_name }}
            <q-popup-edit
              v-model="user.last_name"
              buttons
              label-set="Guardar"
              label-cancel="Cancelar"
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
                :rules="[(val) => !!val || `Campo obligatorio`]"
              />
            </q-popup-edit>
          </td>
          <td class="text-right">
            <q-icon size="20px" name="chevron_left" />
          </td>
        </tr>
        <tr>
          <td v-if="isDesktop" class="text-left">Correo electrónico</td>
          <td class="text-left">
            <div v-if="isMobile" class="text-overline">Correo electrónico</div>
            {{ user.email }}
            <q-popup-edit
              v-model="user.email"
              buttons
              label-set="Guardar"
              label-cancel="Cancelar"
              :validate="() => !$refs.myInput.hasError"
              v-slot="scope"
            >
              <q-input
                type="email"
                v-model="scope.value"
                hint="Entre su correo"
                dense
                autofocus
                @keyup.enter="scope.set"
                ref="myInput"
                :rules="[(value) => value.includes('@') || `Debe contener @`]"
              />
            </q-popup-edit>
          </td>
          <td class="text-right">
            <q-icon size="20px" name="chevron_left" />
          </td>
        </tr>
        <tr>
          <td v-if="isDesktop" class="text-left">Teléfono</td>
          <td class="text-left">
            <div v-if="isMobile" class="text-overline">Teléfono</div>
            {{ user.phone == null ? `Teléfono no especificado` : user.phone }}
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
                hint="Entre su teléfono"
                mask="(##) ### - ###"
                unmasked-value
                @keyup.enter="scope.set"
                ref="myInput"
                :rules="[(val) => val.length >= 8 || `Debe contener `]"
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
import { defineComponent, toRefs } from "vue";

import { useProfileStore } from "src/stores/profile";
import { Notify, useQuasar } from "quasar";

export default defineComponent({
  props: {
    me: {
      type: Object,
      required: true,
    },
  },
  data(props) {
    const user = Object.assign({}, props.me);
    return {
      user,
    };
  },
  setup() {
    const profile = useProfileStore();
    const { editUser } = profile;
    const $q = useQuasar();
    return {
      editUser,
      isMobile: $q.platform.is.mobile,
      isDesktop: $q.platform.is.desktop,
    };
  },
  watch: {
    user: {
      handler: async function () {
        try {
          await this.editUser(this.user);
          Notify.create({
            color: "info",
            message: "Campo editado",
          });
        } catch (error) {
          console.log(error);
          Notify.create({
            color: "warning",
            message: "No se ha podido editar el campo",
          });
        }
      },
      deep: true,
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
