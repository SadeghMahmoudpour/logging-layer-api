module.exports = {
  root: true,

  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },

  env: {
    es6: true,
    node: true,
  },

  plugins: [
    'promise',
    'node',
  ],

  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:promise/recommended',
  ],

  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'arrow-parens': ['error', 'as-needed'],
    'brace-style': 2,
    'comma-dangle': ['error', 'only-multiline'],
    'no-console': process.env.NODE_ENV === 'production' ? ['error', {'allow': ['warn', 'error']}] : 0,
    'indent': ['error', 2, {'SwitchCase': 1}],
    'semi': ['error', 'never'],
    'consistent-return': 0,
    'curly': ['error', 'all'],
    'space-before-function-paren': ['error', 'always'],
    'space-before-blocks': 2,
    'no-multi-spaces': 2,
    'object-curly-spacing': [2, 'always'],
    'keyword-spacing': ['error'],
  },

  globals: {
    requestAnimationFrame: true,
    performance: true
  },
}
