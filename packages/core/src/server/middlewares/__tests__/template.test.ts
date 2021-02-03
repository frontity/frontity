import { template } from "../template";
import { createKoaContext } from "./__utilities__/create-koa-context";
import { fakeNext } from "./__utilities__/fake-next";

describe("template", () => {
  it("should define a default template", async () => {
    const ctx: any = createKoaContext();

    await template(ctx, fakeNext);

    expect(ctx.state.template.toString()).toMatchSnapshot();
  });

  it("the default template should accept head, scripts and attributes", async () => {
    const ctx: any = createKoaContext();

    await template(ctx, fakeNext);

    expect(
      ctx.state.template({
        head: [`<custom-tag attribute="value" />`],
        scripts: [`<script src="/path/to/script"></script>`],
        htmlAttributes: 'lang="en"',
        bodyAttributes: 'class="custom"',
      })
    ).toMatchSnapshot();
  });

  describe("custom template", () => {
    it("should define a custom template", async () => {
      const ctx: any = createKoaContext({
        template: jest.fn(),
      });

      // Call the middlware.
      await template(ctx, fakeNext);

      // The new template method should be redefined.
      expect(ctx.state.template.toString()).toMatchSnapshot();
    });

    it("should be able to call defaultTemplate", async () => {
      const ctx: any = createKoaContext({
        template: ({ defaultTemplate }) => {
          return defaultTemplate({
            head: ['<meta rel="custom" />'],
          });
        },
      });

      // Call the middleware.
      await template(ctx, fakeNext);

      // Expect the template to have a custom meta tag.
      expect(ctx.state.template()).toMatchSnapshot();
    });
  });
});
