import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import OfferSection from '../OfferSection.svelte';

describe('OfferSection', () => {
	it('renders the section with id="oferta"', () => {
		const { container } = render(OfferSection);
		expect(container.querySelector('#oferta')).toBeInTheDocument();
	});

	it('renders the "Oferta" heading', () => {
		render(OfferSection);
		expect(screen.getByRole('heading', { name: 'Oferta', level: 2 })).toBeInTheDocument();
	});

	it('renders the comprehensive management section label', () => {
		render(OfferSection);
		expect(
			screen.getByText('Kompleksowe zarządzanie nieruchomością w naszej firmie to:')
		).toBeInTheDocument();
	});

	it('renders the manager duties section label', () => {
		render(OfferSection);
		expect(
			screen.getByText('Do obowiązków Zarządcy należeć będzie w szczególności:')
		).toBeInTheDocument();
	});

	it('renders key service items', () => {
		render(OfferSection);
		expect(screen.getByText('obsługa finansowo-księgowa')).toBeInTheDocument();
		expect(screen.getByText('obsługa techniczna obiektu')).toBeInTheDocument();
	});

	it('renders the legal disclaimer at the bottom', () => {
		render(OfferSection);
		expect(screen.getByText(/Ustawie o własności lokali/)).toBeInTheDocument();
	});
});
