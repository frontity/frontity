import getRobots from "../";

test("Babel returns for development", () => {
  expect(getRobots({ mode: "development" })).toMatchSnapshot();
});

test("Babel returns for production", () => {
  expect(getRobots({ mode: "production" })).toMatchSnapshot();
});
