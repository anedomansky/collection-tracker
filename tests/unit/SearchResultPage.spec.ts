import { shallowMount } from '@vue/test-utils';
import SearchResultPage from '../../src/components/SearchResultPage.vue';

describe('SearchResultPage', () => {
    test('is a Vue instance', () => {
        const wrapper = shallowMount(SearchResultPage, {
            propsData: {
                category: '',
                type: '',
                term: '',
            },
        });
        expect(wrapper).toBeTruthy();
    });
});
