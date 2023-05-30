import Vue from 'vue';
import Vuetify from 'vuetify';

import {createLocalVue, mount} from "@vue/test-utils";
import EditCourseMaterial from "../../src/resources/app/pages/course/EditCourseMaterial.vue";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("EditCourseMaterial", () => {
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
      const wrapper = mount(EditCourseMaterial, {
        localVue,
        vuetify,
        store,
      });

      const dropDown = () => wrapper.find("#drop-down");
      expect(dropDown().exists()).toBe(true);

      expect(wrapper.find("#title-form").exists()).toBe(true);
      expect(wrapper.find("#description").exists()).toBe(true);

      const cancelButton = () => wrapper.find("#cancel-button");
      expect(cancelButton().exists()).toBe(true);
      expect(cancelButton().text()).toBe("Cancel");

      const createButton = () => wrapper.find("#update-button");
      expect(createButton().exists()).toBe(true);
      expect(createButton().text()).toBe("Update");
    })
  })
})
