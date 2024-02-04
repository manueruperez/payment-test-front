import { mount } from "@vue/test-utils";
import { Store, createStore } from "vuex";
import ProductCard from "@/components/shared/ProductCard.vue";
import { Plugin } from "vue";

jest.mock(
  "@/assets/products-imgs/product_default.webp",
  () => "default_image_path"
);

describe("ProductCard component tests", () => {
  let store: Store<{ cart: never[] }> | Plugin | [Plugin, ...any[]];

  beforeEach(() => {
    store = createStore({
      state: {
        cart: [],
      },
      getters: {
        cartItemCount: (state) => state.cart.length,
      },
      actions: {
        updateCart: jest.fn(),
      },
    });
  });

  it("should renders default information when no props are provided", () => {
    const wrapper = mount(ProductCard, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.find(".card-title").text()).toBe("Estoicismo");
    expect(wrapper.find(".card-text").text()).toContain(
      "una excelente filosofia"
    );
    expect(wrapper.find(".card-price").text()).toContain("50.000");
  });

  it("should renders provided information through props", () => {
    const productData = {
      title: "Cosmopolitismo",
      description:
        "Los estoicos se consideraban ciudadanos del mundo, abogando por la igualdad de todos los seres humanos y promoviendo la idea de una comunidad global unida por la razón y la virtud.",
      price: 130,
      id: 4,
      imgUrl: "product4",
    };

    const wrapper = mount(ProductCard, {
      props: {
        productData,
        cutDescription: false,
      },
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.find(".card-title").text()).toBe(productData.title);
    expect(wrapper.find(".card-text").text()).toContain(
      productData.description
    );

    expect(wrapper.find(".card-price").text()).toContain("130");
  });

  it("should adds the product to the cart when the add button is clicked", async () => {
    const productData = {
      title: "Cosmopolitismo",
      description:
        "Los estoicos se consideraban ciudadanos del mundo, abogando por la igualdad de todos los seres humanos y promoviendo la idea de una comunidad global unida por la razón y la virtud.",
      price: 130,
      id: 4,
      imgUrl: "product4",
    };
    const mockDispatch = jest.fn();
    const store = createStore({
      state: { cart: [] },
      actions: {
        updateCart: mockDispatch,
      },
    });

    const wrapper = mount(ProductCard, {
      props: {
        productData,
        cutDescription: false,
      },
      global: {
        plugins: [store],
      },
      isInCart: false,
    });
    await wrapper.find(".btn-primary").trigger("click");
    expect(mockDispatch).toHaveBeenCalled();
  });

  it("should remove the product to the cart when the add button is clicked", async () => {
    const productData = {
      title: "Cosmopolitismo",
      description:
        "Los estoicos se consideraban ciudadanos del mundo, abogando por la igualdad de todos los seres humanos y promoviendo la idea de una comunidad global unida por la razón y la virtud.",
      price: 130,
      id: 4,
      imgUrl: "product4",
    };
    const mockDispatch = jest.fn();
    const store = createStore({
      state: { cart: [productData] },
      actions: {
        updateCart: mockDispatch,
      },
    });

    const wrapper = mount(ProductCard, {
      props: {
        productData,
        cutDescription: false,
      },
      global: {
        plugins: [store],
      },
      isInCart: true,
    });
    await wrapper.find(".btn-danger").trigger("click");
    expect(mockDispatch).toHaveBeenCalled();
  });

  it("should shows cut description when cutDescription is true", async () => {
    const productData = {
      id: 1,
      imgUrl: "product_default",
      title: "Estoicismo",
      description:
        "Esta es una descripción larga que debería ser cortada para la prueba",
      price: 50000,
    };

    const wrapper = mount(ProductCard, {
      props: {
        productData,
        cutDescription: true,
      },
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.text()).toContain("...");
  });
});
