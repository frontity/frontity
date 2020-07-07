import clone from "clone-deep";
import { createStore } from "@frontity/connect";
import { mergeDeepRight } from "ramda";

import wpComments from "..";
import { Packages } from "../../types";

describe("actions.comments.updateFields", () => {
  test("should init the form object if it does not exist", () => {
    const store = createStore<Packages>(clone(wpComments));
    const postId = 60;

    // Pass empty fields.
    store.actions.comments.updateFields(postId, {});

    expect(store.state.comments.forms).toMatchInlineSnapshot(`
      Object {
        "60": Object {
          "fields": Object {
            "author": "",
            "comment": "",
            "email": "",
            "parent": 0,
            "url": "",
          },
        },
      }
    `);
  });

  test("should update a single property", () => {
    // Specify a post ID where the comment is meant to be published.
    const postId = 60;

    // Mock packages with the API specified in state.source.
    const packages: any = mergeDeepRight(clone(wpComments), {
      state: {
        comments: {
          forms: {
            [postId]: {
              fields: {
                author: "John Doe",
                comment: "Hello world!",
                email: "johndoe@email.test",
                url: "",
                parent: 0,
              },
            },
          },
        },
      },
    });

    // Create store from mocked packages.
    const store = createStore<Packages>(packages as Packages);

    // Change `comment` from "Hello world!" to "Hi everybody!".
    store.actions.comments.updateFields(postId, {
      comment: "Hi everybody!",
    });

    expect(store.state.comments.forms).toMatchInlineSnapshot(`
      Object {
        "60": Object {
          "fields": Object {
            "author": "John Doe",
            "comment": "Hi everybody!",
            "email": "johndoe@email.test",
            "parent": 0,
            "url": "",
          },
        },
      }
    `);
  });

  test("should update all properties specified", () => {
    // Specify a post ID where the comment is meant to be published.
    const postId = 60;

    // Mock packages with the API specified in state.source.
    const packages: any = mergeDeepRight(clone(wpComments), {
      state: {
        comments: {
          forms: {
            [postId]: {
              fields: {
                author: "John Doe",
                comment: "Hello world!",
                email: "hello@johndoe.test",
              },
            },
          },
        },
      },
    });

    // Create store from mocked packages.
    const store = createStore<Packages>(packages as Packages);

    // Change all form fields.
    store.actions.comments.updateFields(postId, {
      author: "Jane Doe",
      comment: "Hi everybody!",
      email: "hi@janedoe.test",
      parent: 123,
      url: "https://janedoe.test",
    });

    expect(store.state.comments.forms).toMatchInlineSnapshot(`
      Object {
        "60": Object {
          "fields": Object {
            "author": "Jane Doe",
            "comment": "Hi everybody!",
            "email": "hi@janedoe.test",
            "parent": 123,
            "url": "https://janedoe.test",
          },
        },
      }
    `);
  });
});
