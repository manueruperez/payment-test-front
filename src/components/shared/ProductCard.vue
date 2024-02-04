import { defineComponent } from "vue";

<template>
  <div class="card" style="width: 18rem">
    <img alt="product image" :src="dynamicImgSrc" />
    <div class="card-body">
      <h5 class="card-title">{{ productData.title }}</h5>
      <p class="card-text">{{ productData.description }}</p>
      <div class="d-flex justify-content-between align-items-center">
        <span class="card-price">{{ productData.price }}</span>
        <button class="btn btn-primary" @click="addToCart(productData.id)">
          +
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { ProductModel } from "@/models/product.models";

export default defineComponent({
  name: "ProductCard",
  props: {
    productData: {
      type: Object as () => ProductModel,
      default: {
        id: 0,
        imgUrl: "product_default",
        title: "Estoicismo",
        description: "una excelente filosofia",
        price: 50000,
      } as ProductModel,
      required: true,
    },
  },
  computed: {
    dynamicImgSrc(): string {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      return require(`@/assets/products-imgs/${this.productData.imgUrl}.webp`).toString();
    },
  },
  methods: {
    addToCart(idProduct: number) {
      // To do add to store
      console.log("add to cart", idProduct);
    },
  },
});
</script>
