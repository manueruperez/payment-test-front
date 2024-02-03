<template>
  <div>
    <MainHeader />
    <router-view />
    <MainFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MainHeader from "./main-header.vue";
import MainFooter from "./main-footer.vue";
export default defineComponent({
  components: { MainHeader, MainFooter },
  data() {
    return {
      layout: "layout",
      initUserInfo: false,
    };
  },
});
</script>
