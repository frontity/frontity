import { act, create } from "react-test-renderer";
import Script from "../script";

describe("Script", () => {
  test("should not render a script tag without code or src", () => {
    let root;
    act(() => {
      root = create(<Script id="script-1">{"let index = 0;"}</Script>);
    });

    expect(root.toJSON()).toMatchSnapshot();
    expect(document.body.querySelector("#script-1")).toBeNull();
  });

  test("should render a script tag with src", () => {
    let root;
    act(() => {
      root = create(<Script id="script-2" src="source" />);
    });

    expect(root.toJSON()).toMatchSnapshot();
    expect(document.body.querySelector("#script-2")).toMatchInlineSnapshot(`
      <script
        id="script-2"
        src="source"
      />
    `);
  });

  test("should not render the passed children with src", () => {
    let root;
    act(() => {
      root = create(
        <Script
          id="script-3"
          src="source-with-children"
        >{`let children = null;`}</Script>
      );
    });

    expect(root.toJSON()).toMatchSnapshot();
    expect(document.body.querySelector("#script-3")).toMatchInlineSnapshot(`
      <script
        id="script-3"
        src="source-with-children"
      />
    `);
  });

  test("should execute the code", () => {
    let root;
    act(() => {
      root = create(<Script id="script-4" code="global.__i__ = Infinity;" />);
    });

    expect(root.toJSON()).toMatchSnapshot();
    expect(document.body.querySelector("#script-4")).toBeNull();
    expect(global["__i__"]).toEqual(Infinity);
  });

  test("should remove the script tag at unmount", () => {
    let root;
    act(() => {
      root = create(<Script id="script-5" src="source-for-unmount" />);
    });

    expect(root.toJSON()).toMatchSnapshot();
    expect(document.body.querySelector("#script-5")).toMatchInlineSnapshot(`
      <script
        id="script-5"
        src="source-for-unmount"
      />
    `);

    act(() => {
      root.unmount();
    });

    expect(document.body.querySelector("#script-5")).toBeNull();
  });
});
