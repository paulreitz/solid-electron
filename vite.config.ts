import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import path from 'path';

export default defineConfig({
    plugins: [solidPlugin()],
    build: {
        target: 'esnext',
        outDir: 'dist/renderer'
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src/renderer')
        }
    }
});