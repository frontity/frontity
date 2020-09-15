/**
 * @jest-environment node
 */

import React from "react";
import TestRenderer from "react-test-renderer";
import { HelmetProvider } from "frontity";
import { State } from "frontity/types";
import { FilledContext } from "react-helmet-async";
import { Root as Yoast } from "../components";
import { Packages } from "../../types";
import Html2React from "@frontity/html2react/src";

/**
 * Return a mocked state with the following props:
 *
 * - router pointing to a 404 page ("/not-found/").
 * - source with a "not-found" data object.
 * - Frontity site's URL is http://my.frontity.test.
 * - Yoast package has default settings.
 *
 * @returns Frontity state.
 */
const getState404 = () =>
  (({
    router: {
      link: "/not-found",
    },
    source: {
      entity: () => null,
    },
    frontity: {
      url: "http://my.frontity.test",
    },
    yoast: {
      renderTags: "both",
      transformLinks: {
        ignore: "^(wp-(json|admin|content|includes))|feed|comments|xmlrpc",
        base: "http://localhost:8080",
      },
    },
  } as unknown) as State<Packages>);

/**
 * Return a mocked state with the following props:
 *
 * - router pointing to Hello World post ("/hello-world/").
 * - source with a "hello-world" data object.
 * - Frontity site's URL is http://my.frontity.test.
 * - Yoast package has default settings.
 *
 * @returns Frontity state.
 */
const getStateHelloWorld = () =>
  (({
    router: {
      link: "/hello-world/",
    },
    source: {
      entity: () => ({
        type: "post",
        id: 1,
        slug: "hello-world",
        link: "/hello-world/",
        ["yoast_head"]: `
          <title>Hello World &ndash; WP Test Site</title>
          <meta property="og:url" content="http://localhost:8080/hello-world/">
          <link rel="canonical" href="http://localhost:8080/hello-world/">
          <script type="application/ld+json">
          {
            "@graph":[
              {
                "@id":"http://localhost:8080/#website",
                "url":"http://localhost:8080/"
              }
            ]
          }
          </script>
        `,
      }),
    },
    frontity: {
      url: "http://my.frontity.test",
    },
    yoast: {
      renderTags: "both",
      transformLinks: {
        ignore: "^(wp-(json|admin|content|includes))|feed|comments|xmlrpc",
        base: "http://localhost:8080",
      },
    },
  } as unknown) as State<Packages>);

/**
 * Return mocked libraries with just the Html2React component, which is needed
 * by the Yoast package.
 *
 * @returns Frontity libraries.
 *
 */
const getLibraries = () =>
  (({
    html2react: {
      Component: Html2React.libraries.html2react.Component,
    },
  } as unknown) as Packages["libraries"]);

/**
 * Render the Yoast component and return the `helmet` property of a
 * `helmetContext` object, ready for tests.
 *
 * @param props - Object with `state` and `libraries` props from Frontity.
 * @returns The `helmet` property of `helmetContext`.
 */
const renderYoastHead = ({ state, libraries }) => {
  const helmetContext = {};
  TestRenderer.create(
    <HelmetProvider context={helmetContext}>
      <Yoast state={state} actions={null} libraries={libraries} />
    </HelmetProvider>
  ).toJSON();
  return (helmetContext as FilledContext).helmet;
};

/**
 * Yoast package tests.
 */
