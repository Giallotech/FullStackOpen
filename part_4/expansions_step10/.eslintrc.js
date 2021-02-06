module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    eqeqeq: 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'object-curly-newline': ['error', 'always'],
    'arrow-spacing': ['error', {
      before: true,
      after: true
    }],
    'no-console': 0,
    'multiline-ternary': ['error', 'always'],
    'arrow-parens': ['error', 'as-needed'],
    'no-multiple-empty-lines': ['error', {
      max: 1
    }],
    'object-property-newline': 'error',
    'lines-around-comment': ['error', {
      'beforeBlockComment': true
    }],
  },
}
