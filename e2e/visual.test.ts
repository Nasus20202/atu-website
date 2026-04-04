import { test, expect, type Page } from '@playwright/test';

async function scrollToSection(page: Page, selector: string): Promise<void> {
	await page.evaluate((sel) => {
		const el = document.querySelector(sel);
		if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
	}, selector);
	// Wait for snap physics to settle
	await page.waitForTimeout(300);
}

test.describe('Visual regression', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.locator('#atu').waitFor({ state: 'visible' });
	});

	test('Hero section (#atu)', async ({ page }) => {
		await scrollToSection(page, '#atu');
		await expect(page).toHaveScreenshot('atu.png');
	});

	test('Management section (#zarzadzanie)', async ({ page }) => {
		await scrollToSection(page, '#zarzadzanie');
		await expect(page).toHaveScreenshot('zarzadzanie.png');
	});

	test('About section (#omnie)', async ({ page }) => {
		await scrollToSection(page, '#omnie');
		await expect(page).toHaveScreenshot('omnie.png');
	});

	test('Offer section (#oferta)', async ({ page }) => {
		await scrollToSection(page, '#oferta');
		await expect(page).toHaveScreenshot('oferta.png');
	});

	test('Credentials section (#uprawnienia)', async ({ page }) => {
		await scrollToSection(page, '#uprawnienia');
		await expect(page).toHaveScreenshot('uprawnienia.png');
	});

	test('Contact section (#contact)', async ({ page }) => {
		await scrollToSection(page, '#contact');
		await expect(page).toHaveScreenshot('contact.png', {
			mask: [page.locator('#contact p.text-center')]
		});
	});

	test('Legal acts dialog (Akty prawne)', async ({ page }) => {
		await scrollToSection(page, '#uprawnienia');
		await page.click('#uprawnienia button:has-text("Akty prawne")');
		// Wait for the slide-up/fade-in CSS transition to complete
		await page.locator('dialog[aria-label="Akty prawne"]').waitFor({ state: 'visible' });
		await page.waitForTimeout(400);
		await expect(page.locator('dialog[aria-label="Akty prawne"]')).toHaveScreenshot(
			'akty-prawne-dialog.png'
		);
	});
});

test.describe('Visual regression — dark mode', () => {
	test.use({ colorScheme: 'dark' });

	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.locator('#atu').waitFor({ state: 'visible' });
	});

	test('Hero section — dark (#atu)', async ({ page }) => {
		await scrollToSection(page, '#atu');
		await expect(page).toHaveScreenshot('dark-atu.png');
	});

	test('Management section — dark (#zarzadzanie)', async ({ page }) => {
		await scrollToSection(page, '#zarzadzanie');
		await expect(page).toHaveScreenshot('dark-zarzadzanie.png');
	});

	test('About section — dark (#omnie)', async ({ page }) => {
		await scrollToSection(page, '#omnie');
		await expect(page).toHaveScreenshot('dark-omnie.png');
	});

	test('Offer section — dark (#oferta)', async ({ page }) => {
		await scrollToSection(page, '#oferta');
		await expect(page).toHaveScreenshot('dark-oferta.png');
	});

	test('Credentials section — dark (#uprawnienia)', async ({ page }) => {
		await scrollToSection(page, '#uprawnienia');
		await expect(page).toHaveScreenshot('dark-uprawnienia.png');
	});

	test('Contact section — dark (#contact)', async ({ page }) => {
		await scrollToSection(page, '#contact');
		await expect(page).toHaveScreenshot('dark-contact.png', {
			mask: [page.locator('#contact p.text-center')]
		});
	});

	test('Legal acts dialog — dark (Akty prawne)', async ({ page }) => {
		await scrollToSection(page, '#uprawnienia');
		await page.click('#uprawnienia button:has-text("Akty prawne")');
		await page.locator('dialog[aria-label="Akty prawne"]').waitFor({ state: 'visible' });
		await page.waitForTimeout(400);
		await expect(page.locator('dialog[aria-label="Akty prawne"]')).toHaveScreenshot(
			'dark-akty-prawne-dialog.png'
		);
	});
});
