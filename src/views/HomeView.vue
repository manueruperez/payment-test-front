<template>
  <div class="home">
    <ProductCard />
    <!-- <NoContent message="Holi" /> -->
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import NoContent from "@/components/shared/NoContent.vue";
import ProductCard from "@/components/shared/ProductCard.vue";
@Options({
  components: {
    NoContent,
    ProductCard,
  },
})
export default class HomeView extends Vue {}
</script>
