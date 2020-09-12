import { shallowMount } from '@vue/test-utils';
import Button from '../../src/components/Button.vue';

describe('Button', () => {
    test('is a Vue instance', () => {
        const wrapper = shallowMount(Button);
        expect(wrapper).toBeTruthy();
    });
});
