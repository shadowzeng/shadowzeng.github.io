module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
        mocha: true,
    },
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        '@typescript-eslint/object-curly-spacing': ['error'],
        '@typescript-eslint/no-empty-interface': [
            'error',
            {'allowSingleExtends': true},
        ],
        '@typescript-eslint/semi': ['error', 'never'],
        'no-console': 'error',
        'object-curly-spacing': 'off',
        'quotes': ['error', 'single'],
        'semi': ['error', 'never'],
    }
}