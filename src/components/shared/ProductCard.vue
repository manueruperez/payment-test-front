<template>
  <div class="card" style="width: 18rem">
    <img alt="product image" :src="dynamicImgSrc" />
    <div class="card-body">
      <h5 class="card-title">{{ productData.title }}</h5>
      <p :class="{ 'fixed-height-description': cutDescription }">
        {{
          cutDescription
            ? cutString(productData.description)
            : productData.description
        }}
      </p>
      <div class="d-flex justify-content-between align-items-center">
        <span class="card-price"
          >${{ productData.price.toLocaleString("es-ES") }}</span
        >
        <button
          v-if="isInCart"
          class="btn btn-danger"
          @click="removeToCart(productData)"
        >
          <i class="bx bx-minus"></i>
        </button>
        <button
          v-if="!isInCart"
          class="btn btn-primary"
          @click="addToCart(productData)"
        >
          <i class="bx bx-plus"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { ProductModel } from "@/models/product.models";
import { useStore } from "vuex";

export default defineComponent({
  name: "ProductCard",
  props: {
    cutDescription: {
      type: Boolean,
      default: false,
    },
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
  setup(props) {
    const store = useStore();

    // Computed property para verificar si el producto está en el carrito
    const isInCart = computed(() => {
      return store.state.cart.some(
        (product: ProductModel) => product.id === props.productData.id
      );
    });

    const updateCartAction = (
      product: ProductModel,
      type: "add" | "remove"
    ) => {
      store.dispatch("updateCart", { product, type });
    };

    const addToCart = (product: ProductModel) => {
      updateCartAction(product, "add");
    };

    const removeToCart = (product: ProductModel) => {
      updateCartAction(product, "remove");
    };

    return { updateCartAction, isInCart, addToCart, removeToCart };
  },
  methods: {
    cutString(text: string, cut = 80) {
      return text.substring(0, cut) + "...";
    },
  },
});
</script>
<style>
.fixed-height-description {
  height: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
