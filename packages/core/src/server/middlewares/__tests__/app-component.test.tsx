import { appComponent } from "../app-component";
import { createKoaContext } from "./__utilities__/create-koa-context";
import { fakeNext } from "./__utilities__/fake-next";

describe("appComponent middleware", () => {
  it("should define a App on context", async () => {
    const ctx: any = createKoaContext();

    // Call the middleware.
    await appComponent(ctx, fakeNext);

    expect(ctx.state.helmetContext).toBeDefined();
    expect(ctx.state.App.toString()).toMatchSnapshot();
  });

  it("should be able to overwrite the default App", async () => {
    const ctx: any = createKoaContext({
      App: () => {
        return null;
      },
    });

    // Call the middleware.
    await appComponent(ctx, fakeNext);

    expect(ctx.state.helmetContext).toBeDefined();
    expect(ctx.state.App.toString()).toMatchSnapshot();
  });
});
