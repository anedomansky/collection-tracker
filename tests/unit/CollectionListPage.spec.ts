import { shallowMount } from '@vue/test-utils';
import CollectionListPage from '../../src/components/CollectionListPage.vue';

describe('CollectionListPage', () => {
    test('is a Vue instance', () => {
        const wrapper = shallowMount(CollectionListPage);
        expect(wrapper).toBeTruthy();
    });
});
