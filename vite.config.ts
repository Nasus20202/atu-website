import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static';
import tailwindcss from '@tailwindcss/vite';
import { relative, sep } from 'node:path';
import { defineConfig } from 'vitest/config';
import { svelteTesting } from '@testing-library/svelte/vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				runs: undefined,
				runes: ({ filename }: { filename: string }) => {
					const relativePath = relative(import.meta.dirname, filename);
					const pathSegments = relativePath.toLowerCase().split(sep);
					return pathSegments.includes('node_modules') ? undefined : true;
				}
			},
			adapter: adapter({
				pages: 'build',
				assets: 'build',
				fallback: 'index.html',
				precompress: false,
				strict: false
			}),
			prerender: {
				handleHttpError: 'warn'
			}
		}),
		svelteTesting()
	],
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
