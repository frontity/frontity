import mock from "mock-fs";
import build from "../build";
import { existsSync, realpathSync } from "fs";
import { tmpdir } from "os";

// npm install can a super long time
jest.setTimeout(60000);

afterEach(() => {
  mock.restore();
});

describe("Build", () => {
  test("should build the project successfully", async () => {
    mock({
      "package.json": `{
          "name": "testing",
          "dependencies": {
            "@frontity/core": "^1.7.0",
            "@frontity/html2react": "^1.3.3",
            "@frontity/tiny-router": "^1.2.0",
            "@frontity/wp-source": "^1.7.1",
            "frontity": "^1.8.0",
            "test-theme": "file:packages/test-theme"
          }
        }`,
      "packages/test-theme/src": {
        "index.js": `
          import React from "react";
          const Root = () => <div>test</div>

          export default {
            name: "test-theme",
            roots: {
              test-theme: Root
            },
            state: {
              test-theme: {}
            },
            actions: {
              test-theme: {}
            }
          };`,
        "frontity.settings.js": `
        const settings = {
          name: "test-theme",
          state: {
            frontity: {
              url: "https://test.frontity.org",
              title: "Test Frontity Blog",
              description: "WordPress installation for Frontity development",
            },
          },
          packages: [
            {
              name: "test-theme",
            },
            {
              name: "@frontity/wp-source",
              state: {
                source: {
                  api: "https://test.frontity.org/wp-json",
                },
              },
            },
            "@frontity/tiny-router",
            "@frontity/html2react",
          ],
        };

      export default settings;`,
      },
    });

    try {
      // write the test case
    } catch (e) {
      console.log(e);
    }

    // await build({
    //   mode: "development",
    //   target: "module",
    //   publicPath: "public",
    // });

    // expect(existsSync("./build/server")).toBe(true);
  });
});
