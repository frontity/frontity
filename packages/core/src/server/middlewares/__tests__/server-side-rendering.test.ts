import { serverSideRendering } from "../server-side-rendering";
import { fakeNext } from "./__utilities__/fake-next";

jest.mock("@loadable/server", () => ({
  ChunkExtractor: function ChunkExtractor() {
    this.collectChunks = jest.fn();
    this.getLinkTags = jest
      .fn()
      .mockReturnValue(['<link rel="chunk-extractor-link" />']);
    this.getScriptTags = jest
      .fn()
      .mockReturnValue(["<script chunk-extractor-script></script>"]);
  },
}));

jest.mock("../../utils/stats", () => ({
  hasEntryPoint: jest.fn().mockReturnValue(true),
  getBothScriptTags: jest
    .fn()
    .mockReturnValue("<script get-both-scripts></script>"),
}));

jest.mock("../../utils/head", () => () => ({
  head: ['<link rel="helmet-link" />'],
  bodyAttributes: 'helment-attr="body"',
  htmlAttributes: 'helment-attr="html"',
}));

const createPredefinedContext = ({
  stats = {},
  render = null,
  template = null,
  App = null,
} = {}) => ({
  frontity: {
    stats: {
      moduleStats: false,
      es5Stats: false,
      ...stats,
    },
    settings: {
      name: "test",
    },
    store: {
      actions: [],
      state: {
        FRONTITY_TEST: true,
        frontity: {
          options: {
            publicPath: "/static",
          },
        },
      },
      libraries: {
        frontity: {
          render: render || jest.fn().mockReturnValue("render()"),
          template: template || jest.fn().mockReturnValue("template()"),
          App: App || `<App />`,
          head: [],
          scripts: [],
        },
      },
    },
    helmetContext: { helmet: {} },
  },
});

describe("serverSideRendering", () => {
  it("should render with the predefined entries", async () => {
    const ctx: any = createPredefinedContext();

    await serverSideRendering(ctx, fakeNext);

    // After the first pass we expect the body to be defined
    // with the template output.
    expect(ctx.body).toEqual("template()");
  });

  it("should render with the given render and template", async () => {
    const ctx: any = createPredefinedContext({
      stats: {
        moduleStats: true,
        es5Stats: true,
      },
      render: () => {
        return "<div>App</div>";
      },
      template: ({ html, head, scripts, htmlAttributes, bodyAttributes }) => {
        return `
                    <template>
                        ${html}
                        htmlAttributes=[${htmlAttributes}]
                        bodyAttributes=[${bodyAttributes}]
                        <head>
                            ${head.filter(Boolean).join("\n")}
                        </head>
                        <scripts>
                            ${scripts.filter(Boolean).join("\n")}
                        </scripts>
                    </template>
                `;
      },
    });

    await serverSideRendering(ctx, fakeNext);

    // After the first pass we expect the body to be defined
    // with the template output.
    expect(ctx.body).toMatchSnapshot();
  });
});
