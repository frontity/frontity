import * as path from 'path'
import getWebpack from "../";
import { existsSync } from 'fs';

jest.mock('path');
const resolve: jest.Mock<typeof path.resolve> = path.resolve as any;
resolve.mockImplementation((_, dir) => dir);

const babel = {
  development: {
    es5: { presets: ["es5-development"], plugins: [] },
    module: { presets: ["module-development"], plugins: [] },
    node: { presets: ["node-development"], plugins: [] }
  },
  production: {
    es5: { presets: ["es5-production"], plugins: [] },
    module: { presets: ["module-production"], plugins: [] },
    node: { presets: ["node-production"], plugins: [] }
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
