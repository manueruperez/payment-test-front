<template>
  <div class="home">
    <PaymenModal />
    <ProductList :productListData="products" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { useStore } from "vuex";
import ProductList from "@/components/shared/ProductList.vue";
import PaymenModal from "@/components/shared/PaymentStepper.vue";
@Options({
  components: {
    ProductList,
    PaymenModal,
  },
})
export default class HomeView extends Vue {
  private store = useStore();
  get products() {
    return this.store.getters.products;
  }

  mounted() {
    this.store.dispatch("fetchProducts");
  }
}
</script>
