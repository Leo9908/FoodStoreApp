<template>
  <div class="q-pa-md">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-select
        table-colspan="3"
        name="selected_address"
        v-model="accepted"
        multiple
        :options="options"
        color="primary"
        filled
        :label="$t(`orders.form.addresses`)"
        @click="order.generateAddressOptions()"
        :disable="!isAutenticatedNow"
        use-chips
        :rules="[(val) => val.length > 0 || 'Field is required']"
        ><template v-slot:after>
          <q-btn
            round
            dense
            flat
            icon="add"
            @click="openFormAddAddress()"
          /> </template
      ></q-select>
      <q-input
        name="selected_phone"
        v-model="phone"
        color="primary"
        filled
        :rules="[
          (val) => !!val || 'Field is required',
          (val) => val.length >= 8 || 'Please use more than 8 characters',
        ]"
        lazy-rules
        mask="(##) ### - ###"
        unmasked-value
        :label="$t(`orders.form.phone`)"
        :disable="!isAutenticatedNow"
      >
        <template v-slot:append>
          <q-btn
            round
            dense
            flat
            icon="add"
            @click="!getPhone == null ? (phone = getPhone) : openFormAddPhone()"
          /> </template
      ></q-input>
      <div>
        <q-btn
          label="Submit"
          type="submit"
          color="primary"
          :disable="!isAutenticatedNow"
        />
      </div>
    </q-form>

    <q-card v-if="submitEmpty" flat bordered class="q-mt-md bg-grey-2">
      <q-card-section> Submitted form contains empty formData. </q-card-section>
    </q-card>
    <q-card
      v-else-if="submitResult.length > 0"
      flat
      bordered
      class="q-mt-md bg-grey-2"
    >
      <q-card-section
        >Submitted form contains the following formData (key =
        value):</q-card-section
      >
      <q-separator />
      <q-card-section class="row q-gutter-sm items-center">
        <div
          v-for="(item, index) in submitResult"
          :key="index"
          class="q-px-sm q-py-xs bg-grey-8 text-white rounded-borders text-center text-no-wrap"
        >
          {{ item.name }} = {{ item.value }}
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";
import { Notify } from "quasar";

import { defineComponent } from "vue";

import { storeToRefs } from "pinia";

import { useOrdersStore } from "src/stores/orders";
import { useProfileStore } from "src/stores/profile";
import { useAuthStore } from "src/stores/auth";
import { useI18n } from "vue-i18n";

export default defineComponent({
  beforeCreate() {
    if (this.isAutenticatedNow) {
      this.order.generateAddressOptions();
    }
  },
  setup() {
    const submitEmpty = ref(false);
    const submitResult = ref([]);

    const phone = ref(null);
    const accepted = ref([]);

    const order = useOrdersStore();
    const { getAddressOptions, canBeSent } = storeToRefs(order);

    const profile = useProfileStore();
    const { getPhone } = storeToRefs(profile);

    const auth = useAuthStore();
    const { isAutenticatedNow } = storeToRefs(auth);

    const { t } = useI18n();

    return {
      preferred: ref("rock"),
      accepted,
      order,
      options: getAddressOptions,
      canBeSent,
      phone,
      getPhone,

      submitEmpty,
      submitResult,

      isAutenticatedNow,

      onSubmit(evt) {
        if (canBeSent.value) {
          const formData = new FormData(evt.target);
          const data = [];

          for (const [name, value] of formData.entries()) {
            data.push({
              name,
              value,
            });
          }

          submitResult.value = data;
          submitEmpty.value = data.length === 0;
          try {
            order.sendOrder(data);
            Notify.create({
              message: t("orders.send"),
              color: "info",
            });
          } catch (error) {
            Notify.create({
              message: error,
              color: "negative",
            });
          }
        } else {
          Notify.create({
            message: t("products.errors.select"),
            color: "warning",
          });
        }
      },
    };
  },
  methods: {
    openFormAddAddress() {
      console.log("Acción 1");
      this.$bus.emit("open-dialog");
      this.$bus.emit("go_back", 3);
    },
    openFormAddPhone() {
      console.log("Acción 2");
    },
  },
});
</script>
