import getHeaders from "../";

test("Babel returns for development", () => {
  expect(getHeaders({ mode: "development" })).toMatchSnapshot();
});

test("Babel returns for production", () => {
  expect(getHeaders({ mode: "production" })).toMatchSnapshot();
});
