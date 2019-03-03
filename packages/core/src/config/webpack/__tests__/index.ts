import getWebpack from "../";

test("Babel returns for development", () => {
  expect(getWebpack("development")).toMatchSnapshot();
});

test("Babel returns for production", () => {
  expect(getWebpack("production")).toMatchSnapshot();
});
