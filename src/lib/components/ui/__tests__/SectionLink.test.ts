import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import SectionLinkTest from './SectionLinkTest.svelte';

describe('SectionLink', () => {
	it('renders an anchor with the correct href', () => {
		render(SectionLinkTest, { props: { href: '#about', label: 'About' } });
		const link = screen.getByRole('link', { name: 'About' });
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute('href', '#about');
	});

	it('renders children text', () => {
		render(SectionLinkTest, { props: { href: '#hero', label: 'Home' } });
		expect(screen.getByText('Home')).toBeInTheDocument();
	});

	it('does not add target="_blank" by default', () => {
		render(SectionLinkTest, { props: { href: '#contact', label: 'Contact' } });
		const link = screen.getByRole('link');
		expect(link).not.toHaveAttribute('target', '_blank');
	});

	it('adds target="_blank" and rel when external=true', () => {
		render(SectionLinkTest, {
			props: { href: 'https://example.com', external: true, label: 'Ext' }
		});
		const link = screen.getByRole('link');
		expect(link).toHaveAttribute('target', '_blank');
		expect(link).toHaveAttribute('rel', 'noopener noreferrer nofollow');
	});

	it('adds rel="nofollow" for internal links', () => {
		render(SectionLinkTest, { props: { href: '#section', label: 'Section' } });
		const link = screen.getByRole('link');
		expect(link).toHaveAttribute('rel', 'nofollow');
	});
});
