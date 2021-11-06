module.exports = {
    root: true,
    extends: ['@djaler/typescript'],
    parserOptions: {
        project: './tsconfig.lint.json',
    },
    settings: {
        'import/resolver': {
            typescript: {},
        },
    },
    overrides: [
        {
            files: ['src/html/runtime/getUrl.js'],
            rules: {
                'no-param-reassign': 'off',
                'no-underscore-dangle': 'off',
                '@typescript-eslint/no-unsafe-return': 'off',
                '@typescript-eslint/restrict-template-expressions': 'off',
            },
        },
    ],
};
