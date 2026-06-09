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

test.describe('Navbar — desktop', () => {
	test.use({ viewport: { width: 1280, height: 800 } });

	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.locator('#atu').waitFor({ state: 'visible' });
	});

	test('is transparent on load (no scrolled-nav class)', async ({ page }) => {
		const nav = page.locator('nav[aria-label="Nawigacja główna"]');
		await expect(nav).not.toHaveClass(/scrolled-nav/);
	});

	test('gains scrolled-nav class after scrolling past 80px', async ({ page }) => {
		const nav = page.locator('nav[aria-label="Nawigacja główna"]');
		await page.keyboard.press('ArrowDown');
		await expect(nav).toHaveClass(/scrolled-nav/, { timeout: 2000 });
	});

	test('clicking a nav link scrolls to the correct section and updates path', async ({ page }) => {
		await page.click('nav ul button:has-text("Kontakt")');
		await expectPath(page, '/kontakt');
		await expect(page.locator('#kontakt')).toBeInViewport();
	});

	test('brand button navigates to /', async ({ page }) => {
		await page.keyboard.press('ArrowDown');
		await expectPath(page, '/zarzadzanie');
		await page.click('nav button:has-text("ATU Nieruchomości")');
		await expectPath(page, '/');
	});

	test('active nav button is highlighted when on that section', async ({ page }) => {
		await page.keyboard.press('ArrowDown');
		await expectPath(page, '/zarzadzanie');
		await page.keyboard.press('ArrowDown');
		await expectPath(page, '/omnie');
		const omnieBtn = page.locator('nav ul button:has-text("O mnie")');
		const atuBtn = page.locator('nav ul button:has-text("ATU")');
		await expect(omnieBtn).toHaveClass(/bg-bg-alt/);
		await expect(atuBtn).not.toHaveClass(/bg-bg-alt/);
	});

	test('active nav button updates as user navigates between sections', async ({ page }) => {
		const steps: Array<[string, string]> = [
			['Zarządzanie', '/zarzadzanie'],
			['O mnie', '/omnie']
		];
		for (const [label, path] of steps) {
			await page.keyboard.press('ArrowDown');
			await expectPath(page, path);
			// After first ArrowDown the nav is scrolled — active class is bg-bg-alt
			await expect(page.locator(`nav ul button:has-text("${label}")`)).toHaveClass(/bg-bg-alt/);
		}
	});
});

test.describe('Navbar — mobile', () => {
	test.use({ viewport: { width: 390, height: 844 } });

	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.locator('#atu').waitFor({ state: 'visible' });
	});

	test('hamburger is visible and desktop nav links are hidden', async ({ page }) => {
		await expect(page.locator('button[aria-label="Otwórz menu"]')).toBeVisible();
		// Desktop nav list is hidden via md:flex
		await expect(page.locator('nav ul')).not.toBeVisible();
	});

	test('clicking hamburger reveals nav links', async ({ page }) => {
		await page.click('button[aria-label="Otwórz menu"]');
		await expect(page.locator('nav div.absolute button:has-text("Kontakt")')).toBeVisible();
	});

	test('clicking a nav link closes the mobile menu', async ({ page }) => {
		await page.click('button[aria-label="Otwórz menu"]');
		await page.click('nav div.absolute button:has-text("Kontakt")');
		await expect(page.locator('nav div.absolute')).not.toBeVisible();
	});

	test('clicking a nav link navigates to the correct section', async ({ page }) => {
		await page.click('button[aria-label="Otwórz menu"]');
		await page.click('nav div.absolute button:has-text("Kontakt")');
		await expectPath(page, '/kontakt');
	});
});
