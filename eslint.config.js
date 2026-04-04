import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
	js.configs.recommended,
	{
		rules: {
			'no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }]
		}
	},
	{
		files: ['**/*.ts'],
		plugins: { '@typescript-eslint': ts },
		languageOptions: {
			parser: tsParser,
			globals: { ...globals.browser, ...globals.node }
		},
		rules: {
			...ts.configs.recommended.rules,
			'no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }]
		}
	},
	...svelte.configs['flat/recommended'].map((config) => ({
		...config,
		files: ['**/*.svelte'],
		languageOptions: {
			...config.languageOptions,
			parserOptions: {
				...config.languageOptions?.parserOptions,
				parser: tsParser
			},
			globals: { ...globals.browser }
		},
		rules: {
			...config.rules,
			'svelte/no-navigation-without-resolve': 'off'
		}
	})),
	{
		ignores: ['build/', '.svelte-kit/', 'node_modules/']
	}
];
