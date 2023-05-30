import { mount } from "@vue/test-utils";
import PeopleInCourse from "../../src/resources/app/pages/PeopleInCourse";

describe("PeopleInCourse", () => {
    describe("when loaded", () => {
        it("should renders", () => {
            const wrapper = mount(PeopleInCourse, {});
            expect(wrapper.find('#title').exists()).toBe(true);
            expect(wrapper.findAll('#title').at(0).text()).toContain('Teachers');
            expect(wrapper.findAll('#title').at(1).text()).toContain('Classmates');
            expect(wrapper.findAll('#name').exists()).toBe(true);
            expect(wrapper.findAll('#avatar').exists()).toBe(true);
        });
    })
});
