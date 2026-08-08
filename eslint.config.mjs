import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

export default defineConfig([
    ...nextVitals,
    ...nextTypescript,
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        rules: {
            'react/no-unescaped-entities': 'off',
            'react-hooks/set-state-in-effect': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-empty-object-type': 'off',
            'no-console': ['warn', { allow: ['warn', 'error'] }],
        },
    },
    {
        files: ['__tests__/**/*.{ts,tsx}'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
    {
        files: ['src/app/**/opengraph-image.tsx'],
        rules: {
            '@next/next/no-img-element': 'off',
        },
    },
    globalIgnores([
        '.next/**',
        'node_modules/**',
        'out/**',
        'build/**',
        'dist/**',
        'coverage/**',
        '.cache/**',
        'public/**',
        'jest.config.js',
    ]),
]);
