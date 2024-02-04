<template>
  <NoContent message="No hay productos" v-if="!productListData" />
  <div v-else class="container mb-5">
    <div class="row justify-content-center">
      <div
        v-for="(product, i) in productListData"
        :key="`product-item-${i}`"
        class="col-12 col-md-6 col-lg-4 d-flex align-items-stretch"
      >
        <ProductCard
          class="mt-5 w-100"
          :product-data="product"
          :cut-description="true"
        />
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
      type: Array as () => ProductModel[] | null,
      default: null,
    },
  },
});
</script>
