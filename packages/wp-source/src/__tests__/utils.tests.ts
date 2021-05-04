/* eslint-disable jest/expect-expect */
import { verboseRegExp } from "../utils";

describe("verboseRegExp", () => {
  const assertRegExpEqual = (str: string, regExp) => {
    expect(new RegExp(str).toString()).toBe(regExp.toString());
  };

  it("should work with simple regexps", () => {
    assertRegExpEqual(verboseRegExp`hai`, /hai/);
    // eslint-disable-next-line no-empty-character-class
    assertRegExpEqual(verboseRegExp`[]`, /[]/);
  });

  it("should ignore whitespaces and comments", () => {
    assertRegExpEqual(verboseRegExp`x y`, /xy/);
    assertRegExpEqual(
      verboseRegExp`
  x // ignored
  y
`,
      /xy/
    );
    assertRegExpEqual(verboseRegExp`x /* ignored */ y`, /xy/);

    // Also inside character classes:
    assertRegExpEqual(verboseRegExp`[x y]`, /[xy]/);
    assertRegExpEqual(
      verboseRegExp`[x//comment
  y]`,
      /[xy]/
    );
    assertRegExpEqual(verboseRegExp`[x/*z][x*/z]`, /[xz]/);
    assertRegExpEqual(verboseRegExp`[x/*z*/y]`, /[xy]/);
  });

  it("should not ignore escaped whitespace", () => {
    // Escaped whitespace is not ignored:
    assertRegExpEqual(verboseRegExp`\  `, / /);
    assertRegExpEqual(verboseRegExp`\ x `, / x/);
    assertRegExpEqual(verboseRegExp`\       `, / /);
    assertRegExpEqual(verboseRegExp`  \  `, / /);
    // Also not in brackets:
    assertRegExpEqual(verboseRegExp`[\ ]`, /[ ]/);
  });

  it("should maintain other escaped characters", () => {
    // Other escapes are passed through
    assertRegExpEqual(verboseRegExp`\s`, /\s/);
    assertRegExpEqual(verboseRegExp`\n`, /\n/);
  });

  it("should allow nested brackets", () => {
    // Nested brackets are allowed
    assertRegExpEqual(verboseRegExp` [x [y ]] `, /[x[y]]/);
  });

  it("should allow interpolation", () => {
    assertRegExpEqual(verboseRegExp`${"hello"}_world`, /hello_world/);
  });
});
