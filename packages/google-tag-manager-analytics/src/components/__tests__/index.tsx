/**
 * @jest-environment node
 */

import TestRenderer from "react-test-renderer";
import { HelmetProvider } from "frontity";
import { State } from "frontity/types";
import { FilledContext } from "react-helmet-async";
import { Root as GoogleTagManager } from "..";
import { Packages } from "../../../types";

const getState = (): State<Packages> => ({
  frontity: {},
  analytics: {
    pageviews: { googleTagManagerAnalytics: true },
    events: {},
  },
  googleTagManagerAnalytics: {},
});

/**
 * Render a mocked instance of the Google Tag Manager's root component.
 *
 * @param state - Frontity state object.
 * @returns The rendered component in JSON format, along with the head
 * attributes.
 */
const renderGTM = (state: State<Packages>) => {
  const helmetContext = {};
  const rendered = TestRenderer.create(
    <HelmetProvider context={helmetContext}>
      <GoogleTagManager state={state} actions={null} libraries={null} />
    </HelmetProvider>
  ).toJSON();
  const head = (helmetContext as FilledContext).helmet;

  return { rendered, head };
};

describe("GoogleTagManager", () => {
  test("works with a single container id", () => {
    // Instantiate the Frontity state and specify the `containerId` prop.
    const state = getState();
    state.googleTagManagerAnalytics.containerId = "GTM-XXXXXXX";

    // Render the GTM's root component.
    const { rendered, head } = renderGTM(state);

    // The GTM's script library with the specified container ID should have been
    // rendered, an also an inline script that adds the `gtm.start` event.
    expect(head.script.toComponent()).toMatchInlineSnapshot(`
      Array [
        <script
          async={true}
          data-rh={true}
          src="https://www.googletagmanager.com/gtm.js?id=GTM-XXXXXXX"
        />,
        <script
          dangerouslySetInnerHTML={
            Object {
              "__html": "
              var dataLayer = window.dataLayer || [];
              dataLayer.push({
                \\"gtm.start\\": new Date().getTime(),
                event: \\"gtm.js\\",
              })
              ",
            }
          }
          data-rh={true}
        />,
      ]
    `);

    // A `<noscript>` tag with an `<iframe>` should be rendered as well, to make
    // GTM work when JS is not available.
    expect(rendered).toMatchInlineSnapshot(`
      <noscript>
        <style
          dangerouslySetInnerHTML={
            Object {
              "__html": ".css-llz5b9-GtmCode{display:none;visibility:hidden;}",
            }
          }
          data-emotion="css llz5b9-GtmCode"
        />
        <iframe
          className="css-llz5b9-GtmCode"
          height="0"
          src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
          title="GTM-XXXXXXX"
          width="0"
        />
      </noscript>
    `);
  });

  test("works with multiple container ids", () => {
    // Instantiate the Frontity state and specify the `containerIds` array prop.
    const state = getState();

    state.googleTagManagerAnalytics.containerIds = [
      "GTM-XXXXXXX",
      "GTM-YYYYYYY",
    ];

    // Render the GTM's root component.
    const { rendered, head } = renderGTM(state);

    // The GTM's script library should have been rendered twice, one for each
    // container ID specified. The inline script pushing the `gtm.start` event
    // should be rendered once.
    expect(head.script.toComponent()).toMatchInlineSnapshot(`
      Array [
        <script
          async={true}
          data-rh={true}
          src="https://www.googletagmanager.com/gtm.js?id=GTM-XXXXXXX"
        />,
        <script
          async={true}
          data-rh={true}
          src="https://www.googletagmanager.com/gtm.js?id=GTM-YYYYYYY"
        />,
        <script
          dangerouslySetInnerHTML={
            Object {
              "__html": "
              var dataLayer = window.dataLayer || [];
              dataLayer.push({
                \\"gtm.start\\": new Date().getTime(),
                event: \\"gtm.js\\",
              })
              ",
            }
          }
          data-rh={true}
        />,
      ]
    `);

    // Two `<noscript>` elements should have been rendered this time, one for
    // each container ID.
    expect(rendered).toMatchInlineSnapshot(`
      Array [
        <noscript>
          <style
            dangerouslySetInnerHTML={
              Object {
                "__html": ".css-llz5b9-GtmCode{display:none;visibility:hidden;}",
              }
            }
            data-emotion="css llz5b9-GtmCode"
          />
          <iframe
            className="css-llz5b9-GtmCode"
            height="0"
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            title="GTM-XXXXXXX"
            width="0"
          />
        </noscript>,
        <noscript>
          <style
            dangerouslySetInnerHTML={
              Object {
                "__html": ".css-llz5b9-GtmCode{display:none;visibility:hidden;}",
              }
            }
            data-emotion="css llz5b9-GtmCode"
          />
          <iframe
            className="css-llz5b9-GtmCode"
            height="0"
            src="https://www.googletagmanager.com/ns.html?id=GTM-YYYYYYY"
            title="GTM-YYYYYYY"
            width="0"
          />
        </noscript>,
      ]
    `);
  });

  test("doesn't add anything if there's no container ids", () => {
    // Instantiate the Frontity state with no container IDs.
    const state = getState();

    // Render the GTM's root component.
    const { rendered, head } = renderGTM(state);

    // Nothing should be rendered this time.
    expect(head.script.toComponent()).toMatchInlineSnapshot(`Array []`);
    expect(rendered).toMatchInlineSnapshot(`null`);
  });
});

