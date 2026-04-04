import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import ContactSection from '../ContactSection.svelte';

describe('ContactSection', () => {
	it('renders the section with id="contact"', () => {
		const { container } = render(ContactSection);
		expect(container.querySelector('#contact')).toBeInTheDocument();
	});

	it('renders the "Kontakt" heading', () => {
		render(ContactSection);
		expect(screen.getByRole('heading', { name: 'Kontakt', level: 2 })).toBeInTheDocument();
	});

	it('renders the company name', () => {
		render(ContactSection);
		expect(screen.getByText('ATU – Zarządzanie Wspólnotami Mieszkaniowymi')).toBeInTheDocument();
	});

	it('renders the address with a maps link', () => {
		render(ContactSection);
		const addressLink = screen.getByRole('link', {
			name: /Al\. Grunwaldzka 609/
		});
		expect(addressLink).toHaveAttribute('href', expect.stringContaining('goo.gl/maps'));
		expect(addressLink).toHaveAttribute('target', '_blank');
	});

	it('renders the phone contact link', () => {
		render(ContactSection);
		const phoneLink = screen.getByRole('link', { name: '601-64-01-46' });
		expect(phoneLink).toHaveAttribute('href', 'tel:+48601640146');
	});

	it('renders the primary email contact link', () => {
		render(ContactSection);
		const emailLink = screen.getByRole('link', { name: 'zwm24@wp.pl' });
		expect(emailLink).toHaveAttribute('href', 'mailto:zwm24@wp.pl');
	});

	it('renders the secondary email contact link', () => {
		render(ContactSection);
		const emailLink = screen.getByRole('link', { name: 'atu@atu.nieruchomosci.pl' });
		expect(emailLink).toHaveAttribute('href', 'mailto:atu@atu.nieruchomosci.pl');
	});

	it('renders the copyright footer with the current year', () => {
		render(ContactSection);
		const year = new Date().getFullYear();
		expect(screen.getByText(new RegExp(`ATU Nieruchomości.*${year}`))).toBeInTheDocument();
	});
});
