<template>
  <div
    v-for="(product, i) in cartList"
    :key="`product-item-${i}`"
    class="d-flex align-items-center my-2"
  >
    <span class="mb-0">{{ product.title }}</span>
    <div class="flex-grow-1 mx-2 line"></div>
    <span class="mb-0">${{ product.price.toLocaleString("es-ES") }}</span>
  </div>
  <el-divider />
  <div class="d-flex justify-content-between align-items-center my-2">
    <p class="mb-0">Total</p>
    <p class="mb-0">
      <strong>{{ cartTotal.toLocaleString("es-ES") }}</strong>
    </p>
  </div>
  <div class="text-center">
    <button
      class="ms-auto me-auto btn btn-success mt-3"
      @click="confirmPurchase"
    >
      Confirmar compra!
    </button>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { ElDivider } from "element-plus";
import { ProductModel } from "@/models/product.models";

export default defineComponent({
  name: "PurchaseSummary",
  components: { ElDivider },
  setup(props, { emit }) {
    const store = useStore();
    const cartList = computed(() => store.getters.cart);
    const cartTotal = computed(() => {
      return cartList.value.reduce(
        (total: number, product: ProductModel) => total + product.price,
        0
      );
    });

    const confirmPurchase = () => {
      emit("purchase-validation", {
        total: cartTotal,
      });
    };

    return { cartList, cartTotal, confirmPurchase };
  },
});
</script>
<style>
.line {
  border-bottom: 1px dotted #000;
  width: 100%;
  height: 0;
}
</style>
