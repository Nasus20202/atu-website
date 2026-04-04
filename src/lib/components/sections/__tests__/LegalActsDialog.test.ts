import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LegalActsDialog from '../LegalActsDialog.svelte';

// jsdom doesn't implement native dialog methods
beforeEach(() => {
	HTMLDialogElement.prototype.showModal = vi.fn();
	HTMLDialogElement.prototype.close = vi.fn();
	HTMLDialogElement.prototype.addEventListener = vi.fn((event, listener) => {
		// auto-fire transitionend so close animation completes synchronously in tests
		if (event === 'transitionend') {
			(listener as (_e: Event) => void)(new Event('transitionend'));
		}
	});
});

describe('LegalActsDialog', () => {
	it('renders a dialog element with the correct aria-label', () => {
		const { container } = render(LegalActsDialog);
		const dialog = container.querySelector('dialog[aria-label="Akty prawne"]');
		expect(dialog).toBeInTheDocument();
	});

	it('renders the "Akty prawne" heading (inside closed dialog)', () => {
		render(LegalActsDialog);
		// Dialog is hidden by default (no `open` attr), so use hidden: true
		expect(
			screen.getByRole('heading', { name: 'Akty prawne', level: 2, hidden: true })
		).toBeInTheDocument();
	});

	it('renders 8 legal act links inside the dialog', () => {
		const { container } = render(LegalActsDialog);
		// Query links directly in the DOM (bypass hidden restriction)
		const links = container.querySelectorAll('dialog a[href]');
		expect(links.length).toBe(8);
	});

	it('renders the "Ustawa o własności lokali" link', () => {
		const { container } = render(LegalActsDialog);
		const links = Array.from(container.querySelectorAll('dialog a')) as HTMLAnchorElement[];
		const target = links.find((a) => a.textContent?.includes('Ustawa o własności lokali'));
		expect(target).toBeDefined();
		expect(target!.getAttribute('target')).toBe('_blank');
		expect(target!.getAttribute('rel')).toBe('noopener noreferrer');
	});

	it('renders all legal act links as external (target="_blank")', () => {
		const { container } = render(LegalActsDialog);
		const links = Array.from(container.querySelectorAll('dialog a[href]')) as HTMLAnchorElement[];
		expect(links.length).toBeGreaterThan(0);
		for (const link of links) {
			expect(link.getAttribute('target')).toBe('_blank');
		}
	});

	it('renders a close button inside the dialog', () => {
		render(LegalActsDialog);
		expect(screen.getByRole('button', { name: 'Zamknij', hidden: true })).toBeInTheDocument();
	});

	it('calls dialog.close when the close button is clicked', async () => {
		render(LegalActsDialog);
		const closeBtn = screen.getByRole('button', { name: 'Zamknij', hidden: true });
		await userEvent.click(closeBtn);
		expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();
	});
});
