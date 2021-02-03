import { FC } from "react";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { setupRenderMethod } from "../setup-render-method";
import { createKoaContext } from "./__utilities__/create-koa-context";
import { fakeNext } from "./__utilities__/fake-next";

jest.mock("react-dom/server", () => ({
  renderToString: jest.fn(),
  renderToStaticMarkup: jest.fn(),
}));

describe("setupRenderMethod", () => {
  it("should define a default render", async () => {
    const ctx: any = createKoaContext();

    await setupRenderMethod(ctx, fakeNext);

    expect(ctx.state.render.toString()).toMatchSnapshot();
  });

  it("should call the collect chunks if we have entry points", async () => {
    const ctx: any = createKoaContext();

    await setupRenderMethod(ctx, fakeNext);

    const collectChunks = jest.fn();
    const App: FC = () => <div>app</div>;

    ctx.state.render({ collectChunks, App });

    // Since we render without the entry point flag
    // the collectChunks should not be called.
    expect(collectChunks).not.toBeCalled();

    // Call the render with the hasEntryPoints flag
    ctx.state.render({
      collectChunks,
      App,
      hasEntryPoint: true,
    });

    expect(collectChunks).toBeCalled();
  });

  describe("custom render", () => {
    it("should wrap the user defined render", async () => {
      const ctx: any = createKoaContext({
        render: function customRender() {
          return null;
        },
      });

      await setupRenderMethod(ctx, fakeNext);

      expect(ctx.state.render.toString()).toMatchSnapshot();
    });

    it("should call the render with a defaultRenderer", async () => {
      const customRenderMethod = jest.fn();
      const ctx: any = createKoaContext({
        render: customRenderMethod,
      });

      await setupRenderMethod(ctx, fakeNext);

      const collectChunks = jest.fn();
      const App: FC = () => <div>custom</div>;

      ctx.state.render({
        collectChunks,
        App,
        hasEntryPoint: true,
      });

      // Expect the custom render method to be called.
      expect(customRenderMethod).toBeCalled();

      // Expect the collect chunks not to be called
      // since the custom render method is mocked.
      expect(collectChunks).not.toBeCalled();

      // Expect the arguments to be consistent.
      expect(
        Object.keys(customRenderMethod.mock.calls[0][0])
      ).toMatchSnapshot();
    });

    it("defaultRenderer should serialize accordingly", async () => {
      const ctx: any = createKoaContext({
        render: ({ App, defaultRenderer }) => {
          return defaultRenderer(<App />);
        },
      });

      await setupRenderMethod(ctx, fakeNext);

      const collectChunks = jest.fn();
      const App: FC = () => <div>custom</div>;

      ctx.state.render({
        collectChunks,
        App,
        hasEntryPoint: true,
      });

      // Expect the collect chunks not to be called
      // since the custom render method is mocked.
      expect(collectChunks).toBeCalledTimes(1);

      // Expec the render to string to be called.
      expect(renderToString).toBeCalled();

      collectChunks.mockReset();

      // Render without an entry point.
      ctx.state.render({
        collectChunks,
        App,
      });

      // Expect the collect chunks not to be called
      // since the custom render method is mocked.
      expect(collectChunks).not.toBeCalled();

      // Expec the render to static markup to be called.
      expect(renderToStaticMarkup).toBeCalled();
    });
  });
});
