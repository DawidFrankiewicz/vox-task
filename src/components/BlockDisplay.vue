<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ backgroundColor: string }>();
const emit = defineEmits<{
    (e: 'removeBlock'): void;
    (e: 'editBlock', newColorValue: string): void;
}>();

const colorPicker = ref<HTMLInputElement | null>(null);
</script>

<template>
    <div
        class="block"
        draggable="true"
        :style="`background-color: ${$props.backgroundColor}`"
    >
        <button @click="emit('removeBlock')">Usuń</button>
        <label class="block__color-picker button">
            Zmień
            <input
                ref="colorPicker"
                type="color"
                :value="$props.backgroundColor"
                @input="emit('editBlock', String(colorPicker?.value))"
            />
        </label>
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

    &__color-picker {
        position: relative;

        input[type='color'] {
            visibility: hidden;
            pointer-events: none;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    }
}
</style>
