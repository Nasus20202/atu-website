import { test, expect } from '@playwright/test';

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
		await page.waitForTimeout(600);
		await expect(nav).toHaveClass(/scrolled-nav/);
	});

	test('clicking a nav link scrolls to the correct section and updates hash', async ({ page }) => {
		await page.click('nav ul button:has-text("Kontakt")');
		await page.waitForTimeout(800);
		expect(await page.evaluate(() => window.location.hash)).toBe('#contact');
		await expect(page.locator('#contact')).toBeInViewport();
	});

	test('brand button navigates to #atu', async ({ page }) => {
		await page.keyboard.press('ArrowDown');
		await page.waitForTimeout(600);
		await page.click('nav button:has-text("ATU Nieruchomości")');
		await page.waitForTimeout(800);
		expect(await page.evaluate(() => window.location.hash)).toBe('#atu');
	});

	test('active nav button is highlighted when on that section', async ({ page }) => {
		// Wait between presses so IntersectionObserver updates activeId before the next press
		await page.keyboard.press('ArrowDown');
		await page.waitForTimeout(800);
		await page.keyboard.press('ArrowDown');
		await page.waitForTimeout(800);
		const omnieBtn = page.locator('nav ul button:has-text("O mnie")');
		const atuBtn = page.locator('nav ul button:has-text("ATU")');
		// When scrolled, active button gets bg-bg-alt; inactive buttons do not
		await expect(omnieBtn).toHaveClass(/bg-bg-alt/);
		await expect(atuBtn).not.toHaveClass(/bg-bg-alt/);
	});

	test('active nav button updates as user navigates between sections', async ({ page }) => {
		const steps = ['Zarządzanie', 'O mnie'];
		for (const label of steps) {
			await page.keyboard.press('ArrowDown');
			await page.waitForTimeout(800);
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
		await page.waitForTimeout(400);
		await expect(page.locator('nav div.absolute')).not.toBeVisible();
	});

	test('clicking a nav link navigates to the correct section', async ({ page }) => {
		await page.click('button[aria-label="Otwórz menu"]');
		await page.click('nav div.absolute button:has-text("Kontakt")');
		await page.waitForTimeout(800);
		expect(await page.evaluate(() => window.location.hash)).toBe('#contact');
	});
});
