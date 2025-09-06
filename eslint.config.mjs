import eslint from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config';

export default defineConfig([
	// eslint.configs.recommended,
	// tseslint.configs.recommended,
	{
		files: ['**/*.{ts,tsx}'],
		extends: [
			eslint.configs.recommended,
			tseslint.configs.recommended,
			reactHooks.configs['recommended-latest'],
			// reactRefresh.configs.recommended,
		],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
	},
	{
		rules: {
			"@typescript-eslint/no-unused-vars": ["error", {
				argsIgnorePattern: "^_",
				varsIgnorePattern: "^_",
				caughtErrorsIgnorePattern: "^_",
			}],
		}
	},
	{
		ignores: [
			"node_modules/**",
			".next/**",
			"out/**",
			"build/**",
			"next-env.d.ts",
		],
	},
])
