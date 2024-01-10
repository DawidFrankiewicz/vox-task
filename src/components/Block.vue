<script setup lang="ts">
import { ColorValueRgb } from '../types';

defineProps<{ index: number; backgroundColor: ColorValueRgb }>();
const emit = defineEmits<{
    (e: 'removeBlock', index: number): void;
    (e: 'editBlock', index: number, newHexValue: ColorValueRgb): void;
}>();
</script>

<template>
    <div
        class="block"
        :style="`background-color: rgb(${$props.backgroundColor[0]}, ${$props.backgroundColor[1]}, ${$props.backgroundColor[2]}`"
    >
        <button @click="emit('removeBlock', $props.index)">Usuń</button>
        <button @click="emit('editBlock', $props.index, [255, 100, 11])">
            Zmień
        </button>
    </div>
</template>

<style lang="scss" scoped>
.block {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-end;
    align-content: flex-end;
    gap: 5px;
    padding: 1em;
    width: 100%;
    height: 250px;
    // Default background color if not provided in props or invalid hex value
    background-color: #000;

    @media screen and (min-width: 340px) {
        width: 250px;
    }
}
</style>
