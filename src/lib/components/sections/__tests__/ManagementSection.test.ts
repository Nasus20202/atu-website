import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import ManagementSection from '../ManagementSection.svelte';

describe('ManagementSection', () => {
	it('renders the section with id="zarzadzanie"', () => {
		const { container } = render(ManagementSection);
		expect(container.querySelector('#zarzadzanie')).toBeInTheDocument();
	});

	it('renders the main heading', () => {
		render(ManagementSection);
		expect(
			screen.getByRole('heading', { name: 'Zarządzanie Wspólnotami Mieszkaniowymi', level: 2 })
		).toBeInTheDocument();
	});

	it('renders all four USP titles', () => {
		render(ManagementSection);
		expect(screen.getByText('Dokładność')).toBeInTheDocument();
		expect(screen.getByText('Doświadczenie')).toBeInTheDocument();
		expect(screen.getByText('Rzetelność')).toBeInTheDocument();
		expect(screen.getByText('Wykształcenie')).toBeInTheDocument();
	});

	it('renders the "Dlaczego ATU?" section label', () => {
		render(ManagementSection);
		expect(screen.getByText('Dlaczego ATU?')).toBeInTheDocument();
	});

	it('renders the service scope bullet items', () => {
		render(ManagementSection);
		expect(screen.getByText('Obsługa księgowa i administracyjna')).toBeInTheDocument();
		expect(screen.getByText('Obsługa techniczna nieruchomości')).toBeInTheDocument();
	});

	it('renders a link to the full offer section', () => {
		render(ManagementSection);
		const link = screen.getByRole('link', { name: 'Zobacz pełną ofertę' });
		expect(link).toHaveAttribute('href', '#oferta');
	});
});
