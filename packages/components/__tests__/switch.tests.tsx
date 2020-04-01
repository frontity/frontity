import React from "react";
import { create } from "react-test-renderer";
import Switch from "../switch";

// Test components
const TestArchive: React.FC<{ when?: boolean; someProp?: string }> = () => {
  return <h1>Test Archive Component</h1>;
};

const TestBlog: React.FC<{ when?: boolean }> = () => {
  return <h1>Test Blog Component</h1>;
};

// Default test component
const Default: React.FC<{ someProp?: string }> = () => {
  return <h1>Default Component</h1>;
};

describe("Switch", () => {
  test("should render the default component if no match was found", () => {
    const SwitchComponent = create(
      <Switch>
        <TestArchive when={"archive" !== "archive"} />
        <TestBlog when={"blog" !== "blog"} />
        <Default />
      </Switch>
    );

    expect(SwitchComponent.toJSON()).toMatchSnapshot();
  });

  test("should render the first component that match", () => {
    const SwitchComponent = create(
      <Switch>
        <TestArchive when={"archive" === "archive"} />
        <TestBlog when={"blog" === "blog"} />
        <Default />
      </Switch>
    );

    expect(SwitchComponent.toJSON()).toMatchSnapshot();
  });

  test("should return null if no component match", () => {
    const SwitchComponent = create(
      <Switch>
        <TestArchive when={"archive" !== "archive"} />
        <TestBlog when={"blog" !== "blog"} />
      </Switch>
    );

    expect(SwitchComponent.toJSON()).toMatchSnapshot();
  });

  test("should pass down any prop that the matching component receives", () => {
    const SwitchComponent = create(
      <Switch>
        <TestArchive when={true} someProp="prop value" />
      </Switch>
    );

    expect(SwitchComponent.root.findByType(TestArchive).props).toEqual({
      someProp: "prop value",
      when: true,
    });
  });

  test("should pass down any prop of the default component", () => {
    const SwitchComponent = create(
      <Switch>
        <Default someProp="prop value" />
      </Switch>
    );

    expect(SwitchComponent.root.findByType(Default).props).toEqual({
      someProp: "prop value",
    });
  });
});
