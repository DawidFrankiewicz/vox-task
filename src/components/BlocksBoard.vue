<script setup lang="ts">
import { Block } from '../types';

import { ref } from 'vue';
import BlockDisplay from './BlockDisplay.vue';
import { v4 as uuidv4 } from 'uuid';

const blocks = ref<Block[]>([]);

const randomRgbColorValue = (): [number, number, number] => {
    // Get random RGB values (0-255)
    const randomR = Math.round(Math.random() * 256);
    const randomG = Math.round(Math.random() * 256);
    const randomB = Math.round(Math.random() * 256);

    return [randomR, randomG, randomB];
};

const randomHexColorValue = (): string => {
    const [randomR, randomG, randomB] = randomRgbColorValue();

    // Convert RGB values to hex, pad with 0 if needed
    const hexR = randomR.toString(16).padStart(2, '0');
    const hexG = randomG.toString(16).padStart(2, '0');
    const hexB = randomB.toString(16).padStart(2, '0');

    // Return hex color value in format #RRGGBB
    return `#${hexR}${hexG}${hexB}`;
};

const addRandomBlock = (): void => {
    const newBlock: Block = {
        // Generate random UUID
        id: uuidv4(),
        color: randomHexColorValue(),
    };
    blocks.value.push(newBlock);
};

const removeBlock = (id: string): void => {
    blocks.value = blocks.value.filter((block) => block.id !== id);
};

const editBlock = (id: string, newColorValue: string): void => {
    const foundBlock = blocks.value.find((block) => block.id === id);
    if (foundBlock) {
        foundBlock.color = newColorValue;
    }
};
</script>

<template>
    <div class="board__container">
        <h1 class="board__header">VOX Kolorowe Kafelki</h1>

        <div class="controlls__container">
            <button @click="addRandomBlock">Dodaj Kafelek</button>
        </div>

        <div class="blocks__container">
            <BlockDisplay
                v-for="block in blocks"
                :key="block.id"
                @removeBlock="removeBlock(block.id)"
                @editBlock="
                    (newColorValue) => editBlock(block.id, newColorValue)
                "
                :backgroundColor="block.color"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.board__container {
    padding: 2em clamp(0.5em, 5vw, 3em);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.board__header {
    text-align: center;
    font-size: clamp(1.5em, 5vw, 3em);
}

.controlls__container {
    margin-bottom: 1em;
}
.blocks__container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 10px;
}
</style>
