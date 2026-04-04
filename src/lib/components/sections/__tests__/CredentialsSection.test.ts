import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CredentialsSection from '../CredentialsSection.svelte';

// Mock showModal/close on HTMLDialogElement — jsdom doesn't implement them
beforeEach(() => {
	HTMLDialogElement.prototype.showModal = vi.fn();
	HTMLDialogElement.prototype.close = vi.fn();
});

describe('CredentialsSection', () => {
	it('renders the section with id="uprawnienia"', () => {
		const { container } = render(CredentialsSection);
		expect(container.querySelector('#uprawnienia')).toBeInTheDocument();
	});

	it('renders the "Uprawnienia" heading', () => {
		render(CredentialsSection);
		expect(screen.getByRole('heading', { name: 'Uprawnienia', level: 2 })).toBeInTheDocument();
	});

	it('renders both credential images', () => {
		render(CredentialsSection);
		expect(screen.getByAltText('Świadectwo Zarządcy')).toBeInTheDocument();
		expect(screen.getByAltText('Certyfikat Administratora')).toBeInTheDocument();
	});

	it('renders the "Akty prawne" button', () => {
		render(CredentialsSection);
		expect(screen.getByRole('button', { name: 'Akty prawne' })).toBeInTheDocument();
	});

	it('calls onLegalActs callback when "Akty prawne" is clicked', async () => {
		const handler = vi.fn();
		render(CredentialsSection, { props: { onLegalActs: handler } });
		await userEvent.click(screen.getByRole('button', { name: 'Akty prawne' }));
		expect(handler).toHaveBeenCalledOnce();
	});

	it('renders the lightbox dialog element', () => {
		const { container } = render(CredentialsSection);
		const dialog = container.querySelector('dialog[aria-label="Podgląd dokumentu"]');
		expect(dialog).toBeInTheDocument();
	});

	it('calls showModal when a credential image button is clicked', async () => {
		render(CredentialsSection);
		// The two credential buttons (wrapping images)
		const imgButton = screen.getByAltText('Świadectwo Zarządcy').closest('button');
		expect(imgButton).not.toBeNull();
		await userEvent.click(imgButton!);
		expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
	});

	it('renders the license number text', () => {
		render(CredentialsSection);
		expect(screen.getByText('25285')).toBeInTheDocument();
	});
});
