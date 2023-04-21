import * as hash from "hash-it";
import * as path from "path";
import getWebpack from "..";
import type { WebpackConfigs } from "../../../../types";

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

const removeAbsolutePath = (path: string) =>
  path.replace(/^.*\/node_modules\//, "");

const mapFallbacks = (configs: WebpackConfigs) => {
  Object.keys(configs).forEach((mode: "module" | "es5" | "server") => {
    Object.entries(configs[mode].resolve.fallback).forEach(([key, value]) => {
      configs[mode].resolve.fallback[key] = removeAbsolutePath(value);
    });
  });

  return configs;
};

test("Webpack returns for development", () => {
  let configs = getWebpack({
    mode: "development",
    babel: babel["development"],
    frontity,
    entryPoints,
  });

  configs = mapFallbacks(configs);

  expect(configs).toMatchSnapshot();
});

test("Webpack returns for production", () => {
  let configs = getWebpack({
    mode: "production",
    babel: babel["production"],
    frontity,
    entryPoints,
  });

  configs = mapFallbacks(configs);

  expect(configs).toMatchSnapshot();
});

test("Webpack includes the Bundle Analyzer plugin if specified", () => {
  const { es5, module, server } = getWebpack({
    mode: "production",
    babel: babel["production"],
    frontity,
    entryPoints,
    analyze: true,
  });

  expect(es5.plugins).toMatchSnapshot();
  expect(module.plugins).toMatchSnapshot();
  expect(server.plugins).toMatchSnapshot();
});
