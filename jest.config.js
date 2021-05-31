// Removes the warning that we are using an unsupported version of TypeScript.
process.env.TS_JEST_DISABLE_VER_CHECKER = true;

module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": ["babel-jest", { configFile: "../../jest.babel.config.js" }],
  },
  testMatch: ["**/__tests__/**/*.test?(s).[jt]s?(x)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testPathIgnorePatterns: ["/mocks/", "/__utilities__/"],
};
