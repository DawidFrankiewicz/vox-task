import { defineConfig } from 'vitest/config';
import Vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    plugins: [Vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    test: {
        globals: true,
        coverage: {
            provider: 'v8',
            include: ['src/components/**', 'src/app.vue'],
        },
        environment: 'jsdom',
    },
});
