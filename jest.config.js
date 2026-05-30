const nextJest = require('next/jest.js');

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  moduleDirectories: ['node_modules'],
  setupFilesAfterEnv: ['<rootDir>/jest/jest.setup.js'],
  testEnvironment: 'jsdom',
  modulePaths: ['<rootDir>/src'],
  modulePathIgnorePatterns: ['validatorTestUtils.ts', '__mock', 'stubs'],
};

module.exports = async () => {
  const nextJestConfig = await createJestConfig(config)();
  return {
    ...nextJestConfig,
    transformIgnorePatterns: [
      'node_modules/(?!(swiper|ssr-window|dom7)/)',
    ],
    moduleNameMapper: {
      ...nextJestConfig.moduleNameMapper,
      '^swiper/css.*$': '<rootDir>/jest/jestStyleMock.js',
      '\\.svg$': '<rootDir>/jest/jestMockSvg.js',
      '\\.module\\.(css|scss)$': '<rootDir>/jest/jestCssModuleMock.js',
      '\\.(css|scss)$': '<rootDir>/jest/jestStyleMock.js',
      '^@/(.*)$': '<rootDir>/src/$1',
    },
  };
};
