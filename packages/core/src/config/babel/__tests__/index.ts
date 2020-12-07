import getBabel from "../";

test("Babel returns for development", () => {
  expect(getBabel()).toMatchSnapshot();
});

test("Babel returns for production", () => {
  expect(getBabel()).toMatchSnapshot();
});