describe("GoogleTagManager (AMP)", () => {
  test("works with a single container id", () => {
    // Instantiate the Frontity state, adding a container ID.
    const state = getState();
    state.frontity.mode = "amp";
    state.googleTagManagerAnalytics.containerId = "GTM-XXXXXXX";

    // Render the GTM's root component.
    const { rendered } = renderGTM(state);

    // An `<amp-analytics>` tag should have been rendered for the given
    // container ID.
    expect(rendered).toMatchInlineSnapshot(`
      <amp-analytics
        config="https://www.googletagmanager.com/amp.json?id=GTM-XXXXXXX;Tag Manager.url=SOURCE_URL"
        data-credentials="include"
      />
    `);
  });

  test("works with a single container id and config", () => {
    // Instantiate the Frontity state, adding a container ID and a configuration
    // object for the `amp-analytics` tag.
    const state = getState();
    state.frontity.mode = "amp";
    state.googleTagManagerAnalytics.containerId = "GTM-XXXXXXX";
    state.googleTagManagerAnalytics.ampConfig = {
      vars: {
        someProp: "someValue",
      },
    };

    // Render the GTM's root component.
    const { rendered } = renderGTM(state);

    // If the `ampConfig` prop is set, the value should have been included as a
    // JSON script inside the `amp-analytics` tag.
    expect(rendered).toMatchInlineSnapshot(`
      <amp-analytics
        config="https://www.googletagmanager.com/amp.json?id=GTM-XXXXXXX;Tag Manager.url=SOURCE_URL"
        data-credentials="include"
      >
        <script
          dangerouslySetInnerHTML={
            Object {
              "__html": "{\\"vars\\":{\\"someProp\\":\\"someValue\\"}}",
            }
          }
          type="application/json"
        />
      </amp-analytics>
    `);
  });

  test("works with multiple container ids", () => {
    // Instantiate the Frontity state, adding two container IDs.
    const state = getState();
    state.frontity.mode = "amp";
    state.googleTagManagerAnalytics.containerIds = [
      "GTM-XXXXXXX",
      "GTM-YYYYYYY",
    ];

    // Render the GTM's root component.
    const { rendered } = renderGTM(state);

    // Two `<amp-analytics>` tags should have been rendered, one for each given
    // container ID.
    expect(rendered).toMatchInlineSnapshot(`
      Array [
        <amp-analytics
          config="https://www.googletagmanager.com/amp.json?id=GTM-XXXXXXX;Tag Manager.url=SOURCE_URL"
          data-credentials="include"
        />,
        <amp-analytics
          config="https://www.googletagmanager.com/amp.json?id=GTM-YYYYYYY;Tag Manager.url=SOURCE_URL"
          data-credentials="include"
        />,
      ]
    `);
  });

  test("works with multiple container ids and config", () => {
    // Instantiate the Frontity state, adding two container IDs and a config
    // object for the `amp-analytics` tags.
    const state = getState();
    state.frontity.mode = "amp";
    state.googleTagManagerAnalytics.containerIds = [
      "GTM-XXXXXXX",
      "GTM-YYYYYYY",
    ];
    state.googleTagManagerAnalytics.ampConfig = {
      vars: {
        someProp: "someValue",
      },
    };

    // Render the GTM's root component.
    const { rendered } = renderGTM(state);

    // Two `<amp-analytics>` tags should have been rendered, one for each given
    // container ID, and both sharing the same configuration object.
    expect(rendered).toMatchInlineSnapshot(`
      Array [
        <amp-analytics
          config="https://www.googletagmanager.com/amp.json?id=GTM-XXXXXXX;Tag Manager.url=SOURCE_URL"
          data-credentials="include"
        >
          <script
            dangerouslySetInnerHTML={
              Object {
                "__html": "{\\"vars\\":{\\"someProp\\":\\"someValue\\"}}",
              }
            }
            type="application/json"
          />
        </amp-analytics>,
        <amp-analytics
          config="https://www.googletagmanager.com/amp.json?id=GTM-YYYYYYY;Tag Manager.url=SOURCE_URL"
          data-credentials="include"
        >
          <script
            dangerouslySetInnerHTML={
              Object {
                "__html": "{\\"vars\\":{\\"someProp\\":\\"someValue\\"}}",
              }
            }
            type="application/json"
          />
        </amp-analytics>,
      ]
    `);
  });

  test("doesn't add anything if there's no container ids", () => {
    // Instantiate the Frontity state mocking the `amp` package.
    const state = getState();
    state.frontity.mode = "amp";

    // Render the GTM's root component.
    const { rendered, head } = renderGTM(state);

    // Nothing should be rendered this time.
    expect(head.script.toComponent()).toMatchInlineSnapshot(`Array []`);
    expect(rendered).toMatchInlineSnapshot(`null`);
  });
});
