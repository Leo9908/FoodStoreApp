<template>
  <q-form>
    <q-markup-table class="no-shadow" style="width: 270px; height: 270px">
      <tbody>
        <tr class="q-py-md">
          <td class="text-left no-padding">
            {{ props.showAddress.alias }}
            <q-popup-edit
              v-model="props.showAddress.alias"
              auto-save
              v-slot="scope"
            >
              <q-input v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </td>
        </tr>
        <tr class="q-py-md">
          <td class="text-left no-padding">
            {{ `${props.showAddress.formatted.substring(0, 40)}...` }}
            <q-popup-edit
              v-model="props.showAddress.formatted"
              auto-save
              v-slot="scope"
            >
              <q-input v-model="scope.value" dense autofocus type="textarea" />
            </q-popup-edit>
          </td>
        </tr>
        <tr class="q-py-md">
          <td class="text-left no-padding">
            {{ props.showAddress.apto }}
            <q-popup-edit
              v-model.string="props.showAddress.apto"
              auto-save
              v-slot="scope"
            >
              <q-input
                type="email"
                v-model.number="scope.value"
                dense
                autofocus
              />
            </q-popup-edit>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
    <q-separator inset />
    <div class="row justify-center q-pa-md">
      <q-btn type="submit" label="Save" @click="updateAddress(showAddress)" />
    </div>
  </q-form>
</template>
<script>
import { defineComponent } from "vue";

import { useMapsStore } from "src/stores/maps";

export default defineComponent({
  props: {
    showAddress: { type: Object, required: true },
  },
  setup(props) {
    const maps = useMapsStore();
    const { updateAddress } = maps;
    return {
      props,
      updateAddress,
    };
  },
});
</script>
