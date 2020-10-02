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
    },
    rules: {
        'prefer-destructuring': ['error', { object: true, array: false }],
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        indent: ['warn', 4],
        'max-len': 'off',
        'class-methods-use-this': 'off',
        'vue/html-indent': ['warn', 4],
        'vue/attribute-hyphenation': ['error', 'never'],
        'vue/experimental-script-setup-vars': 'off',
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
