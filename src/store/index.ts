import { ProductModel } from "@/models/product.models";
import { createStore } from "vuex";
import data from "../data/products.data";

interface State {
  products: ProductModel[];
}

export default createStore({
  state: {
    products: [] as ProductModel[],
  },
  getters: {
    products: (state: State) => state.products,
  },
  mutations: {
    setProducts(state: State, products: ProductModel[]) {
      state.products = products;
    },
  },
  actions: {
    fetchProducts({ commit }) {
      commit("setProducts", data.products); // Asegúrate de que 'data' es del tipo correcto (ProductModel[])
    },
  },
  modules: {},
});
