test("final `/amp` path is removed", () => {
  expect(normalize("/amp")).toBe("/");
  expect(normalize("/some-post/amp/")).toBe("/some-post/");
  expect(normalize("/some-page/amp/")).toBe("/some-page/");
  expect(normalize("/parent/some-page/amp/")).toBe("/parent/some-page/");
  expect(normalize("/category/some/amp/")).toBe("/category/some/");
  expect(normalize("/tag/some/amp/")).toBe("/tag/some/");
  expect(normalize("/taxonomy/some/amp/")).toBe("/taxonomy/some/");

  expect(normalize("/amp/?a=1&b=1#some-hash")).toBe("/?a=1&b=1#some-hash");
  expect(normalize("/amp/page/3/?a=1&b=1#some-hash")).toBe(
    "/page/3/?a=1&b=1#some-hash"
  );
  expect(normalize("/taxonomy/some/amp/?a=1&b=1#some-hash")).toBe(
    "/taxonomy/some/?a=1&b=1#some-hash"
  );
  expect(normalize("/taxonomy/some/page/3/?a=1&b=1#some-hash")).toBe(
    "/taxonomy/some/page/3/?a=1&b=1#some-hash"
  );

  // These ones are not correct, but it is expected.
  expect(normalize("/category/amp/")).toBe("/category/");
  expect(normalize("/tag/amp/")).toBe("/tag/");
  expect(normalize("/taxonomy/amp/")).toBe("/taxonomy/");
  expect(normalize("/author/amp/")).toBe("/author/");
});
