import Vuetify from "vuetify";
import { mount, createLocalVue } from "@vue/test-utils";
import AnnouncementContent from "../../../src/resources/app/components/AnnouncementContent";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("AnnouncementContent", () => {
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
    describe('and when not editing', () => {
      describe('and when announcement belong to current user', () => {
        it("should renders", async () => {
          const wrapper = mount(AnnouncementContent, {
            localVue,
            vuetify,
            store,
          });

          await wrapper.setProps({
            id: 1,
            name: 'Test announcement',
            date: 'Mon Mar 3 2020',
            content: 'Test',
            authorId: 1,
          })

          const findAuthor = wrapper.find("#author");
          await expect(findAuthor.exists()).toBe(true);

          const findDate = wrapper.find("#date");
          await expect(findDate.exists()).toBe(true);

          const findContent = wrapper.find("#content");
          await expect(findContent.exists()).toBe(true);

          const findMenu = wrapper.find("#menu");
          await expect(findMenu.exists()).toBe(true);

          const findEditForm = wrapper.find("#edit-form");
          await expect(findEditForm.exists()).toBe(false);
        });
      });

      describe("and when announcement is not belong to current user", () => {
        it('should renders', () => {
          const wrapper = mount(AnnouncementContent, {
            localVue,
            vuetify,
            store,
          });

          const findMenu = wrapper.find("#menu");
          expect(findMenu.exists()).toBe(false);
        })
      })
    });

    describe('and when editing announcement', () => {
      it("should renders", async () => {
        const wrapper = await mount(AnnouncementContent, {
          localVue,
          vuetify,
          store,
        });

        await wrapper.setData({ isEditing: true })

        const findEditForm = wrapper.find("#edit-form");
        await expect(findEditForm.exists()).toBe(true);

        const findContent = wrapper.find("#content");
        await expect(findContent.exists()).toBe(false);
      })
    })

    describe('and when editing comment', () => {
      it("should renders", async () => {
        const wrapper = await mount(AnnouncementContent, {
          localVue,
          vuetify,
          store,
        });

        await wrapper.setData({ isEditing: true, isComment: true })

        const findEditForm = wrapper.find("#edit-form");
        await expect(findEditForm.exists()).toBe(true);

        const findContent = wrapper.find("#content");
        await expect(findContent.exists()).toBe(false);

        const findButton = wrapper.find("#post-comment-button");
        await expect(findButton.exists()).toBe(true);

      })
    })
  });
});
