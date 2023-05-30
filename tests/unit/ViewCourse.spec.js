import Vuetify from "vuetify";
import { mount, createLocalVue } from "@vue/test-utils";

import ViewCourse from "../../src/resources/app/pages/ViewCourse";

const localVue = createLocalVue();

describe("ViewCourse Component", () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  describe("when loaded", () => {
    it("should renders", () => {
      const wrapper = mount(ViewCourse, {
        localVue,
        vuetify,
        mocks: {
          $store: {
            state: {
              isAuthenticated: true,
            },
          },
        },
      });

      const findCard1 = () => wrapper.find("#course-card");
      expect(findCard1().exists()).toBe(true);

      const findCard2 = () => wrapper.find("#add-course-card");
      expect(findCard2().exists()).toBe(true);
    });
  });

  describe("when user is not authenticated", () => {
    it("should redirect to login page", () => {
      const mockInertiaVisit = jest.fn();
      const wrapper = mount(ViewCourse, {
        localVue,
        vuetify,
        mocks: {
          $store: {
            state: {
              isAuthenticated: false,
            },
          },
          $inertia: {
            visit: mockInertiaVisit,
          },
        },
      });

      expect(mockInertiaVisit).toHaveBeenCalledWith("/login");
    });
  });

  describe("when user is authenticated", () => {
    it("should not redirect anywhere", () => {
      const mockInertiaVisit = jest.fn();
      const wrapper = mount(ViewCourse, {
        localVue,
        vuetify,
        mocks: {
          $store: {
            state: {
              isAuthenticated: true,
            },
          },
          $inertia: {
            visit: mockInertiaVisit,
          },
        },
      });

      expect(mockInertiaVisit).not.toHaveBeenCalled();
    });
  });
});
