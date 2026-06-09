import { test, expect, type Page } from '@playwright/test';

async function getPath(page: Page): Promise<string> {
	return page.evaluate(() => window.location.pathname);
}

async function expectPath(
	page: Page,
	expectedPath: string,
	timeout = 2000
): Promise<void> {
	await expect(async () => {
		expect(await getPath(page)).toBe(expectedPath);
	}).toPass({ timeout });
}

test.describe('SectionNav arrows', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.locator('#atu').waitFor({ state: 'visible' });
	});

	test('Previous section arrow is disabled on the first section', async ({ page }) => {
		await expect(page.locator('button[aria-label="Previous section"]')).toBeDisabled();
	});

	test('Next section arrow is disabled on the last section', async ({ page }) => {
		await page.keyboard.press('End');
		await expectPath(page, '/kontakt');
		await expect(page.locator('button[aria-label="Next section"]')).toBeDisabled();
	});

	test('Next section arrow advances from #atu to /zarzadzanie', async ({ page }) => {
		await page.click('button[aria-label="Next section"]');
		await expectPath(page, '/zarzadzanie');
	});

	test('Previous section arrow retreats from /zarzadzanie to /', async ({ page }) => {
		await page.keyboard.press('ArrowDown');
		await expectPath(page, '/zarzadzanie');
		await page.click('button[aria-label="Previous section"]');
		await expectPath(page, '/');
	});

	test('dot indicator for active section is taller than inactive dots', async ({ page }) => {
		// Active dot has h-4, inactive dots have h-1.5
		const activeDot = page.locator('button[aria-label="Go to section 1"]');
		const inactiveDot = page.locator('button[aria-label="Go to section 2"]');
		const activeH = await activeDot.evaluate((el) => el.getBoundingClientRect().height);
		const inactiveH = await inactiveDot.evaluate((el) => el.getBoundingClientRect().height);
		expect(activeH).toBeGreaterThan(inactiveH);
	});

	test('clicking a dot navigates to that section', async ({ page }) => {
		// Click dot for section 3 (index 2 → /omnie)
		await page.click('button[aria-label="Go to section 3"]');
		await expectPath(page, '/omnie');
	});

	test('directly loading /kontakt scrolls to the kontakt section', async ({ page }) => {
		await page.goto('/kontakt');
		await expect(page.locator('#kontakt')).toBeInViewport();
		await expectPath(page, '/kontakt');
	});
});
