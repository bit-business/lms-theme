import Vue from 'vue';
import Vuetify from 'vuetify';

import { createLocalVue, mount } from "@vue/test-utils";
import CourseMaterial from "../../src/resources/app/pages/course/CourseMaterial";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("CourseMaterial", () => {
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
    describe("and description is NOT given", () => {
      it("should renders", async () => {
        const wrapper = await mount(CourseMaterial, {
          localVue,
          vuetify,
          store,
          data() {
            return {
              material: {
                title: "Test",
                description: null,
                topic: {
                  title: "Topic"
                }
              }
            }
          }
        });

        await expect(wrapper.find("#description").exists()).toBe(false);
      });
    });

    describe("and description is given", () => {
      it("should renders", async () => {
        const wrapper = await mount(CourseMaterial, {
          localVue,
          vuetify,
          store,
          data() {
            return {
              material: {
                title: "Test",
                content: "test description",
                topic: {
                  title: "Topic"
                }
              }
            }
          }
        });

        const description = await wrapper.find("#description");
        await expect(description.exists()).toBe(true);
        await expect(description.text()).toBe("test description");
      });
    });

    describe("header comment is exist", () => {
      it("should renders", async () => {
        const wrapper = await mount(CourseMaterial, {
          localVue,
          vuetify,
          store,
          data() {
            return {
              material: {
                title: "Test",
                content: "test description",
                topic: {
                  title: "Topic"
                }
              }
            }
          }
        });

        const commentSection = wrapper.find("#header-comment");
        await expect(commentSection.exists()).toBe(true);

        const icon = wrapper.find("#icon-comment");
        await expect(icon.exists()).toBe(true);

        const divider = wrapper.find("#divider");
        await expect(divider.exists()).toBe(true);
      });
    });
  })
})
