/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'node'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '\\.(css|less|scss|sss|style)$': '<rootDir>/node_modules/jest-css-modules',
    '^jerry-base$': '<rootDir>/src',
    '^jerry-base/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '!**/node_modules/**',
    // 单测覆盖率需要统计的文件路径
    '<rootDir>/src/utils/**/*.{ts,tsx}',
  ],
};
