import { mount } from "@vue/test-utils";
import MainLayout from "@/layouts/main-layout.vue";
import MainHeader from "@/layouts/main-header.vue";
import MainFooter from "@/layouts/main-footer.vue";

jest.mock("@/layouts/main-header.vue", () => ({
  name: "MainHeader",
  template: "<div/>",
}));

jest.mock("@/layouts/main-footer.vue", () => ({
  name: "MainFooter",
  template: "<div/>",
}));

describe("MainLayout", () => {
  it("renders header and footer components", () => {
    const wrapper = mount(MainLayout, {
      global: {
        stubs: {
          MainHeader: true,
          MainFooter: true,
          RouterView: true,
        },
      },
    });

    expect(wrapper.findComponent(MainHeader).exists()).toBe(true);
    expect(wrapper.findComponent(MainFooter).exists()).toBe(true);
    expect(wrapper.find(".flex-grow-1").exists()).toBe(true);
  });
});
