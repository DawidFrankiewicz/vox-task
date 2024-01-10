import { mount } from '@vue/test-utils';

const factory = async () => {
    const component = await import('@/components/HelloWorld.vue');

    return mount(component.default, {
        shallow: true,
        props: {
            msg: 'Hello World!',
        },
    });
};

test('Should render correctly', async () => {
    const wrapper = await factory();

    // Check if component matches snapshot (HTML structure)
    // https://vitest.dev/guide/snapshot#updating-snapshots
    expect(wrapper.html()).toMatchSnapshot();
});
