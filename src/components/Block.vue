<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ id: string; backgroundColor: string }>();
const emit = defineEmits<{
    (e: 'removeBlock', id: string): void;
    (e: 'editBlock', id: string, newColorValue: string): void;
    (e: 'swapPositions', id: string, targetId: string): void;
}>();

const colorPicker = ref<HTMLInputElement | null>(null);

const isValidHexColorValue = (stringToTest: string): boolean => {
    // Hex color regexes for 3, 4, 6 and 8 digit hex values, ignoring case
    const hex3ColorRegex = /^#[0-9a-f]{3}$/i;
    const hex4ColorRegex = /^#[0-9a-f]{4}$/i;
    const hex6ColorRegex = /^#[0-9a-f]{6}$/i;
    const hex8ColorRegex = /^#[0-9a-f]{8}$/i;

    const regexes: RegExp[] = [
        hex6ColorRegex,
        hex3ColorRegex,
        hex8ColorRegex,
        hex4ColorRegex,
    ];

    // If any of the regexes matches, return true
    for (const regex of regexes) {
        if (regex.test(stringToTest)) {
            return true;
        }
    }

    return false;
};

const editBlock = (id: string, newHexColorValue: string): void => {
    if (isValidHexColorValue(newHexColorValue)) {
        emit('editBlock', id, newHexColorValue);
    }
};

const onDragStart = (event: DragEvent, id: string): void => {
    if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move';
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('id', id);
    }
};

const onDrop = (event: DragEvent, targetId: string): void => {
    const id = event.dataTransfer?.getData('id');

    if (id) {
        // Prevent event when dropping on itself
        if (id === targetId) {
            return;
        }

        emit('swapPositions', id, targetId);
    }
};
</script>

<template>
    <div
        data-test-id="block"
        class="block"
        :style="`background-color: ${$props.backgroundColor}`"
        draggable="true"
        @dragstart="onDragStart($event, $props.id)"
        @drop="onDrop($event, $props.id)"
        @dragenter.prevent
        @dragover.prevent
    >
        <button
            data-test-id="removeBlockButton"
            @click="emit('removeBlock', $props.id)"
        >
            Usuń
        </button>
        <label class="block__color-picker button">
            Zmień
            <input
                data-test-id="colorPickerInput"
                ref="colorPicker"
                type="color"
                :value="$props.backgroundColor"
                @input="editBlock($props.id, String(colorPicker?.value))"
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
