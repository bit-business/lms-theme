import Vue from 'vue';
import Vuetify from 'vuetify';

import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import Assignment from "../../src/resources/app/pages/course/Assignment";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("View Assignment", () => {
    let vuetify;
    let store;

    beforeEach(() => {
        vuetify = new Vuetify();
        store = new Vuex.Store({
            state: {
                isAuthenticated: true,
                user: {
                    id: 1,
                }
            },
        });
    });

    describe("when loaded", () => {
        it("should renders all form inputs", () => {
            const wrapper = mount(Assignment, {
                localVue,
                vuetify,
                store,
                props: {
                    id: 1,
                }
            });

            expect(wrapper.find("#description").exists()).toBe(true);

            const cancelButton = () => wrapper.find("#cancel-button");
            expect(cancelButton().exists()).toBe(true);
            expect(cancelButton().text()).toBe("Cancel");

            const createButton = () => wrapper.find("#create-button");
            expect(createButton().exists()).toBe(true);
            expect(createButton().text()).toBe("Create");
        })
    })
})
