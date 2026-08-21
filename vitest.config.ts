import { defineConfig } from 'vitest/config'

export default defineConfig({
  cacheDir: '.vitest-cache',
  test: {
    environment: 'node',
    include: ['tests/**/*.{test,spec}.{js,ts}'],
  },
})
