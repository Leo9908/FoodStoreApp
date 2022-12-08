<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-card class="q-pa-md no-shadow" bordered>
      <q-form
        @submit="onSubmit(editAddrress)"
        @reset="onReset(editAddrress)"
        class="q-gutter-md"
      >
        <q-input
          v-model="editAddrress.alias"
          label="Your alias *"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || $t(`errors.emptyField`)]"
        />
        <q-input
          bottom-slots
          v-model="editAddrress.formatted"
          label="Your last alias *"
          type="textarea"
          :rules="[(val) => (val && val.length > 0) || $t(`errors.emptyField`)]"
        >
          <template v-slot:after>
            <q-btn
              round
              size="15px"
              dense
              flat
              icon="gps_fixed"
              @click="geolocate(editAddrress)"
            />
          </template>
        </q-input>

        <q-input
          v-model="editAddrress.apto"
          label="Your last alias *"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || $t(`errors.emptyField`)]"
        />

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
    </q-card>
  </div>
</template>

<script>
import { Notify } from "quasar";
import { useMapsStore } from "src/stores/maps";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

export default {
  props: {
    address: {
      type: Object,
      required: false,
      default() {
        return {
          id: ref(null),
          alias: ref(null),
          formatted: ref(null),
          apto: ref(null),
          latitude: ref(null),
          longitude: ref(null),
        };
      },
    },
  },
  data(props) {
    let editAddrress = Object.assign({}, props.address);
    return {
      editAddrress,
    };
  },
  setup(props, ctx) {
    const maps = useMapsStore();
    const { updateAddress, locator } = maps;
    const { t } = useI18n();
    return {
      geolocate(address) {
        locator(address);
      },
      async onSubmit(address) {
        try {
          await updateAddress(address);
          Notify.create({
            color: "info",
            message: t("success"),
          });
          ctx.emit("select");
        } catch (error) {
          console.log(error);
          Notify.create({
            color: "warning",
            message: t("failed"),
          });
        }
      },
      onReset(address) {
        address.alias = null;
        address.formatted = null;
        address.apto = null;
      },
    };
  },
};
</script>
