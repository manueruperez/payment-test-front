<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">ShopStore</a>
      <div class="d-flex me-3">
        <button
          @click="buyCart"
          type="button"
          class="btn btn-primary position-relative"
        >
          <i class="bx bx-cart"></i>
          <span
            v-if="cartItemCount > 0"
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          >
            {{ cartItemCount }}
          </span>
        </button>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "mainHeader",
  setup() {
    const store = useStore();
    const cartItemCount = computed(() => {
      return store.state.cart.length;
    });
    return { cartItemCount };
  },
  methods: {
    buyCart() {
      this.$router.push("/buy-cart");
    },
  },
});
</script>
