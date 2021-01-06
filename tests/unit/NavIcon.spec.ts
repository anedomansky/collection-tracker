import { shallowMount } from '@vue/test-utils';
import NavIcon from '@/components/NavIcon.vue';

describe('NavIcon.vue', () => {
    it('renders props.altText when passed', () => {
        const wrapper = shallowMount(NavIcon, {
            props: {
                icon: 'home.svg',
                altText: 'testAltText',
                to: 'testTo',
            },
            global: {
                stubs: ['router-link'],
            },
        });
        expect(wrapper).toBeTruthy();
    });
});
