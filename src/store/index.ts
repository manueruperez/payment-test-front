import { ProductModel } from "@/models/product.models";
import { createStore } from "vuex";
import data from "../data/products.data";

interface State {
  products: ProductModel[];
  cart: ProductModel[];
}

export default createStore({
  state: {
    products: [] as ProductModel[],
    cart: [] as ProductModel[],
  },
  getters: {
    products: (state: State) => state.products,
    cart: (state: State) => state.cart,
  },
  mutations: {
    setProducts(state: State, products: ProductModel[]) {
      state.products = products;
    },
    addProductToCart(state: State, product: ProductModel) {
      const productExists = state.cart.some((p) => p.id === product.id);
      if (!productExists) {
        state.cart.push(product);
      }
    },
    removeProductFromCart(state: State, productId: number) {
      const productIndex = state.cart.findIndex((p) => p.id === productId);
      if (productIndex !== -1) {
        state.cart.splice(productIndex, 1);
      }
    },
  },
  actions: {
    fetchProducts({ commit }) {
      commit("setProducts", data.products);
    },
    updateCart(
      { commit },
      cartData: { product: ProductModel; type: "remove" | "add" }
    ) {
      if (cartData.type === "add") {
        commit("addProductToCart", cartData.product);
      } else {
        commit("removeProductFromCart", cartData.product.id);
      }
    },
  },
  modules: {},
});
