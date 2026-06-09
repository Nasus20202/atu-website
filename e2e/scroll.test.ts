import { test, expect, type Page } from '@playwright/test';

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

const SECTIONS = ['/', '/zarzadzanie', '/omnie', '/oferta', '/uprawnienia', '/kontakt'] as const;

async function getPath(page: Page): Promise<string> {
	return page.evaluate(() => window.location.pathname);
}

/**
 * Press a key and poll until the URL path equals the expected value.
 * Uses toPass() instead of a fixed timeout to avoid flakiness on slow CI.
 */
async function pressAndExpectPath(
	page: Page,
	key: string,
	expectedPath: string,
	timeout = 2000
): Promise<void> {
	await page.keyboard.press(key);
	await expect(async () => {
		expect(await getPath(page)).toBe(expectedPath);
	}).toPass({ timeout });
}

test.describe('Keyboard scroll navigation', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.locator('#atu').waitFor({ state: 'visible' });
	});

	test('ArrowDown advances one section at a time through all sections', async ({ page }) => {
		for (let i = 1; i < SECTIONS.length; i++) {
			await pressAndExpectPath(page, 'ArrowDown', SECTIONS[i]);
		}
	});

	test('ArrowDown does nothing on the last section', async ({ page }) => {
		await pressAndExpectPath(page, 'End', '/kontakt');
		const pathBefore = await getPath(page);
		await pressAndExpectPath(page, 'ArrowDown', pathBefore);
	});

	test('ArrowUp retreats one section at a time back to the first', async ({ page }) => {
		await pressAndExpectPath(page, 'End', '/kontakt');
		for (let i = SECTIONS.length - 2; i >= 0; i--) {
			await pressAndExpectPath(page, 'ArrowUp', SECTIONS[i]);
		}
	});

	test('ArrowUp does nothing on the first section', async ({ page }) => {
		await pressAndExpectPath(page, 'ArrowUp', '/');
	});

	test('PageDown advances one section', async ({ page }) => {
		await pressAndExpectPath(page, 'PageDown', '/zarzadzanie');
	});

	test('PageUp retreats one section', async ({ page }) => {
		await pressAndExpectPath(page, 'ArrowDown', '/zarzadzanie');
		await pressAndExpectPath(page, 'PageUp', '/');
	});

	test('End key jumps directly to the last section', async ({ page }) => {
		await pressAndExpectPath(page, 'End', '/kontakt');
	});

	test('Home key jumps directly to the first section', async ({ page }) => {
		await pressAndExpectPath(page, 'End', '/kontakt');
		await pressAndExpectPath(page, 'Home', '/');
	});

	test('ArrowLeft retreats one section (alias for ArrowUp)', async ({ page }) => {
		await pressAndExpectPath(page, 'ArrowDown', '/zarzadzanie');
		await pressAndExpectPath(page, 'ArrowLeft', '/');
	});

	test('ArrowRight advances one section (alias for ArrowDown)', async ({ page }) => {
		await pressAndExpectPath(page, 'ArrowRight', '/zarzadzanie');
	});
});

test.describe('Hero scroll-down arrow', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.locator('#atu').waitFor({ state: 'visible' });
	});

	test('clicking the scroll-down arrow navigates to /zarzadzanie', async ({ page }) => {
		// force:true because animate-bounce keeps the element in motion
		await page.click('button[aria-label="Scroll down"]', { force: true });
		await expect(async () => {
			expect(await getPath(page)).toBe('/zarzadzanie');
		}).toPass({ timeout: 2000 });
	});

	test('scroll-down arrow is not visible after leaving the hero section', async ({ page }) => {
		await pressAndExpectPath(page, 'ArrowDown', '/zarzadzanie');
		// The arrow lives inside #atu — after scrolling away it should be off-screen
		await expect(page.locator('button[aria-label="Scroll down"]')).not.toBeInViewport();
	});
});

test.describe('Path updates on scroll', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.locator('#atu').waitFor({ state: 'visible' });
	});

	test('URL path reflects the active section as user navigates through all sections', async ({
		page
	}) => {
		for (let i = 1; i < SECTIONS.length; i++) {
			await pressAndExpectPath(page, 'ArrowDown', SECTIONS[i]);
		}
	});

	test('each section is fully in viewport when navigated to by keyboard', async ({ page }) => {
		for (let i = 1; i < SECTIONS.length; i++) {
			await pressAndExpectPath(page, 'ArrowDown', SECTIONS[i]);
			// Wait for scroll to settle, then verify snap-root scrollTop matches section offsetTop
			await expect(async () => {
				const { rootScroll, sectionOffset } = await page.evaluate((id) => {
					const r = document.querySelector('.snap-root') as HTMLElement;
					const s = document.getElementById(id) as HTMLElement;
					return { rootScroll: r.scrollTop, sectionOffset: s.offsetTop };
				}, SECTIONS[i].slice(1));
				expect(Math.abs(rootScroll - sectionOffset)).toBeLessThanOrEqual(4);
			}).toPass({ timeout: 3000 });
		}
	});

	test('navigating via dot indicators updates the path', async ({ page }) => {
		// Click the 4th dot (index 3 → /oferta)
		await page.click('button[aria-label="Go to section 4"]');
		await expect(async () => {
			expect(await getPath(page)).toBe('/oferta');
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
			expect(await getPath(page)).toBe('/zarzadzanie');
		}).toPass({ timeout: 2000 });
	});

	test('scrolling up retreats to the previous section', async ({ page }) => {
		await page.mouse.wheel(0, 600);
		await expect(async () => {
			expect(await getPath(page)).toBe('/zarzadzanie');
		}).toPass({ timeout: 2000 });
		await page.mouse.wheel(0, -600);
		await expect(async () => {
			expect(await getPath(page)).toBe('/');
		}).toPass({ timeout: 2000 });
	});

	test('scrolled section is fully in viewport', async ({ page }) => {
		await page.mouse.wheel(0, 600);
		await expect(async () => {
			expect(await getPath(page)).toBe('/zarzadzanie');
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
