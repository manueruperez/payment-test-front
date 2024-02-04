import { mount } from "@vue/test-utils";
import ProductList from "@/components/shared/ProductList.vue";
import NoContent from "@/components/shared/NoContent.vue";
import ProductCard from "@/components/shared/ProductCard.vue";
import { Store, createStore } from "vuex";

describe("ProductList component test", () => {
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
  it("should shows NoContent component when there are no products", () => {
    const wrapper = mount(ProductList, {
      props: {},
    });
    expect(wrapper.findComponent(NoContent).exists()).toBe(true);
  });

  it("should renders ProductCard for each product when there are products", () => {
    const productListData = [
      {
        title: "Virtud",
        description:
          "Consideraban que la virtud era el bien más alto y el único bien en realidad. La justicia, la templanza, la valentía y la sabiduría eran las principales virtudes que promovían, creyendo que la virtud era suficiente para la felicidad.",
        price: 100000,
        id: 1,
        imgUrl: "product1",
      },
      {
        title: "Ataraxia (Imperturbabilidad)",
        description:
          "Buscaban alcanzar un estado de serenidad y paz interior, libre de perturbaciones emocionales, a través de la aceptación de lo que no se puede cambiar y el enfoque en lo que sí está bajo nuestro control.",
        price: 120000,
        id: 2,
        imgUrl: "product2",
      },
    ];
    const store = createStore({
      state: { cart: [] },
    });

    const wrapper = mount(ProductList, {
      props: {
        productListData,
      },
      global: {
        plugins: [store],
      },
    });

    const productCards = wrapper.findAllComponents(ProductCard);
    expect(productCards).toHaveLength(productListData.length);
    productCards.forEach((productCardWrapper, index) => {
      expect(productCardWrapper.props("productData")).toEqual(
        productListData[index]
      );
    });
  });
});
