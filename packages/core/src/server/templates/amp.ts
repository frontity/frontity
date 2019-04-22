import { Template } from "../../types";

const template: Template = ({ html, head }) => `<!doctype html>
<html amp>
  <head>
    <meta charset="utf-8">
    <meta name="generator" content="Frontity">
    <script async src='https://cdn.ampproject.org/v0.js'></script>
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    ${head.title}
    ${head.meta}
    ${head.link}
    ${head.script}
  </head>
  <body ${head.bodyAttributes}>
    ${html}
  </body>
</html>`;

export default template;
