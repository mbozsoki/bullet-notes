module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:prettier/recommended',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'prettier', 'react-hooks'],
    rules: {
        'prettier/prettier': 'error',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'no-undef': 0,
        semi: ['error', 'always'],
        quotes: ['error', 'single', { allowTemplateLiterals: true }],
        '@typescript-eslint/ban-ts-comment': 1,
        '@typescript-eslint/no-explicit-any': 1,
        'arrow-parens': ['error', 'always'],
        'quote-props': ['error', 'as-needed'],
        'comma-dangle': ['error', 'always-multiline'],
        '@typescript-eslint/semi': ['error', 'always'],
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/no-empty-function': [
            'error',
            {
                allow: ['constructors', 'arrowFunctions'],
            },
        ],
        '@typescript-eslint/interface-name-prefix': 0, // 'I' prefix for interfaces
        '@typescript-eslint/no-inferrable-types': 0,
        '@typescript-eslint/no-unused-vars': 1,
        'no-unused-vars': 1,
        'react/display-name': 1,
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
