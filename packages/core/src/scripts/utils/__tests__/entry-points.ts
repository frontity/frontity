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
    packages: [
      { name: "package1", exclude: [] },
      { name: "package2", exclude: ["ns1", "ns2"] }
    ]
  }
];
const sites = [
  {
    name: "site-html",
    mode: "html",
    packages: [
      { name: "package1", exclude: [] },
      { name: "package2", exclude: [] },
      { name: "package2", exclude: [] }
    ]
  },
  {
    name: "site-amp",
    mode: "amp",
    packages: [
      { name: "package1", exclude: [] },
      { name: "package3", exclude: [] }
    ]
  },
  {
    name: "site-2",
    mode: "html",
    packages: [{ name: "package1", exclude: [] }]
  }
];

beforeEach(() => {
  mockedFsExtra.writeFile.mockReset();
  mockedFsExtra.ensureDir.mockReset();
  mockedFsExtra.ensureDir.mockImplementation(() => {});
  mockedFsExtra.pathExists.mockReset();
  mockedFsExtra.pathExists.mockImplementation(() => Promise.resolve(true));
});

describe("generateClientEntryPoints", () => {
  test("should avoid creating the client file at all if packages have no entry points", async () => {
    mockedFsExtra.pathExists.mockImplementation(() => Promise.resolve(false));
    const bundles = await generateClientEntryPoints({
      sites: site,
      outDir: "/build",
      mode: "production"
    });
    expect(mockedFsExtra.writeFile.mock.calls.length).toBe(0);
    expect(bundles).toMatchSnapshot();
  });

  test("should write one client entry point", async () => {
    const bundles = await generateClientEntryPoints({
      sites: site,
      outDir: "/build",
      mode: "production"
    });
    expect(mockedFsExtra.ensureDir.mock.calls[0]).toMatchSnapshot();
    expect({
      in: site,
      out: mockedFsExtra.writeFile.mock.calls[0]
    }).toMatchSnapshot();
    expect(bundles).toMatchSnapshot();
  });

  test("should write multiple client entry points", async () => {
    const bundles = await generateClientEntryPoints({
      sites,
      outDir: "/build",
      mode: "production"
    });
    expect(mockedFsExtra.ensureDir.mock.calls).toMatchSnapshot();
    expect({
      in: sites,
      out: mockedFsExtra.writeFile.mock.calls
    }).toMatchSnapshot();
    expect(bundles).toMatchSnapshot();
  });

  test("should write HMR code if in development", async () => {
    const bundles = await generateClientEntryPoints({
      sites: site,
      outDir: "/build",
      mode: "development"
    });
    expect(mockedFsExtra.writeFile.mock.calls[0][1]).toMatchSnapshot();
  });
});

describe("generateServerEntryPoint", () => {
  test("should write one server entry point for one site", async () => {
    const bundles = await generateServerEntryPoint({
      sites: site,
      outDir: "/build"
    });
    expect({
      in: site,
      out: mockedFsExtra.writeFile.mock.calls[0]
    }).toMatchSnapshot();
    expect(bundles).toMatchSnapshot();
  });

  test("should write one server entry point for multiple sites", async () => {
    const bundles = await generateServerEntryPoint({ sites, outDir: "/build" });
    expect({
      in: sites,
      out: mockedFsExtra.writeFile.mock.calls
    }).toMatchSnapshot();
    expect(bundles).toMatchSnapshot();
  });
});

describe("checkForPackages", () => {
  test("should not throw if all packages are found", async () => {
    await expect(checkForPackages({ sites: site })).resolves.toBe(undefined);
  });

  test("should throw if one package is not found", async () => {
    mockedFsExtra.pathExists.mockImplementation(() => Promise.resolve(false));
    await expect(checkForPackages({ sites: site })).rejects.toThrow(
      'The package "package1" doesn\'t seem to be installed. Make sure you did "npm install package1"'
    );
  });
});
