const config = {
  collectCoverage: true,
  //collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageDirectory: "coverage",
  coverageProvider: 'babel',
  // preset: undefined,
  // rootDir: undefined,
  roots: ["<rootDir>/src/"],
  testEnvironment: "node",
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}

module.exports = config
