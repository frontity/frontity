import { Response, Headers } from "cross-fetch";

export const mockResponse = (body, headers?) =>
  new Response(
    JSON.stringify(body),
    headers && {
      headers: new Headers(headers)
    }
  );

export const expectEntities = sourceState => {
  const ids = {};
  ["post", "category", "tag", "author", "attachment"].forEach(kind => {
    const entities = Object.values(sourceState[kind]);
    ids[kind] = entities.map(({ id }) => id);
  });
  expect(ids).toMatchSnapshot();
};
