import * as frontity from "frontity";
import { createStore } from "@frontity/connect";
import clone from "clone-deep";
import wpComments from "..";
import WpComments from "../../types";

const fetch = jest.spyOn(frontity, "fetch").mockResolvedValue(undefined);
const warn = jest.spyOn(frontity, "warn");

describe("WP Comments > create", () => {
  beforeEach(() => {
    fetch.mockClear();
    warn.mockClear();
  });

  test("should send the correct call to WordPress", async () => {
    // Init mocked store with empty state.source.
    const store = createStore<WpComments>(
      Object.assign(clone(wpComments), { state: { source: {} } })
    );

    // Set a test api that should be used to generate the comment endpoint.
    store.state.source.api = "https://test.frontity.org/wp-json/";

    // Send a comment.
    await store.actions.comments.create({
      comment: "This is a comment example. Hi!",
      author: "Frontibotito",
      email: "frontibotito@frontity.com",
      url: "https://frontity.org",
      postId: 60,
    });

    // Check the comment was sent.
    expect(fetch.mock.calls).toMatchSnapshot();

    // Check the request body is correct.
    const { body } = fetch.mock.calls[0][1];
    expect(body.toString()).toMatchSnapshot();
  });

  test("should show a warning message if the source is a WP.com site", () => {
    // Init mocked store with empty state.source.
    const store = createStore<WpComments>(
      Object.assign(clone(wpComments), { state: { source: {} } })
    );

    // Mock that `source.api` points to a WordPress.com site.
    store.state.source.isWpCom = true;

    // Send a comment.
    store.actions.comments.create({
      comment: "This is a comment example. Hi!",
      author: "Frontibotito",
      email: "frontibotito@frontity.com",
      url: "https://frontity.org",
      postId: 60,
    });

    // Check the comment was not sent.
    expect(fetch).not.toHaveBeenCalled();

    // Check that a warning message was shown instead.
    expect(warn.mock.calls).toMatchSnapshot();
  });
});
