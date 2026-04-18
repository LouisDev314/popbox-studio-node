import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/launch/**/*.test.ts'],
    setupFiles: ['tests/setup/env.ts'],
    restoreMocks: true,
    mockReset: true,
    clearMocks: true,
    fileParallelism: false,
    testTimeout: 10000,
  },
});
