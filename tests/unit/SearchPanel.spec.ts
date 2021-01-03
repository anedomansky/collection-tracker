import { shallowMount } from '@vue/test-utils';
import SearchPanel from '@/components/SearchPanel.vue';

describe('SearchPanel.vue', () => {
    it('renders correct type when passed', () => {
        const testType = 'Title';
        const wrapper = shallowMount(SearchPanel, {
            props: {
                typeValues: ['Title'],
                show: true,
                category: 'testCategory',
            },
        });
        expect(wrapper.find('.type').find('option').text()).toMatch(testType);
    });
});
