import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import SectionNav from '../SectionNav.svelte';
import { SECTION_IDS } from '$lib/sections';

class MockIntersectionObserver {
	observe() {}
	disconnect() {}
}

describe('SectionNav integration scrolling', () => {
	beforeEach(() => {
		vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
	});

	afterEach(() => {
		document.body.innerHTML = '';
		vi.unstubAllGlobals();
	});

	it('clicking next triggers real snap-root scrollTo', async () => {
		const snapRoot = document.createElement('div');
		snapRoot.className = 'snap-root';
		snapRoot.scrollTo = vi.fn();

		SECTION_IDS.forEach((id, index) => {
			const section = document.createElement('section');
			section.id = id;
			Object.defineProperty(section, 'offsetTop', {
				value: (index + 1) * 100,
				configurable: true
			});
			snapRoot.appendChild(section);
		});
		document.body.appendChild(snapRoot);

		render(SectionNav);
		await userEvent.click(screen.getByRole('button', { name: 'Next section' }));

		expect(snapRoot.scrollTo).toHaveBeenCalledWith({ top: 200, behavior: 'smooth' });
	});

	it('falls back to target.scrollIntoView when snap-root is missing', async () => {
		const section = document.createElement('section');
		section.id = 'zarzadzanie';
		section.scrollIntoView = vi.fn();
		document.body.appendChild(section);

		render(SectionNav);
		await userEvent.keyboard('{ArrowDown}');

		expect(section.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
	});
});
