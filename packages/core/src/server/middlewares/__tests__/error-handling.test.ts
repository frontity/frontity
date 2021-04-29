import { errorHandling } from "../error-handling";
import Koa from "koa";
import request from "supertest";

let app: Koa<Koa.DefaultState, Koa.DefaultContext> = null;
let ctx: Koa.DefaultContext = null;

beforeEach(() => {
  process.env.NODE_ENV = "test";
  app = new Koa();
  app.use((context, next) => {
    ctx = context;
    next();
  });
});

describe("errorHandling", () => {
  it("should set the X-Frontity-Dev header in development", async () => {
    app.use(errorHandling);
    await request(app.callback()).get("/");
    expect(ctx.response.get("X-Frontity-Dev")).toBe("true");
  });

  it("should not set the X-Frontity-Dev header in production", async () => {
    process.env.NODE_ENV = "production";
    app.use(errorHandling);
    await request(app.callback()).get("/");
    expect(ctx.response.has("X-Frontity-Dev")).toBe(false);
  });

  it("should return the error message in development", async () => {
    app.use(errorHandling);
    app.use(() => {
      throw new Error("Something bad happened");
    });
    await request(app.callback()).get("/");
    expect(ctx.body).toBe("Something bad happened");
    expect(ctx.response.get("X-Frontity-Dev")).toBe("true");
  });

  it("should return an error in production", async () => {
    process.env.NODE_ENV = "production";
    app.use(async (_, next) => {
      await expect(() => next()).rejects.toThrow();
    });
    app.use(errorHandling);
    app.use(() => {
      throw new Error("Something bad happened");
    });
    await request(app.callback()).get("/");
    expect(ctx.response.has("X-Frontity-Dev")).toBe(false);
  });
});
