import { render } from '@testing-library/svelte';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import BackgroundLayer from '../BackgroundLayer.svelte';

// Mock createSectionObserver since it needs real DOM sections
vi.mock('$lib/sections', () => ({
	SECTION_IDS: ['atu', 'zarzadzanie', 'omnie', 'oferta', 'uprawnienia', 'contact'],
	createSectionObserver: vi.fn(() => vi.fn()) // returns a cleanup fn
}));

describe('BackgroundLayer', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders a fixed backdrop container', () => {
		const { container } = render(BackgroundLayer);
		const backdrop = container.querySelector('[aria-hidden="true"]');
		expect(backdrop).toBeInTheDocument();
	});

	it('renders one div per background layer image', () => {
		const { container } = render(BackgroundLayer);
		// 5 image layer divs + 1 dark overlay
		const layerDivs = container.querySelectorAll('[style*="background-image"]');
		expect(layerDivs.length).toBe(5);
	});

	it('applies opacity:1 only to the initial hero layer', () => {
		const { container } = render(BackgroundLayer);
		const layers = Array.from(
			container.querySelectorAll('[style*="background-image"]')
		) as HTMLElement[];
		const heroLayer = layers.find((el) => el.style.backgroundImage.includes('hero.webp'));
		const othersOpaque = layers
			.filter((el) => !el.style.backgroundImage.includes('hero.webp'))
			.every((el) => el.style.opacity === '0');

		expect(heroLayer).toBeDefined();
		expect(heroLayer?.style.opacity).toBe('1');
		expect(othersOpaque).toBe(true);
	});

	it('renders a persistent dark overlay', () => {
		const { container } = render(BackgroundLayer);
		const overlay = container.querySelector('.bg-black\\/55');
		expect(overlay).toBeInTheDocument();
	});
});
