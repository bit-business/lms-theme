import Vuetify from "vuetify";
import Vuex from "vuex";
import { mount, createLocalVue } from "@vue/test-utils";
import courseStream from "../../src/resources/app/pages/courseStream";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Class Code Widget", () => {
  let vuetify;
  let store;

  beforeEach(() => {
    vuetify = new Vuetify();
    store = new Vuex.Store({
      state: {
        isAuthenticated: true,
        user: {
          id: 1,
        },
      },
    });
  });
  describe("when loaded", () => {
    it("should renders", () => {
      const wrapper = mount(courseStream, {
        localVue,
        vuetify,
        store,
        mocks: {
          window: {
            alert: () => jest.fn(),
          },
          id: 1,
        },
      });

      const findTitle = () => wrapper.find("#code-title");
      expect(findTitle().exists()).toBe(true);
      const classCode = () => wrapper.find("#class-code");
      expect(classCode().exists()).toBe(true);
      const copyBtn = () => wrapper.find("#copy-btn");
      expect(copyBtn().exists()).toBe(true);
    });
  });
  describe("When click", () => {
    it("should call function", async () => {
      window.alert = jest.fn();
      const wrapper = mount(courseStream, {
        localVue,
        vuetify,
        store,
        mocks: {
          window: {
            alert: () => jest.fn(),
          },
          id: 1,
        },
      });
      global.navigator.clipboard = {
        writeText: jest.fn(),
      };
      const copyBtn = () => wrapper.find("#copy-btn");
      copyBtn().trigger("click");
      copyBtn().vm.$emit("click");
      await wrapper.vm.$nextTick();

      expect(navigator.clipboard.writeText).toHaveBeenCalled();
    });
  });
});
