import { shallowMount } from '@vue/test-utils';
import Item from '../../src/components/Item.vue';

describe('Item', () => {
    test('is a Vue instance', () => {
        const wrapper = shallowMount(Item, {
            propsData: {
                category: '',
                imageSrc: '',
                title: '',
                result: true,
            },
        });
        expect(wrapper).toBeTruthy();
    });
});
