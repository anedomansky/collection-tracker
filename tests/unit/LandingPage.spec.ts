import { shallowMount } from '@vue/test-utils';
import LandingPage from '../../src/components/LandingPage.vue';

describe('LandingPage', () => {
    test('is a Vue instance', () => {
        const wrapper = shallowMount(LandingPage);
        expect(wrapper.isVueInstance()).toBeTruthy();
    });
});
