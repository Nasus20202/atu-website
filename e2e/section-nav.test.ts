import { test, expect } from '@playwright/test';

async function getHash(page: import('@playwright/test').Page): Promise<string> {
	return page.evaluate(() => window.location.hash);
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
		// Jump straight to the last section via End key
		await page.keyboard.press('End');
		await page.waitForTimeout(800);
		await expect(page.locator('button[aria-label="Next section"]')).toBeDisabled();
	});

	test('Next section arrow advances from #atu to #zarzadzanie', async ({ page }) => {
		await page.click('button[aria-label="Next section"]');
		await page.waitForTimeout(800);
		expect(await getHash(page)).toBe('#zarzadzanie');
	});

	test('Previous section arrow retreats from #zarzadzanie to #atu', async ({ page }) => {
		await page.keyboard.press('ArrowDown');
		await page.waitForTimeout(800);
		await page.click('button[aria-label="Previous section"]');
		await page.waitForTimeout(800);
		expect(await getHash(page)).toBe('#atu');
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
		// Click dot for section 3 (index 2 → #omnie)
		await page.click('button[aria-label="Go to section 3"]');
		await page.waitForTimeout(800);
		expect(await getHash(page)).toBe('#omnie');
	});
});
