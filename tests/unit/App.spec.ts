import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';

describe('App.vue', () => {
    it('renders when passed', () => {
        const wrapper = shallowMount(App, {
            global: {
                stubs: ['router-link', 'router-view'],
            },
        });
        expect(wrapper).toBeTruthy();
    });
});
