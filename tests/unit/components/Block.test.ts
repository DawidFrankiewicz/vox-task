import { mount } from '@vue/test-utils';
import { v4 as uuidv4 } from 'uuid';
import { test, expect, describe } from 'vitest';

const factory = async () => {
    const component = await import('@/components/Block.vue');

    return mount(component.default, {
        shallow: true,
        props: {
            id: uuidv4(),
            backgroundColor: '#000000',
        },
    });
};

test('Should render correctly', async () => {
    const wrapper = await factory();

    // Check if component matches snapshot (HTML structure)
    // https://vitest.dev/guide/snapshot#updating-snapshots
    expect(wrapper.html()).toMatchSnapshot();
});

test('Should emit removeBlock event', async () => {
    const wrapper = await factory();

    const button = wrapper.find('[data-test-id="removeBlockButton"]');
    await button.trigger('click');

    expect(wrapper.emitted('removeBlock')).toBeTruthy();
});

describe('Color editing', async () => {
    test('Should emit editBlock event on input change', async () => {
        const wrapper = await factory();

        const colorInput = wrapper.find('[data-test-id="colorPickerInput"]');
        await colorInput.setValue('#ffffff');

        const emittedEvent = wrapper.emitted('editBlock');
        expect(emittedEvent).toBeDefined();
        // Check if the emitted event has the correct values
        if (emittedEvent) {
            expect(emittedEvent[0][0]).toBe(wrapper.vm.$props.id);
            expect(emittedEvent[0][1]).toBe('#ffffff');
        }
    });

    test('Should not emit editBlock event with invalid color', async () => {
        const wrapper = await factory();

        // Use editBlock method directly
        (wrapper.vm as any).editBlock(wrapper.vm.$props.id, 'notValidHexColor');
        await wrapper.vm.$nextTick();

        expect(wrapper.emitted('editBlock')).toBe(undefined);
    });
});
