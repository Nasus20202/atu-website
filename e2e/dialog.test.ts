import { test, expect } from '@playwright/test';

async function openDialog(page: import('@playwright/test').Page): Promise<void> {
	await page.evaluate((sel) => {
		const el = document.querySelector(sel);
		if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
	}, '#uprawnienia');
	await page.locator('#uprawnienia button:has-text("Akty prawne")').waitFor({ state: 'visible' });
	await page.click('#uprawnienia button:has-text("Akty prawne")');
	await page.locator('dialog[aria-label="Akty prawne"]').waitFor({ state: 'visible' });
	// Wait for slide-in transition to complete
	await page.waitForTimeout(400);
}

test.describe('Legal acts dialog', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.locator('#atu').waitFor({ state: 'visible' });
	});

	test('opens when the Akty prawne button is clicked', async ({ page }) => {
		await openDialog(page);
		await expect(page.locator('dialog[aria-label="Akty prawne"]')).toBeVisible();
	});

	test('close button dismisses the dialog', async ({ page }) => {
		await openDialog(page);
		await page.click('button[aria-label="Zamknij"]');
		// Wait for the fade-out + transitionend before dialog.close()
		await page.waitForTimeout(400);
		await expect(page.locator('dialog[aria-label="Akty prawne"]')).not.toBeVisible();
	});

	test('clicking the backdrop dismisses the dialog', async ({ page }) => {
		await openDialog(page);
		const dialog = page.locator('dialog[aria-label="Akty prawne"]');
		// Click the top-right corner of the viewport — always outside the centered panel
		await page.mouse.click(page.viewportSize()!.width - 4, 4);
		await page.waitForTimeout(400);
		await expect(dialog).not.toBeVisible();
	});

	test('contains all 8 legal act links', async ({ page }) => {
		await openDialog(page);
		const links = page.locator('dialog[aria-label="Akty prawne"] a[href]');
		await expect(links).toHaveCount(8);
	});

	test('all links open in a new tab', async ({ page }) => {
		await openDialog(page);
		const links = page.locator('dialog[aria-label="Akty prawne"] a[href]');
		const count = await links.count();
		for (let i = 0; i < count; i++) {
			await expect(links.nth(i)).toHaveAttribute('target', '_blank');
			await expect(links.nth(i)).toHaveAttribute('rel', 'noopener noreferrer');
		}
	});

	test('Escape key dismisses the dialog', async ({ page }) => {
		await openDialog(page);
		await page.keyboard.press('Escape');
		await page.waitForTimeout(400);
		await expect(page.locator('dialog[aria-label="Akty prawne"]')).not.toBeVisible();
	});
});
