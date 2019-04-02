import * as fsExtra from "fs-extra";
import {
  generateClientEntryPoints,
  generateServerEntryPoint,
  checkForPackages
} from "../entry-points";

jest.mock("fs-extra");
const mockedFsExtra = fsExtra as jest.Mocked<typeof fsExtra>;

const site = [
  {
    name: "site-1",
    mode: "html",
    packages: ["package1", "package2"]
  }
];
const sites = [
  {
    name: "site-html",
    mode: "html",
    packages: ["package1", "package2", "package2"]
  },
  {
    name: "site-amp",
    mode: "amp",
    packages: ["package1", "package3"]
  },
  {
    name: "site-2",
    mode: "html",
    packages: ["package1"]
  }
];

beforeEach(() => {
  mockedFsExtra.writeFile.mockReset();
  mockedFsExtra.ensureDir.mockReset();
  mockedFsExtra.ensureDir.mockImplementation(() => {});
  mockedFsExtra.pathExists.mockReset();
  mockedFsExtra.pathExists.mockImplementation(() => Promise.resolve(true));
});

test("it should avoid creating the client file at all if packages have no entry points", async () => {
  mockedFsExtra.pathExists.mockImplementation(() => Promise.resolve(false));
  await generateClientEntryPoints({ sites: site, outDir: "/build" });
  expect(mockedFsExtra.writeFile.mock.calls.length).toBe(0);
});

test("it should write one client entry point", async () => {
  await generateClientEntryPoints({ sites: site, outDir: "/build" });
  expect(mockedFsExtra.ensureDir.mock.calls[0]).toMatchSnapshot();
  expect({
    in: site,
    out: mockedFsExtra.writeFile.mock.calls[0]
  }).toMatchSnapshot();
});

test("it should write multiple client entry points", async () => {
  await generateClientEntryPoints({ sites, outDir: "/build" });
  expect(mockedFsExtra.ensureDir.mock.calls).toMatchSnapshot();
  expect({
    in: sites,
    out: mockedFsExtra.writeFile.mock.calls
  }).toMatchSnapshot();
});

test("it should write one server entry point for one site", async () => {
  await generateServerEntryPoint({ sites: site, outDir: "/build" });
  expect({
    in: site,
    out: mockedFsExtra.writeFile.mock.calls[0]
  }).toMatchSnapshot();
});

test("it should write one server entry point for multiple sites", async () => {
  await generateServerEntryPoint({ sites, outDir: "/build" });
  expect({
    in: sites,
    out: mockedFsExtra.writeFile.mock.calls
  }).toMatchSnapshot();
});

test("it should not throw if all packages are found", async () => {
  await expect(checkForPackages({ sites: site })).resolves.toBe(undefined);
});

test("it should throw if one package is not found", async () => {
  mockedFsExtra.pathExists.mockImplementation(() => Promise.resolve(false));
  await expect(checkForPackages({ sites: site })).rejects.toThrow(
    'The package "package1" doesn\'t seem to be installed. Make sure you did "npm install package1"'
  );
});
