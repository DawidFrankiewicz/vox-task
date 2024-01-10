<script setup lang="ts">
import { ColorValueRgb } from '../types';

import { ref } from 'vue';
import Block from './Block.vue';

const blocksColorValuesHex = ref<ColorValueRgb[]>([]);

const randomRgbColorValue = (): ColorValueRgb => {
    // Get random RGB values (0-255)
    const randomR = Math.round(Math.random() * 256);
    const randomG = Math.round(Math.random() * 256);
    const randomB = Math.round(Math.random() * 256);

    return [randomR, randomG, randomB];
};

const addRandomBlock = (): void => {
    blocksColorValuesHex.value.push(randomRgbColorValue());
};

const removeBlock = (index: number): void => {
    blocksColorValuesHex.value.splice(index, 1);
};

const editBlock = (index: number, newHexValue: ColorValueRgb): void => {
    blocksColorValuesHex.value[index] = newHexValue;
};
</script>

<template>
    <div class="board__container">
        <h1 class="board__header">VOX Kolorowe Kafelki</h1>

        <div class="controlls__container">
            <button @click="addRandomBlock">Dodaj Kafelek</button>
        </div>

        <div class="blocks__container">
            <Block
                v-for="(color, index) in blocksColorValuesHex"
                @removeBlock="removeBlock(index)"
                @editBlock="
                    (index, newHexValue) => editBlock(index, newHexValue)
                "
                :index="index"
                :backgroundColor="color"
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
