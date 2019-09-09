import React from "react";
import { Head } from "frontity";
import Package from "../types";

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
  name: "head",
  state: {},
  actions: {},
  roots: {
    head: Root
  },
  libraries: {}
};

export default HeadPackage;
