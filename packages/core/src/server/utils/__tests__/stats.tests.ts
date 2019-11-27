import { hasEntryPoint, getBothScriptTags } from "../stats";

describe("hasEntryPoint", () => {
  test("should return true if the entry points exists", () => {
    const stats = { assetsByChunkName: { "chunk-1": "chunk-1.js" } };
    expect(hasEntryPoint({ site: "chunk-1", stats })).toBe(true);
  });
  test("should return false if the entry points doesn't exist", () => {
    const stats = { assetsByChunkName: {} };
    expect(hasEntryPoint({ site: "chunk-1", stats })).toBe(false);
  });
});

describe("getBothScriptTags", () => {
  test("should return both es5 and module tags in development", () => {
    const moduleStats = {
      assetsByChunkName: {
        "chunk-1": "chunk-1.module.js",
        "chunk-2": "chunk-2.module.js"
      }
    };
    const es5Stats = {
      assetsByChunkName: {
        "chunk-1": "chunk-1.es5.js",
        "chunk-2": "chunk-2.es5.js"
      }
    };
    const extractor = {
      publicPath: "/public-path/",
      getMainAssets: () => [
        { filename: "chunk-1.module.js" },
        { filename: "chunk-2.module.js" }
      ],
      getRequiredChunksScriptTag: (arg: {}) =>
        !!arg && "<script>REQ-CHUNK-SCRIPT-TAG</script>"
    };
    expect(
      getBothScriptTags({ moduleStats, es5Stats, extractor })
    ).toMatchSnapshot();
  });

  test("should return both es5 and module tags in production", () => {
    const moduleStats = {
      assetsByChunkName: {
        "chunk-1": "chunk-1.module.123.js",
        "chunk-2": "chunk-2.module.123.js"
      }
    };
    const es5Stats = {
      assetsByChunkName: {
        "chunk-1": "chunk-1.es5.456.js",
        "chunk-2": "chunk-2.es5.456.js"
      }
    };
    const extractor = {
      publicPath: "/public-path/",
      getMainAssets: () => [
        { filename: "chunk-1.module.123.js" },
        { filename: "chunk-2.module.123.js" }
      ],
      getRequiredChunksScriptTag: (arg: {}) =>
        !!arg && "<script>REQ-CHUNK-SCRIPT-TAG</script>"
    };
    expect(
      getBothScriptTags({ moduleStats, es5Stats, extractor })
    ).toMatchSnapshot();
  });

  test("should work with secondary chunks in development", () => {
    const moduleStats = {
      assetsByChunkName: {
        "chunk-1": "chunk-1.module.js",
        "chunk-2": "chunk-2.module.js",
        "chunk-1~chunk-2": "chunk-1~chunk-2.module.js"
      }
    };
    const es5Stats = {
      assetsByChunkName: {
        "chunk-1": "chunk-1.es5.js",
        "chunk-2": "chunk-2.es5.js",
        "chunk-1~chunk-2": "chunk-1~chunk-2.es5.js"
      }
    };
    const extractor = {
      publicPath: "/public-path/",
      getMainAssets: () => [
        { filename: "chunk-1.module.js" },
        { filename: "chunk-2.module.js" },
        { filename: "chunk-1~chunk-2.module.js" }
      ],
      getRequiredChunksScriptTag: (arg: {}) =>
        !!arg && "<script>REQ-CHUNK-SCRIPT-TAG</script>"
    };
    expect(
      getBothScriptTags({ moduleStats, es5Stats, extractor })
    ).toMatchSnapshot();
  });

  test("should work with secondary chunks in production", () => {
    const moduleStats = {
      assetsByChunkName: {
        "chunk-1": "chunk-1.module.123.js",
        "chunk-2": "chunk-2.module.123.js",
        "chunk-1~chunk-2": "chunk-1~chunk-2.module.123.js"
      }
    };
    const es5Stats = {
      assetsByChunkName: {
        "chunk-1": "chunk-1.es5.456.js",
        "chunk-2": "chunk-2.es5.456.js",
        "chunk-1~chunk-2": "chunk-1~chunk-2.es5.456.js"
      }
    };
    const extractor = {
      publicPath: "/public-path/",
      getMainAssets: () => [
        { filename: "chunk-1.module.123.js" },
        { filename: "chunk-2.module.123.js" },
        { filename: "chunk-1~chunk-2.module.123.js" }
      ],
      getRequiredChunksScriptTag: (arg: {}) =>
        !!arg && "<script>REQ-CHUNK-SCRIPT-TAG</script>"
    };
    expect(
      getBothScriptTags({ moduleStats, es5Stats, extractor })
    ).toMatchSnapshot();
  });
});
