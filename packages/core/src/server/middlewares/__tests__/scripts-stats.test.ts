import { scriptsStats } from "../scripts-stats";
import { init } from "../init";
import { createKoaContext } from "./__utilities__/create-koa-context";
import { fakeNext } from "./__utilities__/fake-next";

describe("scriptStats", () => {
  it("should define the stats on context", async () => {
    const ctx: any = createKoaContext();

    await init(ctx, fakeNext);
    await scriptsStats(ctx, fakeNext);

    expect(ctx.frontity.stats).toMatchSnapshot();
  });
});
