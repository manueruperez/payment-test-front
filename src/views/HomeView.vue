<template>
  <div class="home">
    <ProductList />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ProductList from "@/components/shared/ProductList.vue";
@Options({
  components: {
    ProductList,
  },
})
export default class HomeView extends Vue {}
</script>
