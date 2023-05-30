import Vuetify from "vuetify";
import Vuex from "vuex";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Snackbar from "../../src/resources/app/components/Snackbar.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("App Layout.vue", () => {
  let vuetify;
  let store;

  beforeEach(() => {
    vuetify = new Vuetify();
    store = new Vuex.Store({
      state: {
        snackbar: {
          isVisible: true,
          content: "Test",
        },
      },
    });
  });

  it("should contains snackbar component", () => {
    const wrapper = shallowMount(Snackbar, {
      localVue,
      vuetify,
      store,
    });

    expect(wrapper.find(".snackbar").exists()).toBe(true);
  });

  it("should contains snackbar content", () => {
    const wrapper = shallowMount(Snackbar, {
      localVue,
      vuetify,
      store,
    });

    expect(wrapper.find("#snackbar-content").text()).toBe("Test");
  });
});
