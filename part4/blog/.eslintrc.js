module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
        jest: true,
    },
    extends: 'airbnb-base',
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        indent: [
            'error',
            4,
        ],
        'linebreak-style': [
            'error',
            'unix',
        ],
        quotes: [
            'error',
            'single',
        ],
        semi: [
            'error',
            'never',
        ],
        eqeqeq: 'error',
        'no-trailing-spaces': 'error',
        'object-curly-spacing': [
            'error', 'always',
        ],
        'arrow-spacing': [
            'error', { before: true, after: true },
        ],
        'no-console': 0,
        'comma-dangle': 0,
        'arrow-parens': 0,
        'no-underscore-dangle': 0,
    },
}
