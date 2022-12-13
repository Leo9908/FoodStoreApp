<template>
  <div class="q-pa-md fit row wrap justify-start items-start content-start">
    <slot class="col-grow" name="left"></slot>
    <q-form @submit="onSubmit" class="q-gutter-md col-grow">
      <q-input
        v-for="input in inputs"
        v-bind:key="input"
        :label="input.label"
        v-model="values[input.index].value"
        :rules="input.rules"
        :type="
          values[input.index].value != null
            ? values[input.index].value.toString().length < 50
              ? values[input.index].type
              : `textarea`
            : `text`
        "
        autogrow
      ></q-input>
      <slot name="select"></slot>
      <div>
        <q-btn label="Enviar" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script>
import { ref, toRefs } from "vue";

export default {
  props: {
    data: {
      type: Object,
      required: true,
      default() {
        return {
          inputs: [{ index: 0, label: "", name: "", value: null, rules: [] }],
        };
      },
    },
  },
  created() {
    this.models.forEach((input) => {
      this.values.push({
        value: input.value,
        type: input.value ? typeof input.value : "text",
      });
    });
  },
  setup(props, ctx) {
    const { data } = toRefs(props);
    const submitEmpty = ref(false);
    const submitResult = ref([]);
    const inputs = data.value.inputs;
    const models = Object.assign([], data.value.inputs);
    const values = ref([]);
    return {
      preferred: ref("rock"),
      inputs,
      models,
      values,
      submitEmpty,
      submitResult,

      onSubmit(evt) {
        const data = [];

        for (let index = 0; index < inputs.length; index++) {
          data.push({
            name: inputs[index].name,
            value: evt.srcElement[index]._value,
          });
        }

        ctx.emit("select", data);

        submitResult.value = data;
        submitEmpty.value = data.length === 0;
      },
    };
  },
  watch: {
    values: {
      handler: function (val, oldVal) {
        this.$bus.emit("updated", val);
      },
      deep: true,
    },
  },
};
</script>
