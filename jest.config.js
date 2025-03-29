module.exports = {
    testEnvironment: "node",
    collectCoverage: true,
    coverageDirectory: "coverage",
    collectCoverageFrom: [
        "src/**/*.js",
        "!src/models/**/*.js",
        "!src/repositories/**/*.js",
        "!src/routes/**/*.js",
        "!src/services/**/*.js",
        "!src/validators/**/*.js",
        "!src/app.js",
        "!src/config.js",
        "!src/server.js",
        "!**/node_modules/**"
    ],
    coverageReporters: ["text", "lcov", "html"],
    testMatch: ["**/tests/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
    clearMocks: true
};
