import Vuetify from "vuetify";
import Vuex from "vuex";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Sidebar from "../../src/resources/app/components/Sidebar.vue";
import api from "../../src/resources/api/view";

jest.mock("../../src/resources/api/view", () => ({
  view: jest.fn(),
}));

const localVue = createLocalVue();
localVue.use(Vuex);

describe("App Layout.vue", () => {
  let vuetify;
  let store;

  beforeEach(() => {
    vuetify = new Vuetify();
    store = new Vuex.Store({
      state: {
        isAuthenticated: true,
        user: {
          avatar: "test",
          name: "test name",
        },
      },
    });
  });

  it("should contains navigation drawer", () => {
    const wrapper = shallowMount(Sidebar, {
      localVue,
      vuetify,
      store,
    });

    expect(wrapper.find(".nav-drawer").exists()).toBe(true);
  });

  it("should contains user's name", () => {
    const wrapper = shallowMount(Sidebar, {
      localVue,
      vuetify,
      store,
    });

    expect(wrapper.find(".user-name").text()).toBe("test name");
  });

  it("should fetch courses data", () => {
    const wrapper = shallowMount(Sidebar, {
      localVue,
      vuetify,
      store,
    });

    expect(api.view).toHaveBeenCalled();
  });

  it("should contains logout button", () => {
    const wrapper = shallowMount(Sidebar, {
      localVue,
      vuetify,
      store,
    });

    wrapper.setData({
      mini: false,
    });

    expect(wrapper.find(".logout").text()).toContain("mdi-logout");
  });
});
