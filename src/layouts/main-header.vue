<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">ShopStore</a>
      <div class="d-flex me-3">
        <button type="button" class="btn btn-primary position-relative">
          <i class="bx bx-cart"></i>
          <span
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          >
            99+
          </span>
        </button>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ProductList",
});
</script>
