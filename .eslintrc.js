module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    ignorePatterns: ['.eslintrc.js'],
    plugins: [
        'react',
        '@typescript-eslint',
        '@typescript-eslint/eslint-plugin',
        'import',
    ],
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/display-name': 'off',
        'import/no-named-as-default': 'off',
        'no-empty': ['error', { allowEmptyCatch: true }],
        '@typescript-eslint/no-empty-function': 'warn',
        'import/no-named-as-default-member': 'off',
        'no-empty-function': 'off',
        'no-case-declarations': 'off',
        '@typescript-eslint/no-empty-function': [
            'error',
            { allow: ['arrowFunctions'] },
        ],
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
            'error',
            { argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' },
        ],
        'import/order': [
            'error',
            {
                pathGroups: [
                    {
                        pattern: '@/**',
                        group: 'internal',
                    },
                ],
                groups: ['builtin', 'external', 'internal'],
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
                'newlines-between': 'always',
            },
        ],
    },
    settings: {
        'import/resolver': {
            typescript: {},
        },
    },
}
