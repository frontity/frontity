import getBabel from "../";

test("Babel returns for development", () => {
  expect(getBabel({ mode: "development" })).toMatchSnapshot();
});

test("Babel returns for production", () => {
  expect(getBabel({ mode: "production" })).toMatchSnapshot();
});
