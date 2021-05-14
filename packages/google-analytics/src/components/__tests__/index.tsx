/**
 * @jest-environment node
 */

import TestRenderer from "react-test-renderer";
import { HelmetProvider } from "frontity";
import { State } from "frontity/types";
import { FilledContext } from "react-helmet-async";
import { Root as GoogleAnalytics } from "..";
import { Packages } from "../../../types";

const getState = (): State<Packages> => ({
  frontity: {},
  analytics: {
    pageviews: { googleAnalytics: true },
    events: {},
  },
  googleAnalytics: {},
});

/**
 * Render a mocked instance of the Google Analytics' root component.
 *
 * @param state - Frontity state object.
 * @returns The rendered component in JSON format, along with the head
 * attributes.
 */
const renderGtag = (state: State<Packages>) => {
  const helmetContext = {};
  const rendered = TestRenderer.create(
    <HelmetProvider context={helmetContext}>
      <GoogleAnalytics state={state} actions={null} libraries={null} />
    </HelmetProvider>
  ).toJSON();
  const head = (helmetContext as FilledContext).helmet;

  return { rendered, head };
};

/**
 * Get the AMP configuration of an `amp-analytics` tag. Useful for
 * snapshot testing.
 *
 * @param instance - React instance in JSON format.
 * @returns Object representing the AMP config.
 */
const getAmpConfig = (instance) =>
  JSON.parse(instance.children[0].props.dangerouslySetInnerHTML.__html);

describe("GoogleAnalytics", () => {
  it("works with a single tracking ID", () => {
    const state = getState();

    state.googleAnalytics.trackingId = "UA-XXXXXXX-X";

    const { head } = renderGtag(state);

    expect(head.script.toComponent()).toMatchInlineSnapshot(`
      Array [
        <script
          async={true}
          data-rh={true}
          src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXX-X"
        />,
        <script
          dangerouslySetInnerHTML={
            Object {
              "__html": "
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-XXXXXXX-X');
      ",
            }
          }
          data-rh={true}
        />,
      ]
    `);
  });

  it("works with multiple traking IDs", () => {
    const state = getState();

    state.googleAnalytics.trackingIds = ["UA-XXXXXXX-X", "UA-YYYYYYY-Y"];

    const { head } = renderGtag(state);

    expect(head.script.toComponent()).toMatchInlineSnapshot(`
      Array [
        <script
          async={true}
          data-rh={true}
          src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXX-X"
        />,
        <script
          dangerouslySetInnerHTML={
            Object {
              "__html": "
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-XXXXXXX-X');
      gtag('config', 'UA-YYYYYYY-Y');
      ",
            }
          }
          data-rh={true}
        />,
      ]
    `);
  });

  it("doesn't add anything if there's no tracking IDs", () => {
    const state = getState();

    const { head } = renderGtag(state);

    expect(head.script.toComponent()).toMatchInlineSnapshot(`Array []`);
  });
});

