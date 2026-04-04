import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SectionNav from '../SectionNav.svelte';

const mockScrollToSection = vi.hoisted(() => vi.fn());

vi.mock('$lib/sections', () => ({
	SECTION_IDS: ['atu', 'zarzadzanie', 'omnie', 'oferta', 'uprawnienia', 'contact'],
	scrollToSection: mockScrollToSection,
	createSectionObserver: vi.fn(() => vi.fn())
}));

describe('SectionNav', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders the section navigation container', () => {
		const { container } = render(SectionNav);
		const nav = container.querySelector('[aria-label="Section navigation"]');
		expect(nav).toBeInTheDocument();
	});

	it('renders up and down arrow buttons', () => {
		render(SectionNav);
		expect(screen.getByRole('button', { name: 'Previous section' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Next section' })).toBeInTheDocument();
	});

	it('renders one dot per section', () => {
		render(SectionNav);
		// 6 sections → 6 dot buttons with "Go to section N" labels
		const dots = screen
			.getAllByRole('button')
			.filter((btn) => btn.getAttribute('aria-label')?.startsWith('Go to section'));
		expect(dots.length).toBe(6);
	});

	it('disables the "Previous section" button on the first section', () => {
		render(SectionNav);
		const upBtn = screen.getByRole('button', { name: 'Previous section' });
		expect(upBtn).toBeDisabled();
	});

	it('enables the "Next section" button when not at the last section', () => {
		render(SectionNav);
		const downBtn = screen.getByRole('button', { name: 'Next section' });
		expect(downBtn).not.toBeDisabled();
	});

	it('calls scrollToSection with the next section id when clicking down', async () => {
		render(SectionNav);
		const downBtn = screen.getByRole('button', { name: 'Next section' });
		await userEvent.click(downBtn);
		expect(mockScrollToSection).toHaveBeenCalledWith('zarzadzanie');
	});
});
