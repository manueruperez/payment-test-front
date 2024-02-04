import { Store, createStore } from "vuex";
import { mount } from "@vue/test-utils";
import HomeView from "@/views/HomeView.vue";
import ProductList from "@/components/shared/ProductList.vue";
import { Plugin } from "vue";

// Mock de componentes hijos si es necesario
jest.mock("@/components/shared/ProductList.vue", () => ({
  name: "ProductList",
  template: '<div class="mockedProductList"></div>',
}));

describe("HomeView component tests", () => {
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

  it("renders ProductList component", () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [store],
        stubs: ["ProductList"],
      },
    });
    expect(wrapper.findComponent(ProductList).exists()).toBe(true);
  });

  it('dispatches "fetchProducts" action on mounted', async () => {
    mount(HomeView, {
      global: {
        plugins: [store],
        stubs: ["ProductList"],
      },
    });
    expect(actions.fetchProducts).toHaveBeenCalled();
  });
});
