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

/** Press a key and wait for the scroll animation + IntersectionObserver to settle. */
async function pressAndWait(
	page: import('@playwright/test').Page,
	key: string,
	ms = 800
): Promise<void> {
	await page.keyboard.press(key);
	await page.waitForTimeout(ms);
}

test.describe('Keyboard scroll navigation', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.locator('#atu').waitFor({ state: 'visible' });
	});

	test('ArrowDown advances one section at a time through all sections', async ({ page }) => {
		// Start at #atu (index 0), press ArrowDown for each subsequent section
		for (let i = 1; i < SECTIONS.length; i++) {
			await pressAndWait(page, 'ArrowDown');
			expect(await getHash(page)).toBe(SECTIONS[i]);
		}
	});

	test('ArrowDown does nothing on the last section', async ({ page }) => {
		// End jumps 5 sections — give extra time for scroll-snap to settle
		await pressAndWait(page, 'End', 1500);
		const hashBefore = await getHash(page);
		await pressAndWait(page, 'ArrowDown');
		expect(await getHash(page)).toBe(hashBefore);
	});

	test('ArrowUp retreats one section at a time back to the first', async ({ page }) => {
		// Jump to last section first — extra wait for 5-section jump to settle
		await pressAndWait(page, 'End', 1500);
		// Walk back up
		for (let i = SECTIONS.length - 2; i >= 0; i--) {
			await pressAndWait(page, 'ArrowUp');
			expect(await getHash(page)).toBe(SECTIONS[i]);
		}
	});

	test('ArrowUp does nothing on the first section', async ({ page }) => {
		await pressAndWait(page, 'ArrowUp');
		expect(await getHash(page)).toBe('#atu');
	});

	test('PageDown advances one section', async ({ page }) => {
		await pressAndWait(page, 'PageDown');
		expect(await getHash(page)).toBe('#zarzadzanie');
	});

	test('PageUp retreats one section', async ({ page }) => {
		await pressAndWait(page, 'ArrowDown'); // go to #zarzadzanie
		await pressAndWait(page, 'PageUp');
		expect(await getHash(page)).toBe('#atu');
	});

	test('End key jumps directly to the last section', async ({ page }) => {
		await pressAndWait(page, 'End');
		expect(await getHash(page)).toBe('#contact');
	});

	test('Home key jumps directly to the first section', async ({ page }) => {
		// End jumps 5 sections — give extra time for scroll-snap to settle before pressing Home
		await pressAndWait(page, 'End', 1500);
		await pressAndWait(page, 'Home');
		expect(await getHash(page)).toBe('#atu');
	});

	test('ArrowLeft retreats one section (alias for ArrowUp)', async ({ page }) => {
		await pressAndWait(page, 'ArrowDown');
		await pressAndWait(page, 'ArrowLeft');
		expect(await getHash(page)).toBe('#atu');
	});

	test('ArrowRight advances one section (alias for ArrowDown)', async ({ page }) => {
		await pressAndWait(page, 'ArrowRight');
		expect(await getHash(page)).toBe('#zarzadzanie');
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
		await page.waitForTimeout(800);
		expect(await getHash(page)).toBe('#zarzadzanie');
	});

	test('scroll-down arrow is not visible after leaving the hero section', async ({ page }) => {
		await pressAndWait(page, 'ArrowDown');
		// The arrow lives inside #atu — after scrolling away it should be off-screen
		const arrow = page.locator('a[aria-label="Scroll down"]');
		await expect(arrow).not.toBeInViewport();
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
			await pressAndWait(page, 'ArrowDown');
			expect(await getHash(page)).toBe(SECTIONS[i]);
		}
	});

	test('each section is fully in viewport when navigated to by keyboard', async ({ page }) => {
		for (let i = 1; i < SECTIONS.length; i++) {
			await pressAndWait(page, 'ArrowDown');
			await expect(page.locator(SECTIONS[i])).toBeInViewport();
		}
	});

	test('navigating via dot indicators updates the hash', async ({ page }) => {
		// Click the 4th dot (index 3 → #oferta)
		await page.click('button[aria-label="Go to section 4"]');
		await page.waitForTimeout(800);
		expect(await getHash(page)).toBe('#oferta');
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
		await page.waitForTimeout(1000);
		expect(await getHash(page)).toBe('#zarzadzanie');
	});

	test('scrolling up retreats to the previous section', async ({ page }) => {
		await page.mouse.wheel(0, 600);
		await page.waitForTimeout(1000);
		await page.mouse.wheel(0, -600);
		await page.waitForTimeout(1000);
		expect(await getHash(page)).toBe('#atu');
	});

	test('scrolled section is fully in viewport', async ({ page }) => {
		await page.mouse.wheel(0, 600);
		await page.waitForTimeout(1000);
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
