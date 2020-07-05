import { shallowMount } from '@vue/test-utils';
import Nav from '../../src/components/Nav.vue';

describe('Nav', () => {
    test('is a Vue instance', () => {
        const wrapper = shallowMount(Nav);
        expect(wrapper).toBeTruthy();
    });
});
