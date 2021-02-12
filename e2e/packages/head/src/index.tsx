import * as React from "react";
import { Head } from "frontity";
import Package from "../types";

/**
 * A React component that adds different elements to the `<head>`.
 *
 * @returns React element.
 */
const Root: React.FC = () => (
  <>
    <Head>
      <html lang="en" />
      <title>The Title</title>
      <meta name="description" content="The Description" />
      <script type="text/javascript">{`window.scriptTest = "pass"`}</script>
      <link rel="canonical" href="http://mysite.com/example" />
      <body className="new-class" />
      <noscript>
        {'<link rel="stylesheet" type="text/css" href="foo.css" />'}
      </noscript>
      <style type="text/css">{`body { background-color: blue; }`}</style>
    </Head>
  </>
);

const HeadPackage: Package = {
  name: "e2e-head",
  roots: {
    head: Root,
  },
};

export default HeadPackage;
