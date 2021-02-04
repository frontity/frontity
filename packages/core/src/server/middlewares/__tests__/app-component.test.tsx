import { renderToString } from "react-dom/server";
import { appComponent } from "../app-component";
import { createKoaContext } from "./__utilities__/create-koa-context";
import { fakeNext } from "./__utilities__/fake-next";

jest.mock("../../../app", () => () => {
  return "App";
});

describe("appComponent middleware", () => {
  it("should define a App on context", async () => {
    const ctx: any = createKoaContext();

    // Call the middleware.
    await appComponent(ctx, fakeNext);

    expect(ctx.state.helmetContext).toBeDefined();
    expect(renderToString(<ctx.state.App />)).toEqual("App");
  });

  it("should be able to overwrite the default App", async () => {
    function CustomApp() {
      return "CustomApp";
    }

    const ctx: any = createKoaContext({
      App: CustomApp,
    });

    // Call the middleware.
    await appComponent(ctx, fakeNext);

    expect(ctx.state.helmetContext).toBeDefined();
    expect(renderToString(<ctx.state.App />)).toEqual("CustomApp");
  });
});
