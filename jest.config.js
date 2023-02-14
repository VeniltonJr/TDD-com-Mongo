export default {
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageDirectory: "coverage",
  // preset: undefined,
  // rootDir: undefined,
  roots: ["<rootDir>/src/"],
  testEnvironment: "node",
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
};
