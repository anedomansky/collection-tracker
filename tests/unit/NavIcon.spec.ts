import { shallowMount } from '@vue/test-utils';
import NavIcon from '../../src/components/NavIcon.vue';

describe('NavIcon', () => {
    test('is a Vue instance', () => {
        const wrapper = shallowMount(NavIcon, {
            propsData: {
                icon: 'home.svg',
                altText: 'Home',
                to: '/',
            },
            stubs: ['router-link'],
        });
        expect(wrapper).toBeTruthy();
    });
});
