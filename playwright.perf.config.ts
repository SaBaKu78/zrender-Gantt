import { defineConfig, devices } from '@playwright/test'

const width = Number(process.env.PERF_VIEWPORT_WIDTH || 1600)
const height = Number(process.env.PERF_VIEWPORT_HEIGHT || 900)
const deviceScaleFactor = Number(process.env.PERF_DEVICE_SCALE_FACTOR || 1)

export default defineConfig({
  testDir: './tests/performance',
  timeout: 180_000,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:8099',
    trace: 'off',
    screenshot: 'off',
    video: 'off',
  },
  webServer: {
    command: 'npm run dev:mock',
    url: 'http://127.0.0.1:8099',
    reuseExistingServer: true,
    timeout: 30_000,
  },
  projects: [
    {
      name: 'performance',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        headless: process.env.PERF_HEADLESS === '1',
        viewport: { width, height },
        deviceScaleFactor,
        launchOptions: {
          args: [
            '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows',
            '--disable-renderer-backgrounding',
            '--disable-features=CalculateNativeWinOcclusion',
          ],
        },
      },
    },
  ],
})
