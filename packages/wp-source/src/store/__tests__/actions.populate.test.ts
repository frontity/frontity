import { createOvermindMock } from "overmind";
import { namespaced } from "overmind/config";
import * as source from "..";
import { normalize } from "../handlers/utils";
import { Response } from "cross-fetch";

import posts from "./mocks/populate/posts.json";
import pages from "./mocks/populate/pages.json";

describe("actions", () => {
  test.only("populate list of posts", async () => {
    //init store
    const store = createOvermindMock(namespaced({ source }), {
      source: {
        resolver: {
          match: () => ({
            handler: async () => {},
            params: {}
          })
        }
      }
    });

    // add entities to store
    const entities = await normalize(new Response(JSON.stringify(posts)));

    // Check that posts and embedded entities are populated
    const mutations = await store.actions.source.populate({ entities });
    expect(mutations).toMatchSnapshot();
  });

  // test("populate pages", async () => {
  //   // add entities to store
  //   await store.actions.source.populate({ entities: pages });

  //   // check that pages are populated
  //   expect(store.state.source.post).toMatchSnapshot();
  //   expect(store.state.source.category).toMatchSnapshot();
  //   expect(store.state.source.tag).toMatchSnapshot();
  //   expect(store.state.source.attachment).toMatchSnapshot();
  //   expect(store.state.source.author).toMatchSnapshot();
  // });
});
