import { settingsAndStore } from "../settings-and-store";
import { fakeNext } from "./__utilities__/fake-next";
import { getSettings } from "@frontity/file-settings";

jest.mock("@frontity/file-settings", () => ({
  getSettings: jest.fn().mockReturnValue(async () => {
    await Promise.resolve();
  }),
}));

jest.mock("../../store", () =>
  jest.fn().mockReturnValue({
    actions: [],
    libraries: {
      frontity: {},
    },
  })
);

describe("settingsAndStore", () => {
  it("should define settings and store", async () => {
    const packages: any = {};
    const ctx: any = {
      frontity: {},
      href: "/",
      query: { frontity_name: "test" },
    };

    // Create the middleware
    const middleware = settingsAndStore(packages);

    // Call the middleware
    await middleware(ctx, fakeNext);

    expect(ctx.frontity.store).toMatchSnapshot();
    expect(ctx.frontity.settings).toMatchSnapshot();
  });

  it("should use the last name if `frontity_name` is a list", async () => {
    const packages: any = {};
    const ctx: any = {
      frontity: {},
      href: "/",
      query: {
        frontity_name: ["first-name", "last-name"],
      },
    };

    // Create the middleware
    const middleware = settingsAndStore(packages);

    // Call the middleware
    await middleware(ctx, fakeNext);

    expect(getSettings).toHaveBeenCalledWith({
      name: "last-name",
      url: "/",
    });
    expect(getSettings).not.toHaveBeenCalledWith({
      name: "first-name",
      url: "/",
    });
  });
});
