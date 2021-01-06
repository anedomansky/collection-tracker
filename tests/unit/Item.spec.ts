import { shallowMount } from '@vue/test-utils';
import Item from '@/components/Item.vue';

describe('Item.vue', () => {
    it('renders props.title when passed', () => {
        const testTitle = 'testTitle';
        const wrapper = shallowMount(Item, {
            props: {
                category: 'testCategory',
                title: 'testTitle',
                result: true,
            },
        });
        expect(wrapper.find('.item__title').text()).toMatch(testTitle);
    });
});
