/**
 * @jest-environment node
 */

import TestRenderer from "react-test-renderer";
import { HelmetProvider } from "frontity";
import { FilledContext } from "react-helmet-async";
import AmpAd from "../amp-ad";

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

describe("AmpAd", () => {
  it("should render an `amp-ad` tag with the correct props", () => {
    const { rendered, head } = renderApp(
      <AmpAd
        slot="/4119129/mobile_ad_banner"
        width={300}
        height={600}
        layout="fixed"
        overrideWidth={250}
        overrideHeight={550}
        multiSize="700x90,700x60,500x60"
        multiSizeValidation={false}
        json={{
          targeting: { sport: ["rugby", "cricket"] },
          categoryExclusions: ["health"],
          tagForChildDirectedTreatment: true,
        }}
      />
    );

    // Except `width`, `height`, `layout` and `json` (which are common
    // attributes), all the other props need to be converted into
    // data-attributes.
    expect(rendered).toMatchInlineSnapshot(`
      <amp-ad
        data-multi-size="700x90,700x60,500x60"
        data-multi-size-validation={false}
        data-override-height={550}
        data-override-width={250}
        data-slot="/4119129/mobile_ad_banner"
        height={600}
        json="{\\"targeting\\":{\\"sport\\":[\\"rugby\\",\\"cricket\\"]},\\"categoryExclusions\\":[\\"health\\"],\\"tagForChildDirectedTreatment\\":true}"
        layout="fixed"
        type="doubleclick"
        width={300}
      />
    `);

    // It should have rendered the `amp-ad` library.
    expect(head.script.toComponent()).toMatchInlineSnapshot(`
      Array [
        <script
          async={true}
          custom-element="amp-ad"
          data-rh={true}
          src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
        />,
      ]
    `);
  });

  it("should render the `amp-ad` just once for multiple ads", () => {
    const { rendered, head } = renderApp(
      <>
        <AmpAd
          slot="/4119129/mobile_ad_banner"
          width={300}
          height={600}
          layout="fixed"
        />
        <AmpAd
          slot="/4119129/mobile_ad_banner_2"
          width={320}
          height={100}
          layout="fixed"
        />
      </>
    );

    expect(rendered).toHaveLength(2);

    // It should have rendered the `amp-ad` library once.
    expect(head.script.toComponent()).toMatchInlineSnapshot(`
      Array [
        <script
          async={true}
          custom-element="amp-ad"
          data-rh={true}
          src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
        />,
      ]
    `);
  });
});
