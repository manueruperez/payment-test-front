<template>
  <div class="container mt-5 mb-5">
    <div v-if="cartList.length > 0" class="col-12 text-center mb-3">
      <PaymentModal />
    </div>
    <div v-if="cartList.length > 0" class="row justify-content-center">
      <div class="d-flex flex-column align-items-center">
        <div
          v-for="(product, i) in cartList"
          :key="`product-item-${i}`"
          class="my-2"
        >
          <ProductCard :productData="product" />
        </div>
      </div>
      <div v-if="cartList.length > 0" class="col-12 text-center mt-3">
        <PaymentModal />
      </div>
    </div>
    <div v-else class="text-center mt-3">No hay productos en el carrito</div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import ProductCard from "@/components/shared/ProductCard.vue";
import PaymentModal from "@/components/shared/PaymentModal.vue";

import { useStore } from "vuex";
export default defineComponent({
  name: "BuyCarrtView",
  components: { ProductCard, PaymentModal },
  setup() {
    const store = useStore();
    const cartList = computed(() => store.getters.cart);

    return { cartList };
  },
});
</script>
