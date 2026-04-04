import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import GhostButtonTest from './GhostButtonTest.svelte';

describe('GhostButton', () => {
	it('renders children text', () => {
		render(GhostButtonTest, { props: { label: 'Click me' } });
		expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
	});

	it('defaults to type="button"', () => {
		render(GhostButtonTest, { props: { label: 'OK' } });
		expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
	});

	it('respects type="submit"', () => {
		render(GhostButtonTest, { props: { label: 'Submit', type: 'submit' } });
		expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
	});

	it('calls onclick handler when clicked', async () => {
		const handler = vi.fn();
		render(GhostButtonTest, { props: { label: 'Click', onclick: handler } });
		await userEvent.click(screen.getByRole('button'));
		expect(handler).toHaveBeenCalledOnce();
	});

	it('does not throw when onclick is omitted', async () => {
		render(GhostButtonTest, { props: { label: 'No handler' } });
		await expect(userEvent.click(screen.getByRole('button'))).resolves.not.toThrow();
	});
});
