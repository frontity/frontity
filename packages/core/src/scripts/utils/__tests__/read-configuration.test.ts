import mock from "mock-fs";
import { realpathSync } from "fs";
import { tmpdir } from "os";
import { readConfigurationsFromConfigFiles } from "../read-configuration";

const projectDir = realpathSync(tmpdir());

describe("Read configurations", () => {
  beforeEach(() => {
    process.env.CWD = projectDir;
  });
  afterEach(() => {
    mock.restore();
  });
  it("Should read and return configuration functions based on the name exports", async () => {
    const sites = [
      {
        name: "one",
        mode: "default",
        packages: ["foo", "bar"],
      },
    ];

    mock({
      // We only mock `foo` package so we can test that the `bar` package is excluded
      [`${projectDir}/node_modules/foo/frontity.config.js`]: `
        // We use the commonjs syntax since otherwise Jest will not be able to read this 'mocked' file
        module.exports.fooConfig = () => {};
        `,
    });

    // Reading the current configurations
    const configs = await readConfigurationsFromConfigFiles(sites);

    // Expect the configs to contain only an entry, called `fooConfig`
    expect(configs).toMatchInlineSnapshot(`
      Object {
        "default": Array [
          Object {
            "fooConfig": [Function],
          },
        ],
        "fooConfig": Array [
          [Function],
        ],
      }
    `);
  });
});
