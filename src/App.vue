<template>
  <layout>
    <router-view />
  </layout>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import layout from "./layouts/main-layout.vue";
export default defineComponent({
  components: { layout },
  data() {
    return {
      layout: "layout",
      initUserInfo: false,
    };
  },
});
</script>
