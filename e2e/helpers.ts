import { expect, type Page } from '@playwright/test';

/** Open the home page and wait until it is hydrated (SectionNav sets `data-hydrated`). */
export async function gotoHome(page: Page): Promise<void> {
	await page.goto('/');
	await page.locator('#atu').waitFor({ state: 'visible' });
	await page.locator('html[data-hydrated="true"]').waitFor({ state: 'attached' });
}

export async function getHash(page: Page): Promise<string> {
	return page.evaluate(() => window.location.hash);
}

export async function expectHash(page: Page, expectedHash: string, timeout = 2000): Promise<void> {
	await expect(async () => {
		expect(await getHash(page)).toBe(expectedHash);
	}).toPass({ timeout });
}

export async function pressAndExpectHash(
	page: Page,
	key: string,
	expectedHash: string,
	timeout = 2000
): Promise<void> {
	await page.keyboard.press(key);
	await expectHash(page, expectedHash, timeout);
}

/** Instantly scroll a section into view, bypassing smooth scrolling. */
export async function jumpToSection(page: Page, selector: string): Promise<void> {
	await page.evaluate((sel) => {
		document.querySelector(sel)?.scrollIntoView({ behavior: 'instant', block: 'start' });
	}, selector);
}
