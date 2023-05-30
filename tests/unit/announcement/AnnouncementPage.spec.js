import Vuetify from "vuetify";
import { mount , createLocalVue} from "@vue/test-utils";
import Announcement from "../../../src/resources/app/pages/course/Announcement";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Announcement", () => {
  let vuetify;
  let store;

  beforeEach(() => {
    vuetify = new Vuetify();
    store = new Vuex.Store({
      state: {
        isAuthenticated: true,
      },
    });
  });

  describe("when loaded", () => {
    it("should renders", () => {
      const wrapper = mount(Announcement, {
        localVue,
        vuetify,
        store,
      });

      const findContainer = wrapper.find("#announcement-container");
      expect(findContainer.exists()).toBe(true);
    })
  });
})
