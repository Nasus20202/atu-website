import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
import { svelteTesting } from '@testing-library/svelte/vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), svelteTesting()],
	test: {
		environment: 'jsdom',
		include: ['src/**/*.test.ts', 'src/**/__tests__/**/*.test.ts'],
		setupFiles: ['src/setupTests.ts'],
		coverage: {
			provider: 'v8',
			include: ['src/lib/**/*.ts', 'src/lib/**/*.svelte']
		}
	}
});
