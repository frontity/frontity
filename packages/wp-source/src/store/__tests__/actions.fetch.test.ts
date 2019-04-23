import { createOvermindMock } from "overmind";
import { namespaced } from "overmind/config";
import { Response, Headers } from "cross-fetch";
import { state, actions, effects } from "..";
import * as handlers from "../handlers";
import { Handler } from "../../types";

import postArchiveJson from "./mocks/postArchive.json";

const patterns: {
  pattern: string;
  handler: Handler;
}[] = [
  {
    pattern: "/",
    handler: handlers.postArchive
  },
  {
    pattern: "/category/:slug",
    handler: handlers.category
  },
  {
    pattern: "/tag/:slug",
    handler: handlers.tag
  },
  {
    pattern: "/author/:slug",
    handler: handlers.author
  },
  {
    pattern: "/:year(\\d+)/:month(\\d+)?/:day(\\d+)?",
    handler: handlers.date
  },
  {
    pattern: "/:slug",
    handler: handlers.postOrPage
  },
  {
    pattern: "/:postSlug/attachment/:id",
    handler: handlers.attachment
  }
];

describe("fetch", () => {
  test("get post archive", async () => {
    // tag // categoriy // author // attachment // postOrPage

    const { resolver } = effects;
    patterns.forEach(({ pattern, handler }) => {
      resolver.add(pattern, handler);
    });

    const api = {
      get: jest.fn(() =>
        Promise.resolve(
          new Response(JSON.stringify(postArchiveJson), {
            headers: new Headers({
              "X-WP-Total": "47",
              "X-WP-TotalPages": "5"
            })
          })
        )
      )
    };

    const config = namespaced({ source: { actions, state, effects } });
    const store = createOvermindMock(config, {
      source: { resolver, api }
    });

    const mutations = await store.actions.source.fetch({ name: "/" });
    expect(api.get.mock.calls).toMatchSnapshot();
    expect(mutations).toMatchSnapshot();
  });
});
