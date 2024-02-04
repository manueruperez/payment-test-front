import { mount } from "@vue/test-utils";
import { Store } from "vuex";
import mainHeader from "@/layouts/main-header.vue";
import { createStore } from "vuex";
import { Plugin } from "vue";

describe("mainHeader component tests", () => {
  let store: Store<{ cart: never[] }> | Plugin | [Plugin, ...any[]];
  let state: { cart: any };

  beforeEach(() => {
    state = {
      cart: [],
    };

    store = createStore({
      state,
      getters: {
        cartItemCount: (state) => state.cart.length,
      },
    });
  });

  it("renders and shows cart item count", () => {
    state.cart = [
      {
        title: "Cosmopolitismo",
        description:
          "Los estoicos se consideraban ciudadanos del mundo, abogando por la igualdad de todos los seres humanos y promoviendo la idea de una comunidad global unida por la razón y la virtud.",
        price: 130,
        id: 4,
        imgUrl: "product4",
      },
    ];
    const wrapper = mount(mainHeader, {
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.find(".badge").text()).toEqual(state.cart.length.toString());
  });

  it("does not show cart item count badge when cart is empty", () => {
    const wrapper = mount(mainHeader, {
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.find(".badge").exists()).toBe(false);
  });
  it("navigates to buy-cart page on button click", async () => {
    const mockRoutePush = jest.fn();
    const wrapper = mount(mainHeader, {
      global: {
        mocks: {
          $router: {
            push: mockRoutePush,
          },
        },
        plugins: [store],
      },
    });

    await wrapper.find("button").trigger("click");
    expect(mockRoutePush).toHaveBeenCalledWith("/buy-cart");
  });
});
