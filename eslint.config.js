import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig, globalIgnores } from 'eslint/config';
import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';

export default defineConfig([
    globalIgnores(['dist']),
    {
        files: ['**/*.{js,jsx}'],
        extends: [js.configs.recommended, reactHooks.configs.flat.recommended],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                ecmaVersion: 'latest',
                ecmaFeatures: { jsx: true },
                sourceType: 'module',
            },
        },
        plugins: {
            react,
            'react-hooks': reactHooks,
            prettier,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...react.configs.recommended.rules,
            ...react.configs['jsx-runtime'].rules,
            ...reactHooks.configs.recommended.rules,
            'react/jsx-no-target-blank': 1,
            'react/prop-types': 'warn',
            'no-console': 'error',
            'prettier/prettier': [
                'error',
                {
                    singleQuote: true,
                    printWidth: 140,
                    tabWidth: 4,
                },
            ],
        },
    },
]);
