// Removes the warning that we are using an unsupported version of TypeScript.
process.env.TS_JEST_DISABLE_VER_CHECKER = true;

module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": ["babel-jest", { configFile: "../../jest.babel.config.js" }],
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(j|t)sx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testPathIgnorePatterns: ["/mocks/"],
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/dist/**",
    "!**/build/**",
    "!**/jest.config.{js,ts}",
  ],
};
