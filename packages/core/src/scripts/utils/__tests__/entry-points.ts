import * as fsExtra from "fs-extra";
import {
  generateClientEntryPoints,
  generateServerEntryPoint,
  checkForPackages,
  entryPoint,
} from "../entry-points";
import * as entryExists from "../entry-exists";

jest.mock("fs-extra");
jest.mock("../entry-exists");

const mockedFsExtra = fsExtra as jest.Mocked<typeof fsExtra>;
const mockedEntryExists = entryExists as jest.Mocked<typeof entryExists>;

const site = [
  {
    name: "site-1",
    mode: "default",
    packages: ["package1", "package2"],
  },
];
const sites = [
  {
    name: "site-html",
    mode: "default",
    packages: ["package1", "package2", "package2"],
  },
  {
    name: "site-amp",
    mode: "amp",
    packages: ["package1", "package3"],
  },
  {
    name: "site-2",
    mode: "default",
    packages: ["package1"],
  },
];

beforeEach(() => {
  mockedFsExtra.writeFile.mockReset();
  mockedFsExtra.ensureDir.mockReset();
  mockedFsExtra.ensureDir.mockImplementation(() => {});
  mockedFsExtra.pathExists.mockReset();
  mockedFsExtra.pathExists.mockImplementation(() => Promise.resolve(true));
  mockedEntryExists.default.mockImplementation((path) => {
    if (path === "package1/src/index") return Promise.resolve(".ts");
    if (path === "package2/src/client") return Promise.resolve(".ts");
    if (path === "package2/src/server") return Promise.resolve(".ts");
    if (path === "package3/src/index") return Promise.resolve(".ts");
    if (path === "package3/src/client") return Promise.resolve(".ts");
    if (path === "package3/src/server/index") return Promise.resolve(".ts");
    if (path === "package3/src/amp/client/index") return Promise.resolve(".ts");
    if (path === "package3/src/amp/server") return Promise.resolve(".ts");
    return Promise.resolve(false);
  });
});

describe("generateClientEntryPoints", () => {
  test("should avoid creating the client file at all if packages have no entry points", async () => {
    mockedEntryExists.default.mockImplementation(() => Promise.resolve(false));
    const bundles = await generateClientEntryPoints({
      sites: site,
      outDir: "/build",
      mode: "production",
    });
    expect(mockedFsExtra.writeFile.mock.calls.length).toBe(0);
    expect(bundles).toMatchSnapshot();
  });

  test("should write one client entry point", async () => {
    const bundles = await generateClientEntryPoints({
      sites: site,
      outDir: "/build",
      mode: "production",
    });
    expect(mockedFsExtra.ensureDir.mock.calls[0]).toMatchSnapshot();
    expect({
      in: site,
      out: mockedFsExtra.writeFile.mock.calls[0],
    }).toMatchSnapshot();
    expect(bundles).toMatchSnapshot();
  });

  test("should write multiple client entry points", async () => {
    const bundles = await generateClientEntryPoints({
      sites,
      outDir: "/build",
      mode: "production",
    });
    expect(mockedFsExtra.ensureDir.mock.calls).toMatchSnapshot();
    expect({
      in: sites,
      out: mockedFsExtra.writeFile.mock.calls,
    }).toMatchSnapshot();
    expect(bundles).toMatchSnapshot();
  });

  test("should write HMR code if in development", async () => {
    const bundles = await generateClientEntryPoints({
      sites: site,
      outDir: "/build",
      mode: "development",
    });
    expect(mockedFsExtra.writeFile.mock.calls[0][1]).toMatchSnapshot();
  });
});

