import clone from "clone-deep";
import { createStore } from "@frontity/connect";
import { mergeDeepRight } from "ramda";

import wpComments from "..";
import { Packages } from "../../types";

describe("actions.comments.updateFields", () => {
  test("should init the form object if it does not exist", () => {
    const store = createStore<Packages>(clone(wpComments));
    const postId = 60;

    // Pass `comment` field.
    store.actions.comments.updateFields(postId, {
      content: "Hello world!",
    });

    expect(store.state.comments.forms).toMatchInlineSnapshot(`
      Object {
        "60": Object {
          "errorCode": "",
          "errorMessage": "",
          "errorStatusCode": null,
          "errors": Object {},
          "fields": Object {
            "content": "Hello world!",
          },
          "isError": false,
          "isSubmitted": false,
          "isSubmitting": false,
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
                content: "Hello world!",
                authorName: "John Doe",
                authorEmail: "johndoe@email.test",
                authorURL: "",
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
      content: "Hi everybody!",
    });

    expect(store.state.comments.forms).toMatchInlineSnapshot(`
      Object {
        "60": Object {
          "fields": Object {
            "authorEmail": "johndoe@email.test",
            "authorName": "John Doe",
            "authorURL": "",
            "content": "Hi everybody!",
            "parent": 0,
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
                content: "Hello world!",
                authorName: "John Doe",
                authorEmail: "hello@johndoe.test",
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
      authorName: "Jane Doe",
      content: "Hi everybody!",
      authorEmail: "hi@janedoe.test",
      parent: 123,
      authorURL: "https://janedoe.test",
    });

    expect(store.state.comments.forms).toMatchInlineSnapshot(`
      Object {
        "60": Object {
          "fields": Object {
            "authorEmail": "hi@janedoe.test",
            "authorName": "Jane Doe",
            "authorURL": "https://janedoe.test",
            "content": "Hi everybody!",
            "parent": 123,
          },
        },
      }
    `);
  });

  test("should reset all fields if nothing passed", () => {
    // Specify a post ID where the comment is meant to be published.
    const postId = 60;

    // Mock packages with the API specified in state.source.
    const packages: any = mergeDeepRight(clone(wpComments), {
      state: {
        comments: {
          forms: {
            [postId]: {
              fields: {
                content: "Hello world!",
                authorName: "John Doe",
                authorEmail: "hello@johndoe.test",
              },
            },
          },
        },
      },
    });

    // Create store from mocked packages.
    const store = createStore<Packages>(packages as Packages);

    // Change all form fields.
    store.actions.comments.updateFields(postId);

    // Only `content` should remain
    expect(store.state.comments.forms).toMatchInlineSnapshot(`
      Object {
        "60": Object {
          "errorCode": "",
          "errorMessage": "",
          "errorStatusCode": null,
          "errors": Object {},
          "fields": Object {
            "content": "",
          },
          "isError": false,
          "isSubmitted": false,
          "isSubmitting": false,
        },
      }
    `);
  });
});
