import { hasEntryPoint, getBothScriptTags } from "../stats";

describe("hasEntryPoint", () => {
  test("should return true if the entry points exists", () => {
    const stats = { assetsByChunkName: { "site-1": "site-1.js" } };
    expect(hasEntryPoint({ site: "site-1", stats })).toBe(true);
  });
  test("should return false if the entry points doesn't exist", () => {
    const stats = { assetsByChunkName: {} };
    expect(hasEntryPoint({ site: "site-1", stats })).toBe(false);
  });
});

describe("getBothScriptTags", () => {
  test("should return both es5 and module tags", () => {
    const moduleStats = {
      assetsByChunkName: {
        "site-1": "site-1.module.js",
        "site-2": "site-2.module.js"
      }
    };
    const es5Stats = {
      assetsByChunkName: {
        "site-1": "site-1.es5.js",
        "site-2": "site-2.es5.js"
      }
    };
    const extractor = {
      publicPath: "/public-path/",
      getMainAssets: () => [{ chunk: "site-1" }, { chunk: "site-2" }],
      getRequiredChunksScriptTag: (arg: {}) =>
        !!arg && "<script>REQ-CHUNK-SCRIPT-TAG</script>"
    };
    expect(
      getBothScriptTags({ moduleStats, es5Stats, extractor })
    ).toMatchSnapshot();
  });
});