describe("generateServerEntryPoint", () => {
  test("should write one server entry point for one site", async () => {
    const bundles = await generateServerEntryPoint({
      sites: site,
      outDir: "/build",
    });
    expect({
      in: site,
      out: mockedFsExtra.writeFile.mock.calls[0],
    }).toMatchSnapshot();
    expect(bundles).toMatchSnapshot();
  });

  test("should write one server entry point for multiple sites", async () => {
    const bundles = await generateServerEntryPoint({ sites, outDir: "/build" });
    expect({
      in: sites,
      out: mockedFsExtra.writeFile.mock.calls,
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

describe("entryPoint", () => {
  test("should return client in amp mode when it exists", async () => {
    mockedEntryExists.default.mockImplementation((path) => {
      if (path === "@org/pkg/src/index") return Promise.resolve(".ts");
      if (path === "@org/pkg/src/client") return Promise.resolve(".ts");
      if (path === "@org/pkg/src/amp") return Promise.resolve(".ts");
      if (path === "@org/pkg/src/amp/client") return Promise.resolve(".ts");
      return Promise.resolve(false);
    });
    const entry = await entryPoint({
      name: "@org/pkg",
      mode: "amp",
      type: "client",
    });
    await expect(entry).toBe("@org/pkg/src/amp/client");
  });

  test("should return client in amp mode when it's a folder", async () => {
    mockedEntryExists.default.mockImplementation((path) => {
      if (path === "@org/pkg/src/index") return Promise.resolve(".ts");
      if (path === "@org/pkg/src/client") return Promise.resolve(".ts");
      if (path === "@org/pkg/src/amp") return Promise.resolve(".ts");
      if (path === "@org/pkg/src/amp/client/index")
        return Promise.resolve(".ts");
      return Promise.resolve(false);
    });
    const entry = await entryPoint({
      name: "@org/pkg",
      mode: "amp",
      type: "client",
    });
    await expect(entry).toBe("@org/pkg/src/amp/client/index");
  });

  test("should return index in amp mode when client doesn't exist", async () => {
    mockedEntryExists.default.mockImplementation((path) => {
      if (path === "@org/pkg/src/index") return Promise.resolve(".ts");
      if (path === "@org/pkg/src/client") return Promise.resolve(".ts");
      if (path === "@org/pkg/src/amp") return Promise.resolve(".ts");
      return Promise.resolve(false);
    });
    const entry = await entryPoint({
      name: "@org/pkg",
      mode: "amp",
      type: "client",
    });
    await expect(entry).toBe("@org/pkg/src/amp");
  });

  test("should return index in amp mode when client doesn't exist and it's in a folder", async () => {
    mockedEntryExists.default.mockImplementation((path) => {
      if (path === "@org/pkg/src/index") return Promise.resolve(".ts");
      if (path === "@org/pkg/src/client") return Promise.resolve(".ts");
      if (path === "@org/pkg/src/amp/index") return Promise.resolve(".ts");
      return Promise.resolve(false);
    });
    const entry = await entryPoint({
      name: "@org/pkg",
      mode: "amp",
      type: "client",
    });
    await expect(entry).toBe("@org/pkg/src/amp/index");
  });

  test("should return default client in amp mode when amp folder doesn't exist", async () => {
    mockedEntryExists.default.mockImplementation((path) => {
      if (path === "@org/pkg/src/index") return Promise.resolve(".ts");
      if (path === "@org/pkg/src/client") return Promise.resolve(".ts");
      return Promise.resolve(false);
    });
    const entry = await entryPoint({
      name: "@org/pkg",
      mode: "amp",
      type: "client",
    });
    await expect(entry).toBe("@org/pkg/src/client");
  });

  test("should return default client in amp mode when amp folder doesn't exist and it's a folder", async () => {
    mockedEntryExists.default.mockImplementation((path) => {
      if (path === "@org/pkg/src/index") return Promise.resolve(".ts");
      if (path === "@org/pkg/src/client/index") return Promise.resolve(".ts");
      return Promise.resolve(false);
    });
    const entry = await entryPoint({
      name: "@org/pkg",
      mode: "amp",
      type: "client",
    });
    await expect(entry).toBe("@org/pkg/src/client/index");
  });

  test("should return default index in amp mode when amp folder doesn't exist", async () => {
    mockedEntryExists.default.mockImplementation((path) => {
      if (path === "@org/pkg/src/index") return Promise.resolve(".ts");
      return Promise.resolve(false);
    });
    const entry = await entryPoint({
      name: "@org/pkg",
      mode: "amp",
      type: "client",
    });
    await expect(entry).toBe("@org/pkg/src/index");
  });

  test("should not return path when none exist", async () => {
    mockedEntryExists.default.mockImplementation((path) => {
      return Promise.resolve(false);
    });
    const entry = await entryPoint({
      name: "@org/pkg",
      mode: "amp",
      type: "client",
    });
    await expect(entry).toBe("");
  });

  test("should return server in amp mode when it exists", async () => {
    mockedEntryExists.default.mockImplementation((path) => {
      if (path === "@org/pkg/src/index") return Promise.resolve(".ts");
      if (path === "@org/pkg/src/server") return Promise.resolve(".ts");
      if (path === "@org/pkg/src/amp") return Promise.resolve(".ts");
      if (path === "@org/pkg/src/amp/server") return Promise.resolve(".ts");
      return Promise.resolve(false);
    });
    const entry = await entryPoint({
      name: "@org/pkg",
      mode: "amp",
      type: "server",
    });
    await expect(entry).toBe("@org/pkg/src/amp/server");
  });

  test("should return server in amp mode when it exists but it's in a folder", async () => {
    mockedEntryExists.default.mockImplementation((path) => {
      if (path === "@org/pkg/src/index") return Promise.resolve(".ts");
      if (path === "@org/pkg/src/server") return Promise.resolve(".ts");
      if (path === "@org/pkg/src/amp") return Promise.resolve(".ts");
      if (path === "@org/pkg/src/amp/server/index")
        return Promise.resolve(".ts");
      return Promise.resolve(false);
    });
    const entry = await entryPoint({
      name: "@org/pkg",
      mode: "amp",
      type: "server",
    });
    await expect(entry).toBe("@org/pkg/src/amp/server/index");
  });

  test("should return index in amp mode when server doesn't exist", async () => {
    mockedEntryExists.default.mockImplementation((path) => {
      if (path === "@org/pkg/src/index") return Promise.resolve(".ts");
      if (path === "@org/pkg/src/server") return Promise.resolve(".ts");
      if (path === "@org/pkg/src/amp") return Promise.resolve(".ts");
      return Promise.resolve(false);
    });
    const entry = await entryPoint({
      name: "@org/pkg",
      mode: "amp",
      type: "server",
    });
    await expect(entry).toBe("@org/pkg/src/amp");
  });

  test("should return index in amp mode when server doesn't exist but it's in a folder", async () => {
    mockedEntryExists.default.mockImplementation((path) => {
      if (path === "@org/pkg/src/index") return Promise.resolve(".ts");
      if (path === "@org/pkg/src/server") return Promise.resolve(".ts");
      if (path === "@org/pkg/src/amp/index") return Promise.resolve(".ts");
      return Promise.resolve(false);
    });
    const entry = await entryPoint({
      name: "@org/pkg",
      mode: "amp",
      type: "server",
    });
    await expect(entry).toBe("@org/pkg/src/amp/index");
  });

  test("should return only the type in amp mode when it exists", async () => {
    mockedEntryExists.default.mockImplementation((path) => {
      if (path === "@org/pkg/src/index") return Promise.resolve(".ts");
      if (path === "@org/pkg/src/inline") return Promise.resolve(".ts");
      if (path === "@org/pkg/src/client") return Promise.resolve(".ts");
      if (path === "@org/pkg/src/amp") return Promise.resolve(".ts");
      if (path === "@org/pkg/src/amp/client") return Promise.resolve(".ts");
      if (path === "@org/pkg/src/amp/inline") return Promise.resolve(".ts");
      return Promise.resolve(false);
    });
    const entry = await entryPoint({
      name: "@org/pkg",
      mode: "amp",
      type: "inline",
    });
    await expect(entry).toBe("@org/pkg/src/amp/inline");
  });

  test("should return the type in amp mode when default exists", async () => {
    mockedEntryExists.default.mockImplementation((path) => {
      if (path === "@org/pkg/src/index") return Promise.resolve(".ts");
      if (path === "@org/pkg/src/inline") return Promise.resolve(".ts");
      if (path === "@org/pkg/src/client") return Promise.resolve(".ts");
      if (path === "@org/pkg/src/amp") return Promise.resolve(".ts");
      if (path === "@org/pkg/src/amp/client") return Promise.resolve(".ts");
      return Promise.resolve(false);
    });
    const entry = await entryPoint({
      name: "@org/pkg",
      mode: "amp",
      type: "inline",
    });
    await expect(entry).toBe("@org/pkg/src/inline");
  });

  test("should not return the type in amp mode when it doesn't exist", async () => {
    mockedEntryExists.default.mockImplementation((path) => {
      if (path === "@org/pkg/src/index") return Promise.resolve(".ts");
      if (path === "@org/pkg/src/client") return Promise.resolve(".ts");
      if (path === "@org/pkg/src/amp") return Promise.resolve(".ts");
      if (path === "@org/pkg/src/amp/client") return Promise.resolve(".ts");
      return Promise.resolve(false);
    });
    const entry = await entryPoint({
      name: "@org/pkg",
      mode: "amp",
      type: "inline",
    });
    await expect(entry).toBe("");
  });

  test("should return no-mode client in default mode", async () => {
    mockedEntryExists.default.mockImplementation((path) => {
      if (path === "@org/pkg/src/index") return Promise.resolve(".ts");
      if (path === "@org/pkg/src/client") return Promise.resolve(".ts");
      if (path === "@org/pkg/src/default") return Promise.resolve(".ts");
      if (path === "@org/pkg/src/default/client") return Promise.resolve(".ts");
      return Promise.resolve(false);
    });
    const entry = await entryPoint({
      name: "@org/pkg",
      mode: "default",
      type: "client",
    });
    await expect(entry).toBe("@org/pkg/src/client");
  });

  test("should return no-mode index in default mode", async () => {
    mockedEntryExists.default.mockImplementation((path) => {
      if (path === "@org/pkg/src/index") return Promise.resolve(".ts");
      if (path === "@org/pkg/src/default") return Promise.resolve(".ts");
      if (path === "@org/pkg/src/default/client") return Promise.resolve(".ts");
      return Promise.resolve(false);
    });
    const entry = await entryPoint({
      name: "@org/pkg",
      mode: "default",
      type: "client",
    });
    await expect(entry).toBe("@org/pkg/src/index");
  });
});
