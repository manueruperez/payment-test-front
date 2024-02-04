<template>
  <NoContent message="No hay productos" v-if="!productListData" />
  <div v-else class="container">
    <div class="row">
      <div
        v-for="(product, i) in productListData"
        :key="`product-item-${i}`"
        class="col-sm-12 col-md-6 col-lg-4 col-xl-3"
      >
        <ProductCard :product-data="product" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { ProductModel } from "@/models/product.models";
import ProductCard from "./ProductCard.vue";
import NoContent from "./NoContent.vue";

export default defineComponent({
  name: "ProductList",
  components: { NoContent, ProductCard },
  props: {
    productListData: {
      type: Array as () => ProductModel[],
      default: null,
      required: true,
    },
  },
});
</script>
