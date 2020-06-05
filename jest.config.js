module.exports = {
  transform: { "^.+\\.(t|j)sx?$": "ts-jest" },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(j|t)sx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testPathIgnorePatterns: ["/mocks/"],
  collectCoverageFrom: [
    "**/packages/**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/dist/**",
    "!**/build/**",
  ],
};
