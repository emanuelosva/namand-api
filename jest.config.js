module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  globals: {
    'ts-jest': {
      compiler: 'ttypescript',
    },
  },
  setupFiles: [
    './config.ts',
  ],
  moduleDirectories: [
    'node_modules',
    'src',
  ],
  roots: [
    'src',
  ],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '@common/(.*)': '<rootDir>/src/common/$1',
    '@domains/(.*)': '<rootDir>/src/domains/$1',
    '@infraestructure/(.*)': '<rootDir>/src/infraestructure/$1',
    '@business/(.*)': '<rootDir>/src/domains/business/$1',
    '@authentication/(.*)': '<rootDir>/src/domains/authentication/$1',
    '@staffs/(.*)': '<rootDir>/src/domains/staffs/$1',
    '@appointments/(.*)': '<rootDir>/src/domains/appointments/$1',
    '@httpDelivery/(.*)': '<rootDir>/src/delivery/http/$1',
  },
}
