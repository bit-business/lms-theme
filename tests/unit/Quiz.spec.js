import Vue from 'vue';
import Vuetify from 'vuetify';

import { createLocalVue, mount } from "@vue/test-utils";
import Quiz from "../../src/resources/app/pages/course/Quiz";
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
        const wrapper = await mount(Quiz, {
          localVue,
          vuetify,
          store,
          data() {
            return {
              quiz: {
                title: "Test",
                description: null,
                start_time: "2022-05-17T06:45:10.163Z",
                end_time: "2022-05-17T06:45:10.163Z",
                duration: 14460,
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
        const wrapper = await mount(Quiz, {
          localVue,
          vuetify,
          store,
          data() {
            return {
                quiz: {
                  title: "Test",
                  description: "test description",
                  start_time: "2022-05-17T06:45:10.163Z",
                  end_time: "2022-05-17T06:45:10.163Z",
                  duration: 14460,
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
  })
})
