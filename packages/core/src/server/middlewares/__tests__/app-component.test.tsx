import { Next } from "koa";
import { appComponent } from "../app-component";

const createStore = (extended = {}) => ({
  libraries: {
    frontity: {
      ...extended,
    },
  },
});

const createContext = (extended?: any) => ({
  state: {
    store: createStore(extended),
  },
});

const fakeNext: Next = async () => {
  await Promise.resolve();
};

describe("appComponent middleware", () => {
  it("should define a App on context", async () => {
    const ctx: any = createContext();

    // Call the middleware.
    await appComponent(ctx, fakeNext);

    expect(ctx.state.helmetContext).toBeDefined();
    expect(ctx.state.App.toString()).toMatchSnapshot();
  });

  it("should be able to overwrite the default App", async () => {
    const ctx: any = createContext({
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
