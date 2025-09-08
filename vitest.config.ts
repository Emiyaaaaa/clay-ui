import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: [],
    globals: true,
    coverage: {
      reporter: ['text', 'html'],
    },
    include: ['packages/**/*.test.tsx'],
  },
});


