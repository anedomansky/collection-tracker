import { shallowMount } from '@vue/test-utils';
import Button from '@/components/Button.vue';

describe('Button.vue', () => {
    it('renders when passed', () => {
        const wrapper = shallowMount(Button);
        expect(wrapper).toBeTruthy();
    });
});
