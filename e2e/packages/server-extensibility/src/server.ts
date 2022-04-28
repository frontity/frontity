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
      robotsTxt: get("/custom-robots.txt", ({ ctx }) => {
        const robotsTxt =
          "User-agent: *\nAllow: /\nSitemap: http://www.example.com/sitemap.xml";
        ctx.type = "text/plain";
        ctx.body = robotsTxt;
      }),
    },
  },
};

export default serverExtensibility;
