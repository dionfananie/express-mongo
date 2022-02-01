module.exports = {
  env: {
    es6: true,
    node: true,
    commonjs: true,
    browser: true,
  },
  extends: ['prettier'],
  plugins: ['prettier'],

  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'error',
    camelcase: 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
  },
};
