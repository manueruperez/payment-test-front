<template>
  <div class="home">
    <NoContent message="Holi" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import NoContent from "@/components/shared/NoContent.vue";
@Options({
  components: {
    NoContent,
  },
})
export default class HomeView extends Vue {}
</script>
