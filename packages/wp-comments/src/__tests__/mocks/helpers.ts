/* eslint-disable @typescript-eslint/camelcase */

import { ResponseInit, Response as NodeResponse } from "node-fetch";
import { mergeDeepRight } from "ramda";
import { WpComment } from "../../../types";

/**
 * Utility to mock responses from WP REST API.
 *
 * It instantiates a `node-fetch` response object using the passed information
 * with the standard `Response` type.
 *
 * @param body - Body of the `Response` object.
 * @param init - Other `Response` properties.
 *
 * @returns `Response` object.
 */
export const mockResponse = (body, init?: ResponseInit): Response =>
  (new NodeResponse(JSON.stringify(body), init) as any) as Response;

/**
 * Function that returns an object from given entries.
 *
 * @param entries - Array of key-value pairs.
 *
 * @returns Object with entries transformed to keys and values.
 */
export const fromEntries = (
  entries: IterableIterator<[string, any]>
): object => {
  const result = {};
  for (const [key, value] of entries) result[key] = value;
  return result;
};

/**
 * Function that returns a mocked comment.
 *
 * @example
 * ```
 * mockComment({ id: 5, parent: 4 });
 * ```
 *
 * @param props - Any bunch of comment properties.
 *
 * @returns A comment entity with merged props.
 */
export const mockComment = (props: Partial<WpComment>): WpComment => {
  const base: WpComment = {
    id: 6,
    post: 1,
    parent: 0,
    author: 1,
    authorName: "Frontibotito",
    authorURL: "http://test.frontity.org",
    date: "2020-07-20T12:00:00",
    date_gmt: "2020-07-20T10:00:00",
    content: { rendered: "" },
    link: "",
    status: "approved",
    type: "comment",
    author_avatar_urls: {},
    meta: [],
  };

  // Create comment mergin base and props.
  const comment = mergeDeepRight(base, props);

  // Change some props based on the final props.
  comment.link = `https://test.frontity.org/2020/post-${comment.post}/comment-page-1/#comment-${comment.id}`;
  comment.content.rendered = `<p>Test Comment ${comment.id}</p>`;

  return comment;
};
