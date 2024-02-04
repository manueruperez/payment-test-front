import { mount } from "@vue/test-utils";
import MainFooter from "@/layouts/main-footer.vue";

describe("main-footer component tests", () => {
  it("renders correctly", () => {
    const wrapper = mount(MainFooter);
    expect(wrapper.text()).toContain("made whit 🤍 by manueruperez");
  });
});
