import { shallowMount } from '@vue/test-utils';
import Details from '../../src/components/Details.vue';

describe('Details', () => {
    test('is a Vue instance', () => {
        const wrapper = shallowMount(Details, {
            propsData: {
                item: null,
                result: true,
                imgSrc: '',
            },
        });
        expect(wrapper).toBeTruthy();
    });
});