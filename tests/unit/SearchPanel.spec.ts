import { shallowMount } from '@vue/test-utils';
import SearchPanel from '../../src/components/SearchPanel.vue';

describe('SearchPanel', () => {
    test('is a Vue instance', () => {
        const wrapper = shallowMount(SearchPanel, {
            propsData: {
                typeValues: ['Title', 'Genre', 'Author'],
                show: true,
                category: 'books',
            },
        });
        expect(wrapper).toBeTruthy();
    });
});
