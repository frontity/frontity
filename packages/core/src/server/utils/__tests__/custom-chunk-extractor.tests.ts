import { CustomChunkExtractor } from "../custom-chunk-extractor";

// eslint-disable-next-line @typescript-eslint/no-empty-function
function MockedChunkExtractor() {}
MockedChunkExtractor.prototype.getPreAssets = () => {
  return [
    { filename: "file.module.js", linkType: "preload" },
    { filename: "file.es5.js", linkType: "preload" },
  ];
};

jest.mock("@loadable/server", () => ({
  ChunkExtractor: MockedChunkExtractor,
}));

describe("CustomChunkExtractor", () => {
  it('Should replace "preload" with "modulepreload" only for module files', () => {
    const instance = new CustomChunkExtractor({ stats: {}, entrypoints: null });
    const results = instance.getPreAssets();

    expect(results).toMatchInlineSnapshot(`
      Array [
        Object {
          "filename": "file.module.js",
          "linkType": "modulepreload",
        },
        Object {
          "filename": "file.es5.js",
          "linkType": "preload",
        },
      ]
    `);
  });
});
