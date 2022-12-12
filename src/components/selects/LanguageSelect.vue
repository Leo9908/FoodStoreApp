<!-- some .vue file -->

<template>
  <!-- ...... -->
  <q-select
    v-model="locale"
    :options="localeOptions"
    dense
    borderless
    emit-value
    map-options
    options-dense
  />
  <!-- ...... -->
</template>

<script>
export default {
  setup() {
    const { locale } = useI18n({ useScope: "global" });
    return {
      locale,
      localeOptions: [
        { value: "en-US", label: "EN" },
        { value: "es-ES", label: "ES" },
      ],
    };
  },
};
</script>
