import { mount } from '@vue/test-utils';
import Block from '@/components/Block.vue';
import BlocksBoard from '@/components/BlocksBoard.vue';
import { test, expect } from 'vitest';

const factory = async () => {
    return mount(BlocksBoard, {
        shallow: true,
    });
};

const deepFactory = async () => {
    return mount(BlocksBoard);
};

test('Should render correctly', async () => {
    const wrapper = await factory();

    expect(wrapper.find('[data-test-id="addRandomBlockButton"]').exists()).toBe(
        true
    );

    // Check if component matches snapshot (HTML structure)
    // https://vitest.dev/guide/snapshot#updating-snapshots
    expect(wrapper.html()).toMatchSnapshot();
});

test('Should add block with random color', async () => {
    const wrapper = await factory();

    // Hex color regex
    const hex6ColorRegex = /^#[0-9A-F]{6}$/i;

    const button = wrapper.find('[data-test-id="addRandomBlockButton"]');
    await button.trigger('click');
    await wrapper.vm.$nextTick();

    const block = wrapper.find('[data-test-id="block"]');
    expect(block.exists()).toBe(true);
    expect(block.attributes('backgroundcolor')).toMatch(hex6ColorRegex);
});

test('Should remove block', async () => {
    const wrapper = await deepFactory();

    // Add random block
    const button = wrapper.find('[data-test-id="addRandomBlockButton"]');
    await button.trigger('click');

    const block = wrapper.findComponent(Block);
    expect(block.exists()).toBe(true);

    // Emit removeBlock event from Block component
    block.vm.$emit('removeBlock', block.vm.id, block.vm.backgroundColor);
    await wrapper.vm.$nextTick();

    expect(wrapper.find('[data-test-id="block"]').exists()).toBe(false);
});

test('Should edit block', async () => {
    const wrapper = await deepFactory();

    // Add random block
    const button = wrapper.find('[data-test-id="addRandomBlockButton"]');
    await button.trigger('click');

    const block = wrapper.findComponent(Block);
    expect(block.exists()).toBe(true);

    // Emit editBlock event from Block component
    block.vm.$emit('editBlock', block.vm.id, '#000000');
    await wrapper.vm.$nextTick();

    expect(block.vm.backgroundColor).toBe('#000000');
});

test('Should swap blocks positions on drop', async () => {
    const wrapper = await deepFactory();

    // Add 2 random blocks
    const button = wrapper.find('[data-test-id="addRandomBlockButton"]');
    await button.trigger('click');
    await wrapper.vm.$nextTick();
    await button.trigger('click');
    await wrapper.vm.$nextTick();

    const expectedSwappedBlocksArray = [
        ...(wrapper.vm as any).blocks,
    ].reverse();

    const blocks = wrapper.findAllComponents(Block);
    expect(blocks[0].exists()).toBe(true);
    expect(blocks[1].exists()).toBe(true);

    // Emit swapPositions event from Block component,
    // case: first block is dragged and dropped on the second one
    blocks[1].vm.$emit('swapPositions', blocks[0].vm.id, blocks[1].vm.id);
    expect(blocks[1].emitted('swapPositions')).toBeDefined;

    expect((wrapper.vm as any).blocks).toStrictEqual(
        expectedSwappedBlocksArray
    );
});
