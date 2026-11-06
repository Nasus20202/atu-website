import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;

export default defineConfig({
	testDir: './e2e',
	snapshotDir: './e2e/snapshots',
	fullyParallel: true,
	forbidOnly: isCI,
	retries: isCI ? 1 : 0,
	workers: isCI ? 4 : undefined,
	reporter: isCI ? [['github'], ['list'], ['html']] : 'html',

	use: {
		baseURL: 'http://localhost:4173',
		viewport: { width: 1920, height: 1080 },
		screenshot: 'only-on-failure',
		video: 'off'
	},

	expect: {
		toHaveScreenshot: {
			animations: 'disabled',
			maxDiffPixelRatio: 0.01
		}
	},

	webServer: {
		command: 'node_modules/.bin/vite build && node_modules/.bin/vite preview',
		url: 'http://localhost:4173',
		reuseExistingServer: true,
		timeout: 120_000
	},

	projects: [
		// --- Desktop browsers (behaviour + visual) ---
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] }
		},
		{
			// Visual regression runs on chromium only; firefox and webkit do behaviour only
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
			testIgnore: '**/visual.test.ts'
		},
		{
			// The Safari profile defaults to 2x, which software rendering on CI cannot keep up with
			name: 'webkit',
			use: { ...devices['Desktop Safari'], deviceScaleFactor: 1 },
			testIgnore: '**/visual.test.ts'
		},

		// --- Mobile (behaviour + visual with mobile baselines) ---
		{
			name: 'Mobile Chrome',
			use: { ...devices['Pixel 5'] }
		}
	]
});
