export default {
  cacheDir: '.vitest-cache',
  test: {
    environment: 'node',
    include: ['tests/unit/**/*.{test,spec}.{js,ts}'],
    exclude: ['tests/e2e/**'],
  },
}
