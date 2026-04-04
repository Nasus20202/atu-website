import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import HeroSection from '../HeroSection.svelte';

describe('HeroSection', () => {
	it('renders the section with id="atu"', () => {
		const { container } = render(HeroSection);
		expect(container.querySelector('#atu')).toBeInTheDocument();
	});

	it('renders the company heading', () => {
		render(HeroSection);
		expect(
			screen.getByRole('heading', { name: 'ATU Nieruchomości', level: 1 })
		).toBeInTheDocument();
	});

	it('renders the tagline text', () => {
		render(HeroSection);
		expect(screen.getByText('Zarządzanie Wspólnotami Mieszkaniowymi')).toBeInTheDocument();
	});

	it('renders the email contact link', () => {
		render(HeroSection);
		const link = screen.getByRole('link', { name: 'zwm24@wp.pl' });
		expect(link).toHaveAttribute('href', 'mailto:zwm24@wp.pl');
	});

	it('renders a scroll-down anchor linking to the next section', () => {
		render(HeroSection);
		const anchor = screen.getByRole('link', { name: 'Scroll down' });
		expect(anchor).toHaveAttribute('href', '#zarzadzanie');
	});
});
