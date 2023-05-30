import Vuetify from "vuetify";
import { mount, createLocalVue } from "@vue/test-utils";
import CreateAnnouncement from "../../../src/resources/app/components/CreateAnnouncement";

const localVue = createLocalVue();

describe("CreateAnnouncement", () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  describe("when loaded", () => {
    it("should renders", () => {
      const wrapper = mount(CreateAnnouncement, {
        localVue,
        vuetify,
      });

      const findInitialForm = wrapper.find("#initial-form");
      expect(findInitialForm.exists()).toBe(true);

      const initialText = wrapper.find("#initial-text");
      expect(initialText.exists()).toBe(true);
      expect(initialText.text()).toBe("Write Something");

      const findTrueForm = wrapper.find("#true-form");
      expect(findTrueForm.exists()).toBe(false);

      const findCancelButton = wrapper.find("#cancel-button");
      expect(findCancelButton.exists()).toBe(false);

      const findPostButton = wrapper.find("#post-button");
      expect(findPostButton.exists()).toBe(false);
    });
  });

  describe("when initial form is clicked", () => {
    test("should hide and load components", async() => {
      const wrapper = await mount(CreateAnnouncement, {
        localVue,
        vuetify,
      });

      await wrapper.setData({startWriting : true})

      const findInitialForm = wrapper.find("#initial-form");
      await expect(findInitialForm.exists()).toBe(false);

      const initialText = wrapper.find("#initial-text");
      await expect(initialText.exists()).toBe(false);

      const findTrueForm = wrapper.find("#true-form");
      await expect(findTrueForm.exists()).toBe(true);

      const findCancelButton = wrapper.find("#cancel-button");
      await expect(findCancelButton.exists()).toBe(true);
      await expect(findCancelButton.text()).toBe("Cancel");

      const findPostButton = wrapper.find("#post-button");
      await expect(findPostButton.exists()).toBe(true);
      await expect(findPostButton.text()).toBe("Post");
    })
  });
});
