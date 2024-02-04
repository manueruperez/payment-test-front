import { mount } from "@vue/test-utils";
import { Store, createStore } from "vuex";
import BuyCartView from "@/views/BuyCartView.vue";
import ProductCard from "@/components/shared/ProductCard.vue";

describe("BuyCartView component tests", () => {
  let actions: { fetchProducts: any };
  let getters: { products: any };
  let store: Store<unknown> | Plugin | [Plugin, ...any[]];

  beforeEach(() => {
    actions = {
      fetchProducts: jest.fn(),
    };
    getters = {
      products: () => [{ id: 1, title: "Producto 1" }],
    };

    store = createStore({
      actions,
      getters,
    });
  });

  it("shows message when cart is empty", () => {
    const storeCustome = createStore({ getters: { cart: () => [] } });

    const wrapper = mount(BuyCartView, {
      global: {
        plugins: [storeCustome],
      },
    });

    expect(wrapper.text()).toContain("No hay productos en el carrito");
    expect(wrapper.findComponent(ProductCard).exists()).toBe(false);
  });

  it("renders ProductCard for each product in the cart", () => {
    const products = [
      {
        id: 1,
        title: "Producto 1",
        imgUrl: "product1",
        description: "Descripción 1",
        price: 100,
      },
      {
        id: 2,
        title: "Producto 2",
        imgUrl: "product1",
        description: "Descripción 2",
        price: 200,
      },
    ];

    const storeCustome = createStore({
      state: {
        cart: products,
      },
      actions: {
        updateCart: jest.fn(),
      },
      getters: {
        cart: () => products,
        cartItemCount: () => 5,
      },
    });

    const wrapper = mount(BuyCartView, {
      global: {
        plugins: [storeCustome],
      },
    });

    expect(wrapper.findAllComponents(ProductCard)).toHaveLength(
      products.length
    );
    products.forEach((product, index) => {
      const productCard = wrapper.findAllComponents(ProductCard)[index];
      expect(productCard.props("productData")).toEqual(product);
    });
  });
});
