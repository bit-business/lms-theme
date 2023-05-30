import { mount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import Register from "../../src/resources/app/pages/register.vue";

jest.mock('../../src/resources/api/auth');
const localVue = createLocalVue();

describe("Register", () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  describe("when loaded", () => {
    it("has all of the required elements", () => {
      const wrapper = mount(Register, {
        localVue,
        vuetify,
      });

      expect(wrapper.find("#input-fullname").exists()).toBe(true);
      expect(wrapper.find("#input-username").exists()).toBe(true);
      expect(wrapper.find("#input-email").exists()).toBe(true);
      expect(wrapper.find("#input-password").exists()).toBe(true);
      expect(wrapper.find("#input-password-confirmation").exists()).toBe(true);
      expect(wrapper.find("#btn-register").exists()).toBe(true);
      expect(wrapper.find("#btn-register").text()).toContain("Register");
      expect(wrapper.find("#btn-login").exists()).toBe(true);
      expect(wrapper.find("#btn-login").text()).toContain("Login");
    });
  });

  describe("when sending request", () => {
    
    it("should show loading on button", async () => {
      const wrapper = mount(Register, {
        localVue,
        vuetify,
        data() {
          return {
            loading: false,
          };
        },
      });
      await wrapper.setData({ loading: true });
      expect(wrapper.find("#loading-icon").exists()).toBe(true);
    });
  });
});
