<template>
  <q-footer color="secondary" style="height: 150px">
    <q-toolbar
      class="content-center row justify-start"
      color="primary"
      style="height: 50px; width: 100%; align-items: center"
    >
      <div class="float-right">
        <q-icon class="q-ml-md" :name="bi_in" size="30px" />
        <q-icon class="q-ml-md" :name="bi_tw" size="30px" />
        <q-icon class="q-ml-md" :name="bi_fa" size="30px" />
      </div>
    </q-toolbar>
    <q-toolbar>
      <q-toolbar-title> </q-toolbar-title>
    </q-toolbar>
  </q-footer>
</template>
<script>
import { defineComponent } from "vue";

import {
  biTwitter,
  biFacebook,
  biInstagram,
} from "@quasar/extras/bootstrap-icons";

export default defineComponent({
  name: "FooterIndex",
  setup() {
    const bi_tw = biTwitter;
    const bi_fa = biFacebook;
    const bi_in = biInstagram;
    return {
      bi_tw,
      bi_fa,
      bi_in,
    };
  },
});
</script>
