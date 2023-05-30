import { shallowMount, createLocalVue } from "@vue/test-utils";
import NotAuthenticated from "../../src/resources/app/components/Layout/NotAuthenticated.vue";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Not Authenticated Guard", () => {
  describe("when not authenticated", () => {
    const wrapper = shallowMount(NotAuthenticated, {
      mocks: {
        $store: {
          state: {
            isAuthenticated: false,
          },
        },
        $inertia: {
          visit: jest.fn(),
        },
      },
      localVue,
    });

    it("should pass", () => {
      expect(wrapper.vm.$inertia.visit).not.toHaveBeenCalled();
    });
  });

  describe("when authenticated", () => {
    const wrapper = shallowMount(NotAuthenticated, {
      mocks: {
        $store: {
          state: {
            isAuthenticated: true,
          },
        },
        $inertia: {
          visit: jest.fn(),
        },
      },
      localVue,
    });

    it("should redirect to homepage", () => {
      expect(wrapper.vm.$inertia.visit).toHaveBeenCalled();
    });
  });
});
