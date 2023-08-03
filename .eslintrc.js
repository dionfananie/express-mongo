module.exports = {
  env: {
    es6: true,
    node: true,
    commonjs: true,
    browser: true,
  },
  plugins: ['prettier'],

  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'prettier/prettier': 'error',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'error',
    camelcase: 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    // 'no-unused-vars': ['none', { argsIgnorePattern: 'next' }],
  },
};
