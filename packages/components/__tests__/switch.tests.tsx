import React from "react";
import { create } from "react-test-renderer";
import Switch from "../switch";

// Test components
const TestArchive: React.FC<{ when?: boolean }> = () => {
  return <h1>Test Archive Component</h1>;
};

const TestBlog: React.FC<{ when?: boolean }> = () => {
  return <h1>Test Blog Component</h1>;
};

// Default test component
const Default: React.FC = () => {
  return <h1>Default Component</h1>;
};

describe("Switch", () => {
  test("render default component if no match was found", () => {
    const switchComponent = create(
      <Switch>
        <TestArchive when={"archive" !== "archive"} />
        <TestBlog when={"blog" !== "blog"} />
        <Default />
      </Switch>
    );

    expect(switchComponent.toJSON()).toMatchSnapshot();
  });

  test("should render the first component that match", () => {
    const switchComponent = create(
      <Switch>
        <TestArchive when={"archive" === "archive"} />
        <TestBlog when={"blog" === "blog"} />
        <Default />
      </Switch>
    );

    expect(switchComponent.toJSON()).toMatchSnapshot();
  });

  test("should return null if no component match", () => {
    const switchComponent = create(
      <Switch>
        <TestArchive when={"archive" !== "archive"} />
        <TestBlog when={"blog" !== "blog"} />
      </Switch>
    );

    expect(switchComponent.toJSON()).toMatchSnapshot();
  });
});
