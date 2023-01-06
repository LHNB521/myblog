module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    // 'eslint:recommended',
    // 'plugin:react/recommended',
    // 'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'alloy'
    // 'plugin:react/jsx-runtime'
  ],
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'off'
    // semi: [0],
    // 'prettier/prettier': 'error',
    // 'arrow-body-style': 'off',
    // 'prefer-arrow-callback': 'off',
    // '@typescript-eslint/no-explicit-any': ['off'],
    // '@typescript-eslint/no-var-requires': 0
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
