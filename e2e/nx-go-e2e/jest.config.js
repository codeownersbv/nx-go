module.exports = {
  name: 'nx-go-e2e',
  preset: '../../jest.config.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  coverageDirectory: '../../coverage/e2e/nx-go-e2e',
}
