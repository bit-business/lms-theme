import Vuetify from "vuetify";
import Vuex from "vuex";
import { mount, createLocalVue } from "@vue/test-utils";

import { createCourse } from "../../../src/resources/api/course/create";
import CreateCourse from "  ../../../src/resources/app/pages/course/CreateCourse";

Object.defineProperty(window, "location", {
  writable: true,
  value: { assign: jest.fn() },
});

const localVue = createLocalVue();
localVue.use(Vuex);

jest.mock("../../../src/resources/api/course/create", () => ({
  createCourse: jest.fn(),
}));

describe("CreateCourse.vue", () => {
  let vuetify;
  let store;

  beforeEach(() => {
    vuetify = new Vuetify();
    store = new Vuex.Store({
      state: {
        isAuthenticated: false,
      },
    });
  });

  it("should render correct forms", () => {
    const wrapper = mount(CreateCourse, {
      localVue,
      vuetify,
      store,
    });

    expect(wrapper.find("#title").text()).toBeTruthy();
    expect(wrapper.find("#name-form").exists()).toBe(true);
    expect(wrapper.find("#subject-form").exists()).toBe(true);
    expect(wrapper.find("#room-form").exists()).toBe(true);
    expect(wrapper.find("#cancel-btn").exists()).toBe(true);
    expect(wrapper.find("#create-btn").exists()).toBe(true);
  });

  describe("when user is not authenticated", () => {
    it("should redirect to login page", () => {
      Object.defineProperty(window, "location", {
        writable: true,
        value: { assign: jest.fn() },
      });

      const wrapper = mount(CreateCourse, {
        localVue,
        vuetify,
        store,
      });

      expect(window.location.assign).toHaveBeenCalledWith("/login");
    });
  });

  describe("when user is authenticated", () => {
    it("should not redirect anywhere", async () => {
      Object.defineProperty(window, "location", {
        writable: true,
        value: { assign: jest.fn() },
      });

      store.state.isAuthenticated = true;

      const wrapper = mount(CreateCourse, {
        localVue,
        vuetify,
        store,
      });

      expect(window.location.assign).not.toHaveBeenCalled();
    });
  });

  describe("when all fields are filled", () => {
    it("form should be valid", async () => {
      const wrapper = mount(CreateCourse, {
        vuetify,
        localVue,
        store,
      });

      wrapper.setData({
        form: {
          values: {
            name: "Test Course",
            subject: "Test Subject",
            room: "Test Room",
          },
        },
      });

      expect(wrapper.vm.form.isValid).toBe(true);
    });
  });

  describe("when submitted successfully", () => {
    it("should redirect to course page", async () => {
      Object.defineProperty(window, "location", {
        writable: true,
        value: { assign: jest.fn() },
      });

      const wrapper = mount(CreateCourse, {
        localVue,
        vuetify,
        store,
        mocks: {
          window,
        },
      });

      createCourse.mockReturnValueOnce({
        data: {
          id: 1,
        },
        error: null,
        errorMessage: null,
      });

      wrapper.setData({
        form: {
          values: {
            name: "Test Course",
            subject: "Test Subject",
            room: "Test Room",
          },
        },
      });

      wrapper.find("#create-btn").vm.$emit("click");
      await wrapper.vm.$nextTick();

      expect(window.location.assign).toHaveBeenCalledWith("/course/1");
    });
  });

  describe("when submission is failed", () => {
    it("should display snackbar with error message", async () => {
      const wrapper = mount(CreateCourse, {
        localVue,
        vuetify,
        store,
      });

      createCourse.mockReturnValueOnce({
        data: null,
        error: true,
        errorMessage: "Test Error",
      });

      wrapper.setData({
        form: {
          values: {
            name: "Test Course",
            subject: "Test Subject",
            room: "Test Room",
          },
        },
      });

      expect(wrapper.vm.snackbar.isVisible).toBe(false);
      wrapper.find("#create-btn").vm.$emit("click");
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.snackbar.isVisible).toBe(true);
      expect(wrapper.vm.snackbar.text).toBe("Test Error");
    });
  });

  describe("when cancel button is clicked", () => {
    it("should redirect to home page", async () => {
      Object.defineProperty(window, "location", {
        writable: true,
        value: { assign: jest.fn() },
      });

      const wrapper = mount(CreateCourse, {
        localVue,
        vuetify,
        store,
        mocks: {
          window,
        },
      });

      wrapper.find("#cancel-btn").vm.$emit("click");
      await wrapper.vm.$nextTick();

      expect(window.location.assign).toHaveBeenCalledWith("/");
    });
  });
});
