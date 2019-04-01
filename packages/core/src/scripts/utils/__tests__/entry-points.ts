import fsExtra from "fs-extra";
import { generateClientEntryPoints } from "../entry-points";

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
    packages: ["package1", "package2"]
  },
  {
    name: "site-amp",
    mode: "amp",
    packages: ["package1", "package3"]
  }
];

test("it should write one client entry point", async () => {
  await generateClientEntryPoints({ sites: site, outDir: "/build" });
  expect({
    in: site,
    out: mockedFsExtra.writeFile.mock.calls[0]
  }).toMatchSnapshot();
});

test("it should write multiple client entry points", async () => {
  await generateClientEntryPoints({ sites, outDir: "/build" });
  expect({
    in: sites,
    out: mockedFsExtra.writeFile.mock.calls
  }).toMatchSnapshot();
});
