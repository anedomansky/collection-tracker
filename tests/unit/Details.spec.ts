import { shallowMount } from '@vue/test-utils';
import Details from '@/components/Details.vue';

describe('Details.vue', () => {
    it('renders props.src when passed', () => {
        const src = 'test';
        const wrapper = shallowMount(Details, {
            props: {
                imgSrc: 'test',
                result: true,
            },
        });
        expect(wrapper.find('.details__cover').find('img').attributes('src')).toMatch(src);
    });
});
