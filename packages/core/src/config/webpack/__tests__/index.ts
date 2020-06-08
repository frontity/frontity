import * as hash from "hash-it";
import * as path from "path";
import getWebpack from "../";

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
    server: { presets: ["server-development"], plugins: [] },
  },
  production: {
    es5: { presets: ["es5-production"], plugins: [] },
    module: { presets: ["module-production"], plugins: [] },
    server: { presets: ["server-production"], plugins: [] },
  },
};

const frontity = {
  outDir: "build",
};

const entryPoints = [
  {
    name: "server",
    path: "./build/bundling/entry-points/server.js",
  },
  {
    name: "site-1",
    path: "./build/bundling/entry-points/site-1/client.js",
  },
  {
    name: "site-2",
    path: "./build/bundling/entry-points/site-1/client.js",
  },
];

test("Webpack returns for development", () => {
  expect(
    getWebpack({
      mode: "development",
      babel: babel["development"],
      frontity,
      entryPoints,
    })
  ).toMatchSnapshot();
});

test("Webpack returns for production", () => {
  expect(
    getWebpack({
      mode: "production",
      babel: babel["production"],
      frontity,
      entryPoints,
    })
  ).toMatchSnapshot();
});

test("Webpack changes the public path if specified", () => {
  const publicPath = "/custom-public-path/";

  const { es5, module, server } = getWebpack({
    mode: "production",
    babel: babel["production"],
    frontity,
    entryPoints,
    publicPath,
  });

  expect(es5.output.publicPath).toBe(publicPath);
  expect(module.output.publicPath).toBe(publicPath);
  expect(server.output.publicPath).toBe(publicPath);
});
