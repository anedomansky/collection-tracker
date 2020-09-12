import { shallowMount } from '@vue/test-utils';
import DetailsPage from '../../src/components/DetailsPage.vue';

describe('DetailsPage', () => {
    test('is a Vue instance', () => {
        const wrapper = shallowMount(DetailsPage, {
            propsData: {
                category: '',
                title: '',
                result: true,
            },
        });
        expect(wrapper).toBeTruthy();
    });
});
