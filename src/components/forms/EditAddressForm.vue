<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-card class="q-pa-md no-shadow" bordered>
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="props.address.alias"
          label="Your alias *"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-input
          filled
          type="textarea"
          autogrow
          v-model="props.address.formatted"
          label="Your last alias *"
          lazy-rules
          :rules="[
            (val) =>
              (val !== null && val !== '') || 'Please type your formatted',
            (val) => (val > 0 && val < 100) || 'Please type a real formatted',
          ]"
        />

        <q-input
          filled
          v-model="props.address.apto"
          label="Your last alias *"
          lazy-rules
          :rules="[
            (val) =>
              (val !== null && val !== '') || 'Please type your formatted',
            (val) => (val > 0 && val < 100) || 'Please type a real formatted',
          ]"
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
export default {
  props: {
    address: {
      type: Object,
      required: true,
      default() {
        return { alias: null, formatted: null, apto: null };
      },
    },
  },
  setup(props) {
    return {
      props,
      onSubmit() {},

      onReset() {
        alias.value = null;
        formatted.value = null;
        accept.value = false;
      },
    };
  },
};
</script>
