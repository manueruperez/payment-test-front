<template>
  <div class="d-flex flex-column vh-100">
    <MainHeader />
    <router-view class="flex-grow-1" />
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
