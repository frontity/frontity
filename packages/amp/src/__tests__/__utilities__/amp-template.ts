/**
 * Props for {@link ampTemplate}.
 */
interface AmpTemplateProps {
  /**
   * The content that will be injected in the <body/> of the AMP template.
   */
  body?: string;

  /**
   * The content that will be injected in the <head/> of the AMP template.
   */
  head?: string;
}

/**
 *
 * A template containing the bare minimum AMP HTML which
 * passes the https://validator.ampproject.org/.
 *
 * @param content - Content that should be injected in the <body> of the template.
 *
 * @returns A valid AMP HTML string.
 */
const ampTemplate = ({ body = "", head = "" }: AmpTemplateProps) => `
<!--
     This is the minimum valid AMP HTML document. Type away
     here and the AMP Validator will re-check your document on the fly.
-->
<!DOCTYPE html>
<html ⚡>
  <head>
    <meta charset="utf-8" />
    <link rel="canonical" href="self.html" />
    <meta name="viewport" content="width=device-width,minimum-scale=1" />
    <style amp-boilerplate>
      body {
        -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      }
      @-webkit-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-moz-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-ms-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-o-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
    </style>
    <noscript
      ><style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none;
        }
      </style></noscript
    >
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    ${head}
  </head>
  <body>
    ${body}
  </body>
</html>
`;

export default ampTemplate;
