import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import SectionLabelTest from './SectionLabelTest.svelte';

describe('SectionLabel', () => {
	it('renders the label text', () => {
		render(SectionLabelTest, { props: { label: 'Why ATU?' } });
		expect(screen.getByText('Why ATU?')).toBeInTheDocument();
	});

	it('renders as a <p> element', () => {
		render(SectionLabelTest, { props: { label: 'Services' } });
		const el = screen.getByText('Services');
		expect(el.tagName).toBe('P');
	});

	it('applies uppercase styling class', () => {
		render(SectionLabelTest, { props: { label: 'Test' } });
		const el = screen.getByText('Test');
		expect(el.className).toContain('uppercase');
	});
});
