import Vue from 'vue';
import Vuetify from 'vuetify';

import { createLocalVue, mount } from "@vue/test-utils";
import notFound from "../../src/resources/app/pages/404";

const localVue = createLocalVue();

describe("JoinCoursePage", () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  describe("when loaded", () => {
    it("should renders", () => {
      const wrapper = mount(notFound, {
        localVue,
        vuetify,
      });
      const findTitle = () => wrapper.find('#title');
      expect(findTitle().exists()).toBe(true);
      expect(findTitle().text()).toBe("404");

      const subTitle = () => wrapper.find('#sub-title');
      expect(subTitle().exists()).toBe(true);
      expect(subTitle().text()).toBe("Uh Oh! Seems like you are lost");

    });
  });
});
