import { mount } from '@vue/test-utils';
import { test, expect } from 'vitest';

const factory = async () => {
    const component = await import('@/App.vue');

    return mount(component.default, {
        shallow: true,
    });
};

test('Should render correctly', async () => {
    const wrapper = await factory();

    // Check if component matches snapshot (HTML structure)
    // https://vitest.dev/guide/snapshot#updating-snapshots
    expect(wrapper.html()).toMatchSnapshot();
});
