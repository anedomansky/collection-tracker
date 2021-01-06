import { shallowMount } from '@vue/test-utils';
import Nav from '@/components/Nav.vue';

describe('Nav.vue', () => {
    it('renders when passed', () => {
        const wrapper = shallowMount(Nav);
        expect(wrapper).toBeTruthy();
    });
});
