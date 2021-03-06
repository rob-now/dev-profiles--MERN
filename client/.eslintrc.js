module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  rules: {
    'react/prefer-stateless-function': 0,
    'react/jsx-filename-extension': 0,
    semi: 0,
    'react/jsx-one-expression-per-line': 0,
    'react/destructuring-assignment': 0,
    'import/prefer-default-export': 0,
  },
  globals: {
    window: true,
    localStorage: true,
  },
}
