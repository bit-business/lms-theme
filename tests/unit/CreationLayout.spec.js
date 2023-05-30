import Vue from 'vue';
import Vuetify from 'vuetify';

import {createLocalVue, mount} from "@vue/test-utils";
import CreationLayout from "../../src/resources/app/components/Layout/CreationLayout";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("CreationLayout", () => {
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
    describe("and topic title and content type is NOT given", () => {
      it("should renders", () => {
        const wrapper = mount(CreationLayout, {
          localVue,
          vuetify,
          store,
          propsData: {
            courseId: 1,
            pageTitle: "Create Material",
          },
        });

        const backButton = () => wrapper.find("#back");
        expect(backButton().exists()).toBe(true);
        expect(backButton().text()).toBe("Back");

        const title = () => wrapper.find("#title");
        expect(title().exists()).toBe(true);
        expect(title().text()).toBe("Create Material");

        expect(wrapper.find("#divider").exists()).toBe(true);
        expect(wrapper.find("#topic-title").exists()).toBe(false);
        expect(wrapper.find("#menu").exists()).toBe(false);
      });
    });

    describe("and topic title and content type is given", () => {
      it("should renders", () => {
        const wrapper = mount(CreationLayout, {
          localVue,
          vuetify,
          store,
          propsData: {
            courseId: 1,
            pageTitle: "Network Address Translation",
            topicTitle: "Software Engineering",
            contentType: "material",
          },
        });

        const topicTitle = () => wrapper.find("#topic-title");
        expect(topicTitle().exists()).toBe(true);
        expect(topicTitle().text()).toBe("Software Engineering");
        expect(wrapper.find("#menu").exists()).toBe(true);
      })
    })
  })
})