describe("Yoast", () => {
  it("renders nothing if there isn't `yoast_head` field", () => {
    const state = getState404();
    const libraries = getLibraries();
    const head = renderYoastHead({ state, libraries });

    expect(head.title.toString()).toMatchInlineSnapshot(
      `"<title data-rh=\\"true\\"></title>"`
    );
    expect(head.link.toString()).toMatchInlineSnapshot(`""`);
    expect(head.meta.toString()).toMatchInlineSnapshot(`""`);
    expect(head.script.toString()).toMatchInlineSnapshot(`""`);
  });

  it("renders head tags (changing links by default)", () => {
    const state = getStateHelloWorld();
    const libraries = getLibraries();
    const head = renderYoastHead({ state, libraries });

    expect(head.title.toString()).toMatchInlineSnapshot(
      `"<title data-rh=\\"true\\">Hello World – WP Test Site</title>"`
    );
    expect(head.link.toString()).toMatchInlineSnapshot(
      `"<link data-rh=\\"true\\" rel=\\"canonical\\" href=\\"http://my.frontity.test/hello-world/\\"/>"`
    );
    expect(head.meta.toString()).toMatchInlineSnapshot(
      `"<meta data-rh=\\"true\\" property=\\"og:url\\" content=\\"http://my.frontity.test/hello-world/\\"/>"`
    );
    expect(head.script.toString()).toMatchInlineSnapshot(`
      "<script data-rh=\\"true\\" type=\\"application/ld+json\\">
                {
                  \\"@graph\\":[
                    {
                      \\"@id\\":\\"http://my.frontity.test/#website\\",
                      \\"url\\":\\"http://my.frontity.test/\\"
                    }
                  ]
                }
                </script>"
    `);
  });

  it("renders head tags (without changing links)", () => {
    const state = getStateHelloWorld();
    const libraries = getLibraries();

    // Set Yoast settings.
    state.yoast.transformLinks = false;

    const head = renderYoastHead({ state, libraries });

    expect(head.title.toString()).toMatchInlineSnapshot(
      `"<title data-rh=\\"true\\">Hello World – WP Test Site</title>"`
    );
    expect(head.link.toString()).toMatchInlineSnapshot(
      `"<link data-rh=\\"true\\" rel=\\"canonical\\" href=\\"http://localhost:8080/hello-world/\\"/>"`
    );
    expect(head.meta.toString()).toMatchInlineSnapshot(
      `"<meta data-rh=\\"true\\" property=\\"og:url\\" content=\\"http://localhost:8080/hello-world/\\"/>"`
    );
    expect(head.script.toString()).toMatchInlineSnapshot(`
      "<script data-rh=\\"true\\" type=\\"application/ld+json\\">
                {
                  \\"@graph\\":[
                    {
                      \\"@id\\":\\"http://localhost:8080/#website\\",
                      \\"url\\":\\"http://localhost:8080/\\"
                    }
                  ]
                }
                </script>"
    `);
  });

  it("renders all tags in SSR (renderTags: server)", () => {
    const state = getStateHelloWorld();
    const libraries = getLibraries();

    // Set Yoast settings.
    state.yoast.renderTags = "server";

    const head = renderYoastHead({ state, libraries });

    expect(head.title.toString()).toMatchInlineSnapshot(
      `"<title data-rh=\\"true\\">Hello World – WP Test Site</title>"`
    );
    expect(head.link.toString()).toMatchInlineSnapshot(
      `"<link data-rh=\\"true\\" rel=\\"canonical\\" href=\\"http://my.frontity.test/hello-world/\\"/>"`
    );
    expect(head.meta.toString()).toMatchInlineSnapshot(
      `"<meta data-rh=\\"true\\" property=\\"og:url\\" content=\\"http://my.frontity.test/hello-world/\\"/>"`
    );
    expect(head.script.toString()).toMatchInlineSnapshot(`
      "<script data-rh=\\"true\\" type=\\"application/ld+json\\">
                {
                  \\"@graph\\":[
                    {
                      \\"@id\\":\\"http://my.frontity.test/#website\\",
                      \\"url\\":\\"http://my.frontity.test/\\"
                    }
                  ]
                }
                </script>"
    `);
  });

  it("renders only the title in CSR (renderTags: server)", () => {
    const state = getStateHelloWorld();
    const libraries = getLibraries();

    // Set Yoast settings.
    state.yoast.renderTags = "server";

    // Set rendering state to CSR.
    state.frontity.rendering = "csr";

    // Mock the Html2React component.
    libraries.html2react.Component = jest.fn();

    const head = renderYoastHead({ state, libraries });

    expect(head.title.toString()).toMatchInlineSnapshot(
      `"<title data-rh=\\"true\\">Hello World – WP Test Site</title>"`
    );
    expect(head.link.toString()).toMatchInlineSnapshot(`""`);
    expect(head.meta.toString()).toMatchInlineSnapshot(`""`);
    expect(head.script.toString()).toMatchInlineSnapshot(`""`);
    expect(libraries.html2react.Component).not.toHaveBeenCalled();
  });
});
