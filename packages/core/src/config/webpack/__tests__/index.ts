import * as hash from "hash-it";
import * as path from "path";
import getWebpack from "../";
import { existsSync } from "fs";

jest.mock("path");
const mockedPath = path as jest.Mocked<typeof path>;
mockedPath.resolve.mockImplementation((_, ...dirs) => dirs.join("/"));

jest.mock("hash-it");
const mockedHash = hash as jest.Mocked<typeof hash>;
mockedHash.default.mockReturnValue("123");

const babel = {
  development: {
    es5: { presets: ["es5-development"], plugins: [] },
    module: { presets: ["module-development"], plugins: [] },
    server: { presets: ["server-development"], plugins: [] }
  },
  production: {
    es5: { presets: ["es5-production"], plugins: [] },
    module: { presets: ["module-production"], plugins: [] },
    server: { presets: ["server-production"], plugins: [] }
  }
};

test("Babel returns for development", () => {
  expect(
    getWebpack({ mode: "development", babel: babel["development"] })
  ).toMatchSnapshot();
});

test("Babel returns for production", () => {
  expect(
    getWebpack({ mode: "production", babel: babel["production"] })
  ).toMatchSnapshot();
});
