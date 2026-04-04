import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import NavBar from '../NavBar.svelte';

const mockScrollToSection = vi.hoisted(() => vi.fn());

vi.mock('$lib/sections', () => ({
	SECTION_IDS: ['atu', 'zarzadzanie', 'omnie', 'oferta', 'uprawnienia', 'contact'],
	scrollToSection: mockScrollToSection,
	createSectionObserver: vi.fn(() => vi.fn())
}));

describe('NavBar', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders the brand name', () => {
		render(NavBar);
		expect(screen.getByText('ATU Nieruchomości')).toBeInTheDocument();
	});

	it('renders a navigation landmark', () => {
		render(NavBar);
		expect(screen.getByRole('navigation', { name: 'Nawigacja główna' })).toBeInTheDocument();
	});

	it('renders all section labels in desktop nav', () => {
		render(NavBar);
		const labels = ['ATU', 'Zarządzanie', 'O mnie', 'Oferta', 'Uprawnienia i akty', 'Kontakt'];
		for (const label of labels) {
			expect(screen.getAllByText(label).length).toBeGreaterThan(0);
		}
	});

	it('renders mobile hamburger toggle button', () => {
		render(NavBar);
		const toggle = screen.getByRole('button', { name: /Otwórz menu|Zamknij menu/ });
		expect(toggle).toBeInTheDocument();
	});

	it('clicking mobile toggle opens the dropdown', async () => {
		render(NavBar);
		const toggle = screen.getByRole('button', { name: 'Otwórz menu' });
		await userEvent.click(toggle);
		// After opening, aria-expanded should be true
		expect(toggle).toHaveAttribute('aria-expanded', 'true');
	});

	it('brand button calls scrollToSection with "atu"', async () => {
		render(NavBar);
		const brand = screen.getByText('ATU Nieruchomości');
		await userEvent.click(brand);
		expect(mockScrollToSection).toHaveBeenCalledWith('atu');
	});

	it('clicking a desktop nav link calls scrollToSection', async () => {
		render(NavBar);
		// Get the first button with text "ATU" (desktop list)
		const atuButtons = screen.getAllByText('ATU');
		// Find the one that is a button (brand or desktop nav)
		const desktopNavBtn = atuButtons.find((el) => el.tagName === 'BUTTON' && el.closest('ul'));
		if (desktopNavBtn) {
			await userEvent.click(desktopNavBtn);
			expect(mockScrollToSection).toHaveBeenCalled();
		}
	});
});
