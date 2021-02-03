import { Next } from "koa";
import { scriptsStats } from "../scripts-stats";

const fakeNext: Next = async () => {
  await Promise.resolve();
};

describe("scriptStats", () => {
  it("should define the stats on context", async () => {
    const ctx: any = { state: {} };

    await scriptsStats(ctx, fakeNext);

    expect(ctx.state.stats).toMatchSnapshot();
  });
});
