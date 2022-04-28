import { get } from "koa-route";
import Root from "./components";
import type ServerExtensibility from "../types";

const serverExtensibility: ServerExtensibility = {
  name: "e2e-server-extensibility",
  roots: {
    serverExtensibility: Root,
  },
  server: {
    serverExtensibility: {
      robotsTxtOne: get("/robots-one.txt", ({ ctx }) => {
        const robotsTxt =
          "User-agent: *\nAllow: /\nSitemap: http://www.example.com/sitemap.xml";
        ctx.type = "text/plain";
        ctx.body = robotsTxt;
      }),
      robotsTxtTwo: get("/robots-two.txt", (ctx) => {
        const robotsTxt =
          "User-agent: *\nAllow: /\nSitemap: http://www.example.com/sitemap.xml";
        ctx.type = "text/plain";
        ctx.body = robotsTxt;
      }),
      addFrontityHeaderOne: ({ ctx, next }) => {
        ctx.set("X-Frontity-Test-One", "One");
        return next();
      },
      addFrontityHeaderTwo: (ctx, next) => {
        ctx.set("X-Frontity-Test-Two", "Two");
        return next();
      },
      accessFrontityState: get("/state", ({ ctx, state }) => {
        ctx.type = "text/plain";
        ctx.body = state.frontity.url;
      }),
    },
  },
};

export default serverExtensibility;
