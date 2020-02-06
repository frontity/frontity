import {
  HeadersInit,
  ResponseInit,
  Headers,
  Response as NodeResponse
} from "node-fetch";

export const mockResponse = (
  body,
  headersInit?: HeadersInit,
  init?: ResponseInit
): Response => {
  const headers = headersInit && { headers: new Headers(headersInit) };
  return (new NodeResponse(JSON.stringify(body), {
    ...init,
    ...headers
  }) as unknown) as Response;
};

export const expectEntities = sourceState => {
  const ids = {};
  ["post", "category", "tag", "author", "attachment"].forEach(kind => {
    const entities = Object.values(sourceState[kind]);
    ids[kind] = entities.map(({ id }) => id);
  });
  expect(ids).toMatchSnapshot();
};
