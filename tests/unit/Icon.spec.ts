import { shallowMount } from '@vue/test-utils';
import Icon from '../../src/components/Icon.vue';

describe('Icon', () => {
    test('is a Vue instance', () => {
        const wrapper = shallowMount(Icon, {
            propsData: {
                icon: 'home.svg',
                altText: 'Home',
                to: '/',
            },
        });
        expect(wrapper.isVueInstance()).toBeTruthy();
    });
});