describe("Google Analytics (AMP)", () => {
  it("works with a single tracking ID", () => {
    const state = getState();

    state.frontity.mode = "amp";
    state.googleAnalytics.trackingId = "UA-XXXXXXX-X";

    const { rendered } = renderGtag(state);

    expect(rendered).toMatchInlineSnapshot(`
      <amp-analytics
        data-credentials="include"
        type="gtag"
      >
        <script
          dangerouslySetInnerHTML={
            Object {
              "__html": "{\\"vars\\":{\\"gtag_id\\":\\"UA-XXXXXXX-X\\",\\"config\\":{\\"UA-XXXXXXX-X\\":{\\"groups\\":\\"default\\"}}}}",
            }
          }
          type="application/json"
        />
      </amp-analytics>
    `);
  });

  it("only renders a single tag for multiple tracking IDs", () => {
    const state = getState();

    state.frontity.mode = "amp";
    state.googleAnalytics.trackingIds = ["UA-XXXXXXX-X", "UA-YYYYYYY-Y"];

    const { rendered } = renderGtag(state);

    // The two tracking IDs should be included in `vars.config`.
    expect(getAmpConfig(rendered).vars.config).toMatchInlineSnapshot(`
      Object {
        "UA-XXXXXXX-X": Object {
          "groups": "default",
        },
        "UA-YYYYYYY-Y": Object {
          "groups": "default",
        },
      }
    `);
  });

  it("should merge tracking IDs with the AMP config", () => {
    const state = getState();

    state.frontity.mode = "amp";
    state.googleAnalytics.trackingIds = ["UA-XXXXXXX-X", "UA-YYYYYYY-Y"];
    state.googleAnalytics.ampConfig = {
      vars: {
        customVar: "customValue",
      },
      triggers: {
        customTrigger: {
          on: "page-load",
          request: "event",
        },
      },
    };

    const { rendered } = renderGtag(state);

    // The two tracking IDs should be included in `vars.config`.
    expect(getAmpConfig(rendered)).toMatchInlineSnapshot(`
      Object {
        "triggers": Object {
          "customTrigger": Object {
            "on": "page-load",
            "request": "event",
          },
        },
        "vars": Object {
          "config": Object {
            "UA-XXXXXXX-X": Object {
              "groups": "default",
            },
            "UA-YYYYYYY-Y": Object {
              "groups": "default",
            },
          },
          "customVar": "customValue",
          "gtag_id": "UA-XXXXXXX-X",
        },
      }
    `);
  });

  it("allows adding tracking IDs directly in the AMP config", () => {
    const state = getState();

    state.frontity.mode = "amp";
    state.googleAnalytics.trackingIds = ["UA-XXXXXXX-X", "UA-YYYYYYY-Y"];
    state.googleAnalytics.ampConfig = {
      vars: {
        config: {
          "UA-ZZZZZZZ-Z": {
            groups: "default",
          },
        },
      },
    };

    const { rendered } = renderGtag(state);

    expect(getAmpConfig(rendered).vars.config).toMatchInlineSnapshot(`
      Object {
        "UA-XXXXXXX-X": Object {
          "groups": "default",
        },
        "UA-YYYYYYY-Y": Object {
          "groups": "default",
        },
        "UA-ZZZZZZZ-Z": Object {
          "groups": "default",
        },
      }
    `);
  });

  it("allows configuring a tracking ID in the AMP config", () => {
    const state = getState();

    state.frontity.mode = "amp";
    state.googleAnalytics.trackingId = "UA-XXXXXXX-X";
    state.googleAnalytics.ampConfig = {
      vars: {
        config: {
          "UA-XXXXXXX-X": {
            linker: { domains: ["example.com", "example2.com"] },
          },
        },
      },
    };

    const { rendered } = renderGtag(state);

    expect(getAmpConfig(rendered).vars.config).toMatchInlineSnapshot(`
      Object {
        "UA-XXXXXXX-X": Object {
          "groups": "default",
          "linker": Object {
            "domains": Array [
              "example.com",
              "example2.com",
            ],
          },
        },
      }
    `);
  });

  it("renders the `amp-analytics` tag if the AMP config has tracking IDs", () => {
    const state = getState();

    state.frontity.mode = "amp";
    state.googleAnalytics.ampConfig = {
      vars: {
        gtag_id: "UA-XXXXXXX-X",
        config: {
          "UA-XXXXXXX-X": { groups: "default" },
        },
      },
    };

    const { rendered } = renderGtag(state);

    expect(rendered).toMatchInlineSnapshot(`
      <amp-analytics
        data-credentials="include"
        type="gtag"
      >
        <script
          dangerouslySetInnerHTML={
            Object {
              "__html": "{\\"vars\\":{\\"gtag_id\\":\\"UA-XXXXXXX-X\\",\\"config\\":{\\"UA-XXXXXXX-X\\":{\\"groups\\":\\"default\\"}}}}",
            }
          }
          type="application/json"
        />
      </amp-analytics>
    `);
  });
});

it("doesn't add anything if there's neither tracking IDs nor AMP config", () => {
  const warn = jest.spyOn(global.console, "warn");
  const state = getState();

  state.frontity.mode = "amp";

  const { rendered } = renderGtag(state);

  expect(rendered).toMatchInlineSnapshot(`null`);
  expect(warn.mock.calls[0][0]).toMatchInlineSnapshot(`
    "No tracking ID was found neither in \`state.google.analytics.trackingId\` nor in \`state.google.analytics.ampConfig\`. The \`<amp-analytics>\` tag will not be rendered.
    Visit https://community.frontity.org for help! 🙂
    "
  `);
});
