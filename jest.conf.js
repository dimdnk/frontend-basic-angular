const { pathsToModuleNameMapper } = require('ts-jest');

const {
  compilerOptions: { paths = {}, baseUrl = './' },
} = require('./tsconfig.json');
const environment = require('./webpack/environment');

module.exports = {
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$|dayjs/esm)'],
  resolver: 'jest-preset-angular/build/resolvers/ng-jest-resolver.js',
  globals: {
    ...environment,
  },
  roots: ['<rootDir>', `<rootDir>/${baseUrl}`],
  modulePaths: [`<rootDir>/${baseUrl}`],
  setupFiles: ['jest-date-mock'],
  cacheDirectory: '<rootDir>/build/jest-cache',
  coverageDirectory: '<rootDir>/build/test-results/',
  moduleNameMapper: pathsToModuleNameMapper(paths, { prefix: `<rootDir>/${baseUrl}/` }),
  reporters: [
    'default',
    ['jest-junit', { outputDirectory: '<rootDir>/build/test-results/', outputName: 'TESTS-results-jest.xml' }],
    ['jest-sonar', { outputDirectory: './build/test-results/jest', outputName: 'TESTS-results-sonar.xml' }],
  ],
  testMatch: ['<rootDir>/src/app/**/@(*.)@(spec.ts)'],
  testEnvironmentOptions: {
    url: 'https://jhipster.tech',
  },
};
