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

    expect(wrapper.emitted('removeBlock')).toBeDefined();
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

describe('Drag and drop', async () => {
    // Drag and drop data transfers are not supported by JSDOM
    // So we need to mock dataTransfer

    test('Should emit swapPositions event on drop', async () => {
        const wrapper = await factory();
        const otherBlockWrapper = await factory();

        await otherBlockWrapper.trigger('dragstart', {
            dataTransfer: {
                setData: () => otherBlockWrapper.vm.$props.id,
            },
        });

        const block = wrapper.find('[data-test-id="block"]');
        await block.trigger('drop', {
            dataTransfer: {
                getData: () => otherBlockWrapper.vm.$props.id,
            },
        });

        const emittedEvent = wrapper.emitted('swapPositions');
        expect(emittedEvent).toBeDefined();
        // Check if the emitted event has the correct values
        if (emittedEvent) {
            expect(emittedEvent[0][0]).toBe(otherBlockWrapper.vm.$props.id);
            expect(emittedEvent[0][1]).toBe(wrapper.vm.$props.id);
        }
    });

    test('Should not emit swapPositions event when dropped on itself', async () => {
        const wrapper = await factory();

        await wrapper.trigger('dragstart', {
            dataTransfer: {
                setData: () => wrapper.vm.$props.id,
            },
        });

        const block = wrapper.find('[data-test-id="block"]');
        await block.trigger('drop', {
            dataTransfer: {
                getData: () => wrapper.vm.$props.id,
            },
        });

        expect(wrapper.emitted('swapPositions')).toBeUndefined();
    });
});
