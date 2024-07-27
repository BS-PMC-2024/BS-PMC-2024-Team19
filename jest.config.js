module.exports = {
  testEnvironment: "node", // or 'jsdom' for React applications
  testMatch: ["/tests//.js?(x)", "/?(.)+(spec|test).js?(x)"],
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  transform: {
    "^.+\\.jsx?$": "babel-jest", // Use babel-jest to transpile JavaScript files
  },
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy", // Mock CSS modules
  },
  collectCoverage: true, // Enable coverage reports
  collectCoverageFrom: ["src/*/.{js,jsx}", "!src/index.js"], // Specify files for coverage
  coverageReporters: ["text", "lcov"],
};
