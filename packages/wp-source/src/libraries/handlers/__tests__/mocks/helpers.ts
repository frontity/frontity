import * as nodeFetch from "node-fetch";

export const mockResponse = (body, headers?): Response =>
  (new nodeFetch.Response(
    JSON.stringify(body),
    headers && {
      headers: new nodeFetch.Headers(headers)
    }
  ) as unknown) as Response;

export const expectEntities = sourceState => {
  const ids = {};
  ["post", "category", "tag", "author", "attachment"].forEach(kind => {
    const entities = Object.values(sourceState[kind]);
    ids[kind] = entities.map(({ id }) => id);
  });
  expect(ids).toMatchSnapshot();
};
