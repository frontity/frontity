import TestRenderer from "react-test-renderer";
import { HelmetProvider } from "frontity";
import { FilledContext } from "react-helmet-async";
import GooglePublisherTag from "../google-publisher-tag";

/**
 * Render a mocked instance of the Google Analytics' root component.
 *
 * @param children - Frontity state object.
 * @returns The rendered component in JSON format, along with the head
 * attributes.
 */
const renderApp = (children: React.ReactChild) => {
  const helmetContext = {};
  const rendered = TestRenderer.create(
    <HelmetProvider context={helmetContext}>{children}</HelmetProvider>
  ).toJSON();
  const head = (helmetContext as FilledContext).helmet;

  return { rendered, head };
};

describe("GooglePublisherTag", () => {
  it("should use `id` as the container ID if data is not specified", () => {
    const { rendered } = renderApp(
      <GooglePublisherTag
        id="gpt-id-123"
        unit="/1234567/sport/"
        size={[320, 100]}
      />
    );

    expect(rendered).toMatchInlineSnapshot(`
      <div
        className="css-edpvri-GooglePublisherTag"
        id="gpt-id-123"
      />
    `);
  });

  it("should append `link` to the container ID if data is specified", () => {
    const { rendered } = renderApp(
      <GooglePublisherTag
        id="gpt-id-123"
        unit="/1234567/sport/"
        size={[320, 100]}
        data={{ link: "/2020/08/post-with-long-link/" }}
      />
    );

    expect(rendered).toMatchInlineSnapshot(`
      <div
        className="css-edpvri-GooglePublisherTag"
        id="gpt-id-123_2020_08_post-with-long-link"
      />
    `);
  });

  test("should render the container with the minimum size", () => {
    const { rendered } = renderApp(
      <GooglePublisherTag
        id="gpt-id-123"
        unit="/1234567/sport/"
        size={[
          [320, 100],
          [300, 600],
        ]}
      />
    );

    expect(rendered).toMatchInlineSnapshot(`
      <div
        className="css-1g79uk7-GooglePublisherTag"
        id="gpt-id-123"
      />
    `);
  });
});
