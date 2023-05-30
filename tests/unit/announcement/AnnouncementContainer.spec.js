import Vuetify from "vuetify";
import { mount, createLocalVue } from "@vue/test-utils";
import AnnouncementContainer from "../../../src/resources/app/components/Container/AnnouncementContainer";

const localVue = createLocalVue();

describe("AnnouncementContainer", () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  describe("when loaded", () => {
    it("should renders", () => {
      const wrapper = mount(AnnouncementContainer, {
        localVue,
        vuetify,
      });

      const findContainer = wrapper.find("#container");
      expect(findContainer.exists()).toBe(true);
    })
  });
})
