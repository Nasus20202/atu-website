import type { Page } from '@playwright/test';

/**
 * Navigate to the home page and wait until the app is interactive.
 *
 * `#atu` is visible as soon as the server-rendered HTML is painted, but the
 * keyboard handler is only registered after hydration (SectionNav `onMount`).
 * SectionNav sets `data-hydrated` on <html> at that point, so waiting for it
 * guarantees key presses are not dropped on slow CI runners.
 */
export async function gotoHome(page: Page): Promise<void> {
	await page.goto('/');
	await page.locator('#atu').waitFor({ state: 'visible' });
	await page.locator('html[data-hydrated="true"]').waitFor({ state: 'attached' });
}
