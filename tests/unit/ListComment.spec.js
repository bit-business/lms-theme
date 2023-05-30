import Vuetify from "vuetify";
import { mount, createLocalVue } from "@vue/test-utils";
import ListComment from "../../src/resources/app/components/ListComment";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("ListComment", () => {
    let vuetify;
    let store;

    beforeEach(() => {
        vuetify = new Vuetify();
        store = new Vuex.Store({
            state: {
                user: { id: 1, name: 'Test' }
            },
        });
    });

    describe("when loaded", () => {
        describe('and when comment exist', () => {
            it("should renders", async () => {
                const wrapper = mount(ListComment, {
                    localVue,
                    vuetify,
                    store,
                });

                await wrapper.setProps({
                    name: 'Human',
                    date: '2022-04-21T20:20:28.000000Z',
                    content: 'Test',
                })

                const findAuthor = wrapper.find("#author");
                await expect(findAuthor.exists()).toBe(true);

                const findDate = wrapper.find("#date");
                await expect(findDate.exists()).toBe(true);

                const findContent = wrapper.find("#content");
                await expect(findContent.exists()).toBe(true);
            });
        });
    });
});
