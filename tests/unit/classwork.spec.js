import Vuetify from "vuetify";
import { mount, createLocalVue } from "@vue/test-utils";
import ClassworkPage from "../../src/resources/app/pages/ClassworkPage";
import CreateTopic from "../../src/resources/app/pages/CreateTopic";
import UpdateTopic from "../../src/resources/app/pages/UpdateTopic";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("ClassworkPage", () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  describe("when loaded", () => {
    describe("and current user is course creator", () => {
      it("should renders", async () => {
        const wrapper = mount(ClassworkPage, {
          localVue,
          vuetify,
        });

        await wrapper.setData({userIsTeacher: true});

        const findCreateButton = wrapper.find("#create-button");
        await expect(findCreateButton.exists()).toBe(true);
        await expect(findCreateButton.text()).toBe("+ Create");
      })
    });

    describe("and current user is not course creator", () => {
      it("should renders", async () => {
        const wrapper = mount(ClassworkPage, {
          localVue,
          vuetify,
        });

        await expect(wrapper.find("#create-button").exists()).toBe(false);
      })
    });

    describe("and lesson material exists", () => {
      it("should renders", async () => {
        const wrapper = mount(ClassworkPage, {
          localVue,
          vuetify,
        });

        await  wrapper.setData({
          topics: [
            {
              lessonMaterials: [
                {
                  id: 1,
                  topicId: 1,
                  createdAt: "2022-04-21T20:20:28.000000Z",
                  title: "Test"
                }
              ]
            }
          ]
        })

        const findLessonMaterial = wrapper.find("#lesson-material");
        await expect(findLessonMaterial.exists()).toBe(true);
      });
    });

    describe("and lesson material does not exist", () => {
      it("should renders", async () => {
        const wrapper = mount(ClassworkPage, {
          localVue,
          vuetify,
        });

        const findLessonMaterial = wrapper.find("#lesson-material");
        await expect(findLessonMaterial.exists()).toBe(false);
      });
    });
  });
});

describe("CreateTopic", () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  describe("when loaded", () => {
    it("should renders", async () => {
      const wrapper = mount(CreateTopic, {
        localVue,
        vuetify,
      });

      const findBackBtn = wrapper.find("#back-btn");
      await expect(findBackBtn.exists()).toBe(true);
      await expect(findBackBtn.text()).toBe("< Back");

      const findCreateText = wrapper.find("#create-topic-text");
      await expect(findCreateText.exists()).toBe(true);
      await expect(findCreateText.text()).toBe("Create Topic");

      const findTitleField = wrapper.find("#title-field");
      await expect(findTitleField.exists()).toBe(true);

      const findCancelBtn = wrapper.find("#cancel-btn");
      await expect(findCancelBtn.exists()).toBe(true);
      await expect(findCancelBtn.text()).toBe("Cancel");

      const findCreateBtn = wrapper.find("#create-btn");
      await expect(findCreateBtn.exists()).toBe(true);
      await expect(findCreateBtn.text()).toBe("Create");
    })
  })

  describe("UpdateTopic", () => {
    let vuetify;

    beforeEach(() => {
      vuetify = new Vuetify();
    });

    describe("when loaded", () => {
      it("should renders", async () => {
        const wrapper = mount(UpdateTopic, {
          localVue,
          vuetify,
        });

        const findBackBtn = wrapper.find("#back-btn");
        await expect(findBackBtn.exists()).toBe(true);
        await expect(findBackBtn.text()).toBe("< Back");

        const findUpdateText = wrapper.find("#update-topic-text");
        await expect(findUpdateText.exists()).toBe(true);
        await expect(findUpdateText.text()).toBe("Update Topic");

        const findTitleField = wrapper.find("#title-field");
        await expect(findTitleField.exists()).toBe(true);

        const findCancelBtn = wrapper.find("#cancel-btn");
        await expect(findCancelBtn.exists()).toBe(true);
        await expect(findCancelBtn.text()).toBe("Cancel");

        const findUpdateBtn = wrapper.find("#update-btn");
        await expect(findUpdateBtn.exists()).toBe(true);
        await expect(findUpdateBtn.text()).toBe("Update");
      })
    })
  })
})
