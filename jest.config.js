module.exports = {
  transform: { "^.+\\.js$": "babel-jest" },
  testMatch: ["<rootDir>/{web,api}/**/*.spec.js"],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1"
  },
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/{web,api}/**/*.js"],
  coverageReporters: ["html", "text-summary"],
  setupFilesAfterEnv: ["jest-extended"]
}
