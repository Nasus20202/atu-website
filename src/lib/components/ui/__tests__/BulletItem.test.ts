import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import BulletItemTest from './BulletItemTest.svelte';

describe('BulletItem', () => {
	it('renders the text content', () => {
		render(BulletItemTest, { props: { text: 'Accounting services' } });
		expect(screen.getByText('Accounting services')).toBeInTheDocument();
	});

	it('renders as an <li> element', () => {
		render(BulletItemTest, { props: { text: 'Technical support' } });
		const el = screen.getByRole('listitem');
		expect(el.tagName).toBe('LI');
	});

	it('applies left padding class for bullet indentation', () => {
		render(BulletItemTest, { props: { text: 'Consulting' } });
		const el = screen.getByRole('listitem');
		expect(el.className).toContain('pl-3');
	});
});
