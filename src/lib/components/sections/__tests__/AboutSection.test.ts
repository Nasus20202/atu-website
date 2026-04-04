import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import AboutSection from '../AboutSection.svelte';

describe('AboutSection', () => {
	it('renders the section with id="omnie"', () => {
		const { container } = render(AboutSection);
		expect(container.querySelector('#omnie')).toBeInTheDocument();
	});

	it('renders the "O mnie" heading', () => {
		render(AboutSection);
		expect(screen.getByRole('heading', { name: 'O mnie', level: 2 })).toBeInTheDocument();
	});

	it('renders the owner name', () => {
		render(AboutSection);
		const matches = screen.getAllByText(/Krzysztof Nasuta/);
		expect(matches.length).toBeGreaterThan(0);
	});

	it('renders the license number', () => {
		render(AboutSection);
		expect(screen.getByText('25285')).toBeInTheDocument();
	});

	it('renders "Co mnie wyróżnia?" label', () => {
		render(AboutSection);
		expect(screen.getByText('Co mnie wyróżnia?')).toBeInTheDocument();
	});

	it('renders the contact phone link', () => {
		render(AboutSection);
		const phoneLink = screen.getByRole('link', { name: '601-64-01-46' });
		expect(phoneLink).toHaveAttribute('href', 'tel:+48601640146');
	});

	it('renders the contact email link', () => {
		render(AboutSection);
		const emailLinks = screen.getAllByRole('link', { name: /ZWM24@wp\.pl/i });
		expect(emailLinks.length).toBeGreaterThan(0);
		expect(emailLinks[0]).toHaveAttribute('href', 'mailto:zwm24@wp.pl');
	});
});
