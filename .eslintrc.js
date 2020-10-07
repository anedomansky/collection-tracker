module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        'plugin:vue/strongly-recommended',
        '@vue/airbnb',
        '@vue/typescript/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2020,
        parser: '@typescript-eslint/parser',
    },
    rules: {
        'prefer-destructuring': ['error', { object: true, array: false }],
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        indent: ['warn', 4],
        'max-len': 'off',
        'class-methods-use-this': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'vue/html-indent': ['warn', 4],
        'vue/attribute-hyphenation': ['error', 'never'],
        'vue/experimental-script-setup-vars': 'off',
        'vue/custom-event-name-casing': 'off',
    },
    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)',
            ],
            env: {
                jest: true,
            },
        },
    ],
};
