import { render, screen, waitFor } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SectionNav from '../SectionNav.svelte';

const mockScrollToSection = vi.hoisted(() => vi.fn());
const mockCreateSectionObserver = vi.hoisted(() => vi.fn());
const mockCleanupObserver = vi.hoisted(() => vi.fn());
const observerCallbackRef = vi.hoisted(() => ({
	current: undefined as ((_id: string) => void) | undefined
}));

vi.mock('$lib/sections', () => ({
	SECTION_IDS: ['atu', 'zarzadzanie', 'omnie', 'oferta', 'uprawnienia', 'contact'],
	scrollToSection: mockScrollToSection,
	createSectionObserver: mockCreateSectionObserver.mockImplementation(
		(onActive: (_id: string) => void) => {
			observerCallbackRef.current = onActive;
			return mockCleanupObserver;
		}
	)
}));

function setActiveSection(id: string) {
	observerCallbackRef.current?.(id);
}

describe('SectionNav', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		observerCallbackRef.current = undefined;
	});

	it('creates section observer on mount', () => {
		render(SectionNav);
		expect(mockCreateSectionObserver).toHaveBeenCalledTimes(1);
		expect(observerCallbackRef.current).toBeTypeOf('function');
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

	it('does not scroll when clicking disabled "Previous section" on first section', async () => {
		render(SectionNav);
		const upBtn = screen.getByRole('button', { name: 'Previous section' });
		await userEvent.click(upBtn);
		expect(mockScrollToSection).not.toHaveBeenCalled();
	});

	it('calls scrollToSection with the correct section id when clicking a dot button', async () => {
		render(SectionNav);
		const thirdSectionDot = screen.getByRole('button', { name: 'Go to section 3' });
		await userEvent.click(thirdSectionDot);
		expect(mockScrollToSection).toHaveBeenCalledWith('omnie');
	});

	it('calls scrollToSection with next section id on ArrowRight', async () => {
		render(SectionNav);
		await userEvent.keyboard('{ArrowRight}');
		expect(mockScrollToSection).toHaveBeenCalledWith('zarzadzanie');
	});

	it('calls scrollToSection with next section id on ArrowDown', async () => {
		render(SectionNav);
		await userEvent.keyboard('{ArrowDown}');
		expect(mockScrollToSection).toHaveBeenCalledWith('zarzadzanie');
	});

	it('calls scrollToSection with next section id on PageDown', async () => {
		render(SectionNav);
		await userEvent.keyboard('{PageDown}');
		expect(mockScrollToSection).toHaveBeenCalledWith('zarzadzanie');
	});

	it('calls scrollToSection with next section id on Enter', async () => {
		render(SectionNav);
		await userEvent.keyboard('{Enter}');
		expect(mockScrollToSection).toHaveBeenCalledWith('zarzadzanie');
	});

	it('calls scrollToSection with previous section id on ArrowLeft', async () => {
		render(SectionNav);
		setActiveSection('zarzadzanie');
		await userEvent.keyboard('{ArrowLeft}');
		expect(mockScrollToSection).toHaveBeenLastCalledWith('atu');
	});

	it('calls scrollToSection with previous section id on ArrowUp', async () => {
		render(SectionNav);
		setActiveSection('zarzadzanie');
		await userEvent.keyboard('{ArrowUp}');
		expect(mockScrollToSection).toHaveBeenLastCalledWith('atu');
	});

	it('calls scrollToSection with previous section id on PageUp', async () => {
		render(SectionNav);
		setActiveSection('zarzadzanie');
		await userEvent.keyboard('{PageUp}');
		expect(mockScrollToSection).toHaveBeenLastCalledWith('atu');
	});

	it('calls scrollToSection with previous section id on Backspace', async () => {
		render(SectionNav);
		setActiveSection('zarzadzanie');
		await userEvent.keyboard('{Backspace}');
		expect(mockScrollToSection).toHaveBeenLastCalledWith('atu');
	});

	it('does not navigate on ArrowLeft when on first section', async () => {
		render(SectionNav);
		await userEvent.keyboard('{ArrowLeft}');
		expect(mockScrollToSection).not.toHaveBeenCalled();
	});

	it('does not navigate on ArrowUp when on first section', async () => {
		render(SectionNav);
		await userEvent.keyboard('{ArrowUp}');
		expect(mockScrollToSection).not.toHaveBeenCalled();
	});

	it('does not navigate on Backspace when on first section', async () => {
		render(SectionNav);
		await userEvent.keyboard('{Backspace}');
		expect(mockScrollToSection).not.toHaveBeenCalled();
	});

	it('does not navigate on ArrowRight when on last section', async () => {
		render(SectionNav);
		setActiveSection('contact');
		await userEvent.keyboard('{ArrowRight}');
		expect(mockScrollToSection).not.toHaveBeenCalled();
	});

	it('does not navigate on ArrowDown when on last section', async () => {
		render(SectionNav);
		setActiveSection('contact');
		await userEvent.keyboard('{ArrowDown}');
		expect(mockScrollToSection).not.toHaveBeenCalled();
	});

	it('does not navigate on Enter when on last section', async () => {
		render(SectionNav);
		setActiveSection('contact');
		await userEvent.keyboard('{Enter}');
		expect(mockScrollToSection).not.toHaveBeenCalled();
	});

	it('calls scrollToSection with first section id on Home key', async () => {
		render(SectionNav);
		setActiveSection('omnie');
		await userEvent.keyboard('{Home}');
		expect(mockScrollToSection).toHaveBeenLastCalledWith('atu');
	});

	it('calls scrollToSection with last section id on End key', async () => {
		render(SectionNav);
		await userEvent.keyboard('{End}');
		expect(mockScrollToSection).toHaveBeenLastCalledWith('contact');
	});

	it('clicking next from middle section scrolls to the next section id', async () => {
		render(SectionNav);
		setActiveSection('omnie');
		const downBtn = screen.getByRole('button', { name: 'Next section' });
		await userEvent.click(downBtn);
		expect(mockScrollToSection).toHaveBeenLastCalledWith('oferta');
	});

	it('updates arrow disabled states when observer changes active section', async () => {
		render(SectionNav);
		const upBtn = screen.getByRole('button', { name: 'Previous section' });
		const downBtn = screen.getByRole('button', { name: 'Next section' });

		setActiveSection('contact');
		await waitFor(() => {
			expect(upBtn).not.toBeDisabled();
			expect(downBtn).toBeDisabled();
		});
	});

	it('ignores unknown observer section ids', async () => {
		render(SectionNav);
		const upBtn = screen.getByRole('button', { name: 'Previous section' });
		const downBtn = screen.getByRole('button', { name: 'Next section' });

		setActiveSection('zarzadzanie');
		await waitFor(() => {
			expect(upBtn).not.toBeDisabled();
			expect(downBtn).not.toBeDisabled();
		});

		setActiveSection('not-a-section');
		await waitFor(() => {
			expect(upBtn).not.toBeDisabled();
			expect(downBtn).not.toBeDisabled();
		});
	});

	it('clicking previous from middle section scrolls to the previous section id', async () => {
		render(SectionNav);
		setActiveSection('omnie');
		const upBtn = screen.getByRole('button', { name: 'Previous section' });
		await userEvent.click(upBtn);
		expect(mockScrollToSection).toHaveBeenLastCalledWith('zarzadzanie');
	});

	it('does not scroll when clicking disabled "Next section" on last section', async () => {
		render(SectionNav);
		setActiveSection('contact');
		const downBtn = screen.getByRole('button', { name: 'Next section' });
		await userEvent.click(downBtn);
		expect(mockScrollToSection).not.toHaveBeenCalled();
	});

	it('cleans up keydown listener and observer on unmount', () => {
		const addListenerSpy = vi.spyOn(window, 'addEventListener');
		const removeListenerSpy = vi.spyOn(window, 'removeEventListener');
		const { unmount } = render(SectionNav);

		expect(addListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));

		unmount();

		expect(removeListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
		expect(mockCleanupObserver).toHaveBeenCalledTimes(1);

		addListenerSpy.mockRestore();
		removeListenerSpy.mockRestore();
	});
});
