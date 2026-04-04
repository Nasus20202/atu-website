import { test, expect } from '@playwright/test';

/**
 * Scroll behaviour tests.
 *
 * The site uses CSS scroll-snap on a `.snap-root` container so each section
 * occupies exactly one viewport-height. Navigation always lands on a section
 * boundary — never mid-section.
 *
 * Helpers use keyboard events wired up in SectionNav, or direct scrollToSection
 * calls via the SectionNav arrows, so we exercise the real scroll path rather
 * than synthetic `scrollTop` assignments.
 */

const SECTIONS = ['#atu', '#zarzadzanie', '#omnie', '#oferta', '#uprawnienia', '#contact'] as const;

async function getHash(page: import('@playwright/test').Page): Promise<string> {
	return page.evaluate(() => window.location.hash);
}

/**
 * Press a key and poll until the URL hash equals the expected value.
 * Uses toPass() instead of a fixed timeout to avoid flakiness on slow CI.
 */
async function pressAndExpectHash(
	page: import('@playwright/test').Page,
	key: string,
	expectedHash: string,
	timeout = 2000
): Promise<void> {
	await page.keyboard.press(key);
	await expect(async () => {
		expect(await getHash(page)).toBe(expectedHash);
	}).toPass({ timeout });
}

test.describe('Keyboard scroll navigation', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.locator('#atu').waitFor({ state: 'visible' });
	});

	test('ArrowDown advances one section at a time through all sections', async ({ page }) => {
		for (let i = 1; i < SECTIONS.length; i++) {
			await pressAndExpectHash(page, 'ArrowDown', SECTIONS[i]);
		}
	});

	test('ArrowDown does nothing on the last section', async ({ page }) => {
		await pressAndExpectHash(page, 'End', '#contact');
		const hashBefore = await getHash(page);
		await pressAndExpectHash(page, 'ArrowDown', hashBefore);
	});

	test('ArrowUp retreats one section at a time back to the first', async ({ page }) => {
		await pressAndExpectHash(page, 'End', '#contact');
		for (let i = SECTIONS.length - 2; i >= 0; i--) {
			await pressAndExpectHash(page, 'ArrowUp', SECTIONS[i]);
		}
	});

	test('ArrowUp does nothing on the first section', async ({ page }) => {
		await pressAndExpectHash(page, 'ArrowUp', '#atu');
	});

	test('PageDown advances one section', async ({ page }) => {
		await pressAndExpectHash(page, 'PageDown', '#zarzadzanie');
	});

	test('PageUp retreats one section', async ({ page }) => {
		await pressAndExpectHash(page, 'ArrowDown', '#zarzadzanie');
		await pressAndExpectHash(page, 'PageUp', '#atu');
	});

	test('End key jumps directly to the last section', async ({ page }) => {
		await pressAndExpectHash(page, 'End', '#contact');
	});

	test('Home key jumps directly to the first section', async ({ page }) => {
		await pressAndExpectHash(page, 'End', '#contact');
		await pressAndExpectHash(page, 'Home', '#atu');
	});

	test('ArrowLeft retreats one section (alias for ArrowUp)', async ({ page }) => {
		await pressAndExpectHash(page, 'ArrowDown', '#zarzadzanie');
		await pressAndExpectHash(page, 'ArrowLeft', '#atu');
	});

	test('ArrowRight advances one section (alias for ArrowDown)', async ({ page }) => {
		await pressAndExpectHash(page, 'ArrowRight', '#zarzadzanie');
	});
});

test.describe('Hero scroll-down arrow', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.locator('#atu').waitFor({ state: 'visible' });
	});

	test('clicking the scroll-down arrow navigates to #zarzadzanie', async ({ page }) => {
		// force:true because animate-bounce keeps the element in motion
		await page.click('a[aria-label="Scroll down"]', { force: true });
		await expect(async () => {
			expect(await getHash(page)).toBe('#zarzadzanie');
		}).toPass({ timeout: 2000 });
	});

	test('scroll-down arrow is not visible after leaving the hero section', async ({ page }) => {
		await pressAndExpectHash(page, 'ArrowDown', '#zarzadzanie');
		// The arrow lives inside #atu — after scrolling away it should be off-screen
		await expect(page.locator('a[aria-label="Scroll down"]')).not.toBeInViewport();
	});
});

test.describe('Hash updates on scroll', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.locator('#atu').waitFor({ state: 'visible' });
	});

	test('URL hash reflects the active section as user navigates through all sections', async ({
		page
	}) => {
		for (let i = 1; i < SECTIONS.length; i++) {
			await pressAndExpectHash(page, 'ArrowDown', SECTIONS[i]);
		}
	});

	test('each section is fully in viewport when navigated to by keyboard', async ({ page }) => {
		for (let i = 1; i < SECTIONS.length; i++) {
			await pressAndExpectHash(page, 'ArrowDown', SECTIONS[i]);
			await expect(page.locator(SECTIONS[i])).toBeInViewport();
		}
	});

	test('navigating via dot indicators updates the hash', async ({ page }) => {
		// Click the 4th dot (index 3 → #oferta)
		await page.click('button[aria-label="Go to section 4"]');
		await expect(async () => {
			expect(await getHash(page)).toBe('#oferta');
		}).toPass({ timeout: 2000 });
	});
});

test.describe('Mouse wheel scroll', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.locator('#atu').waitFor({ state: 'visible' });
		// Hover the snap-root so wheel events are routed to the scrollable container
		await page.locator('.snap-root').hover();
	});

	test('scrolling down advances to the next section', async ({ page }) => {
		await page.mouse.wheel(0, 600);
		await expect(async () => {
			expect(await getHash(page)).toBe('#zarzadzanie');
		}).toPass({ timeout: 2000 });
	});

	test('scrolling up retreats to the previous section', async ({ page }) => {
		await page.mouse.wheel(0, 600);
		await expect(async () => {
			expect(await getHash(page)).toBe('#zarzadzanie');
		}).toPass({ timeout: 2000 });
		await page.mouse.wheel(0, -600);
		await expect(async () => {
			expect(await getHash(page)).toBe('#atu');
		}).toPass({ timeout: 2000 });
	});

	test('scrolled section is fully in viewport', async ({ page }) => {
		await page.mouse.wheel(0, 600);
		await expect(async () => {
			expect(await getHash(page)).toBe('#zarzadzanie');
		}).toPass({ timeout: 2000 });
		await expect(page.locator('#zarzadzanie')).toBeInViewport();
	});
});

test.describe('Snap-root scroll containment', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.locator('#atu').waitFor({ state: 'visible' });
	});

	test('snap-root scrollTop is 0 on the first section', async ({ page }) => {
		const scrollTop = await page.evaluate(
			() => document.querySelector('.snap-root')?.scrollTop ?? -1
		);
		expect(scrollTop).toBe(0);
	});

	test('snap-root scrollTop equals section offsetTop after navigating to it', async ({ page }) => {
		await page.keyboard.press('ArrowDown');

		// Poll until scroll-snap fully settles — Firefox smooth-scroll can take >800ms on CI
		await expect(async () => {
			const { rootScroll, sectionOffset } = await page.evaluate(() => {
				const r = document.querySelector('.snap-root') as HTMLElement;
				const s = document.getElementById('zarzadzanie') as HTMLElement;
				return { rootScroll: r.scrollTop, sectionOffset: s.offsetTop };
			});
			expect(Math.abs(rootScroll - sectionOffset)).toBeLessThanOrEqual(4);
		}).toPass({ timeout: 2000 });
	});
});
