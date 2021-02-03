import { settingsAndStore } from "../settings-and-store";
import { fakeNext } from "./__utilities__/fake-next";

jest.mock("@frontity/file-settings", () => ({
  getSettings: jest.fn().mockReturnValue(async () => {
    await Promise.resolve();
  }),
}));

jest.mock("../../store", () =>
  jest.fn().mockReturnValue({
    actions: [],
    libraries: [],
  })
);

describe("settingsAndStore", () => {
  it("should define settins and store", async () => {
    const packages: any = {};
    const ctx: any = { state: {}, href: "/", query: { frontity_name: "test" } };

    // Create the middleware
    const middleware = settingsAndStore(packages);

    // Call the middleware
    await middleware(ctx, fakeNext);

    expect(ctx.state.store).toMatchSnapshot();
    expect(ctx.state.settings).toMatchSnapshot();
  });
});
