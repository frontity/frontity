import { css } from "frontity";

const cssReset = css`
  html,
  body {
    border: none;
    margin: 0;
    padding: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  address,
  big,
  cite,
  code,
  em,
  font,
  img,
  small,
  strike,
  sub,
  sup,
  li,
  ol,
  ul,
  fieldset,
  form,
  label,
  legend,
  button,
  table,
  caption,
  tr,
  th,
  td {
    border: none;
    font-size: inherit;
    line-height: inherit;
    margin: 0;
    padding: 0;
    text-align: inherit;
  }

  blockquote::before,
  blockquote::after {
    content: "";
  }

  a,
  path {
    transition: all 0.15s linear;
  }
`;

/**
 * Styles for Document Setup.
 *
 * See `1. Document Setup` at
 * https://themes.trac.wordpress.org/browser/twentytwenty/1.7/style.css.
 *
 * @param colors - Object with color definitions, from `state.theme.colors`.
 * @returns Serialized style.
 */
const documentSetup = (colors) => css`
  html {
    font-size: 62.5%; /* 1rem = 10px */
  }

  body {
    background: ${colors.bodyBg};
    box-sizing: border-box;
    color: #000;
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Helvetica Neue",
      Helvetica, sans-serif;
    font-size: 1.8rem;
    letter-spacing: -0.015em;
    text-align: left;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
    -webkit-font-smoothing: antialiased;
    word-break: break-word;
    word-wrap: break-word;
  }

  #site-content {
    overflow: hidden;
  }
`;

const accessibilitySettings = css`
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0s !important;
      transition-duration: 0s !important;
    }
  }
`;

/**
 * Styles for Element Base.
 *
 * See `2. Element Base` at
 * https://themes.trac.wordpress.org/browser/twentytwenty/1.7/style.css.
 *
 * @param colors - Object with color definitions, from `state.theme.colors`.
 * @returns Serialized style.
 */
const elementBase = (colors) => css`
  main {
    display: block;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  .faux-heading {
    font-feature-settings: "lnum";
    font-variant-numeric: lining-nums;
    font-weight: 700;
    letter-spacing: -0.0415625em;
    line-height: 1.25;
    margin: 3.5rem 0 2rem;
  }

  h1,
  .heading-size-1 {
    font-size: 3.6rem;
    font-weight: 800;
    line-height: 1.138888889;
  }

  h2,
  .heading-size-2 {
    font-size: 3.2rem;
  }

  h3,
  .heading-size-3 {
    font-size: 2.8rem;
  }

  h4,
  .heading-size-4 {
    font-size: 2.4rem;
  }

  h5,
  .heading-size-5 {
    font-size: 2.1rem;
  }

  h6,
  .heading-size-6 {
    font-size: 1.6rem;
    letter-spacing: 0.03125em;
    text-transform: uppercase;
  }

  p {
    line-height: 1.5;
    margin: 0 0 1em 0;
  }

  em,
  i,
  q,
  dfn {
    font-style: italic;
  }

  em em,
  em i,
  i em,
  i i,
  cite em,
  cite i {
    font-weight: bolder;
  }

  big {
    font-size: 1.2em;
  }

  small {
    font-size: 0.75em;
  }

  b,
  strong {
    font-weight: 700;
  }

  ins {
    text-decoration: underline;
  }

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sup {
    top: -0.5em;
  }

  sub {
    bottom: -0.25em;
  }

  abbr,
  acronym {
    cursor: help;
  }

  address {
    line-height: 1.5;
    margin: 0 0 2rem 0;
  }

  hr {
    border-style: solid;
    border-width: 0.1rem 0 0 0;
    border-color: ${colors.gray.light};
    margin: 4rem 0;
  }

  a {
    color: ${colors.primary};
    text-decoration: underline;
  }

  a:hover,
  a:focus {
    text-decoration: none;
  }
`;

const elementBase700 = css`
  @media (min-width: 700px) {
    h1,
    .heading-size-1,
    h2,
    .heading-size-2,
    h3,
    .heading-size-3 {
      margin: 6rem auto 3rem;
    }

    h4,
    .heading-size-4,
    h5,
    .heading-size-5,
    h6,
    .heading-size-6 {
      margin: 4.5rem auto 2.5rem;
    }

    h1,
    .heading-size-1 {
      font-size: 6.4rem;
    }

    h2,
    .heading-size-2 {
      font-size: 4.8rem;
    }

    h3,
    .heading-size-3 {
      font-size: 4rem;
    }

    h4,
    .heading-size-4 {
      font-size: 3.2rem;
    }

    h5,
    .heading-size-5 {
      font-size: 2.4rem;
    }

    h6,
    .heading-size-6 {
      font-size: 1.8rem;
    }
  }
`;

const elementBase1220 = css`
  @media (min-width: 1220px) {
    h1,
    .heading-size-1 {
      font-size: 8.4rem;
    }
  }
`;

const listStyle = css`
  ul,
  ol {
    margin: 0 0 3rem 3rem;
  }

  ul {
    list-style: disc;
  }

  ul ul {
    list-style: circle;
  }

  ul ul ul {
    list-style: square;
  }

  ol {
    list-style: decimal;
  }

  ol ol {
    list-style: lower-alpha;
  }

  ol ol ol {
    list-style: lower-roman;
  }

  li {
    line-height: 1.5;
    margin: 0.5rem 0 0 2rem;
  }

  li > ul,
  li > ol {
    margin: 1rem 0 0 2rem;
  }

  .reset-list-style,
  .reset-list-style ul,
  .reset-list-style ol {
    list-style: none;
    margin: 0;
  }

  .reset-list-style li {
    margin: 0;
  }

  dt,
  dd {
    line-height: 1.5;
  }

  dt {
    font-weight: 700;
  }

  dt + dd {
    margin-top: 0.5rem;
  }

  dd + dt {
    margin-top: 1.5rem;
  }
`;

/**
 * Styles for blockquotes.
 *
 * See `2. Element Base / Quotes` at
 * https://themes.trac.wordpress.org/browser/twentytwenty/1.7/style.css.
 *
 * @param colors - Object with color definitions, from `state.theme.colors`.
 * @returns Serialized style.
 */
const quoteStyle = (colors) => css`
  blockquote {
    border-color: ${colors.primary};
    border-style: solid;

    /*rtl:ignore*/
    border-width: 0 0 0 0.2rem;
    color: inherit;
    font-size: 1em;
    margin: 4rem 0;

    /*rtl:ignore*/
    padding: 0.5rem 0 0.5rem 2rem;
  }

  cite {
    color: ${colors.gray};
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.25;
  }

  blockquote cite {
    display: block;
    margin: 2rem 0 0 0;
  }

  blockquote p:last-child {
    margin: 0;
  }
`;

/**
 * Styles for code elements.
 *
 * See `2. Element Base / Code` at
 * https://themes.trac.wordpress.org/browser/twentytwenty/1.7/style.css.
 *
 * @param colors - Object with color definitions, from `state.theme.colors`.
 * @returns Serialized style.
 */
const codeStyle = (colors) => css`
  code,
  kbd,
  pre,
  samp {
    font-family: monospace;
    font-size: 0.9em;
    padding: 0.4rem 0.6rem;
  }

  code,
  kbd,
  samp {
    background: rgba(0, 0, 0, 0.075);
    border-radius: 0.2rem;
  }

  pre {
    border: 0.1rem solid ${colors.gray.light};
    line-height: 1.5;
    margin: 4rem 0;
    overflow: auto;
    padding: 3rem 2rem;
    text-align: left;
  }

  pre code {
    background: transparent;
    padding: 0;
  }
`;

/**
 * Styles for media elements.
 *
 * See `2. Element Base / Media` at
 * https://themes.trac.wordpress.org/browser/twentytwenty/1.7/style.css.
 *
 * @param colors - Object with color definitions, from `state.theme.colors`.
 * @returns Serialized style.
 */
const mediaStyle = (colors) => css`
  figure {
    display: block;
    margin: 0;
  }

  iframe {
    display: block;
    max-width: 100%;
  }

  video {
    display: block;
  }

  svg,
  img,
  embed,
  object {
    display: block;
    height: auto;
    max-width: 100%;
  }

  figcaption,
  .wp-caption-text {
    color: ${colors.gray.base};
    display: block;
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 1.2;
    margin-top: 1.5rem;
  }

  figcaption a,
  .wp-caption-text a {
    color: inherit;
  }
`;

/**
 * Styles for tables.
 *
 * See `2. Element Base / Tables` at
 * https://themes.trac.wordpress.org/browser/twentytwenty/1.7/style.css.
 *
 * @param colors - Object with color definitions, from `state.theme.colors`.
 * @returns Serialized style.
 */
const tableStyles = (colors) => css`
  table {
    border: 0.1rem solid ${colors.gray.light};
    border-collapse: collapse;
    border-spacing: 0;
    empty-cells: show;
    font-size: 1.6rem;
    margin: 4rem 0;
    max-width: 100%;
    overflow: hidden;
    width: 100%;
  }

  .alignleft > table {
    margin: 0;
  }

  .alignright > table {
    margin: 0;
  }

  th,
  td {
    border: 0.1rem solid ${colors.gray.light};
    line-height: 1.4;
    margin: 0;
    overflow: visible;
    padding: 0.5em;
  }

  caption {
    background: ${colors.gray.light};
    font-weight: 600;
    padding: 0.5em;
    text-align: center;
  }

  thead {
    vertical-align: bottom;
    white-space: nowrap;
  }

  th {
    font-weight: 700;
  }
`;

/**
 * Global styles for the TwentyTwenty theme.
 *
 * @param colors - Object with color definitions, from `state.theme.colors`.
 * @returns Serialized style.
 */
const globalStyle = (colors) =>
  css([
    cssReset,
    documentSetup(colors),
    accessibilitySettings,
    elementBase(colors),
    elementBase700,
    elementBase1220,
    listStyle,
    quoteStyle(colors),
    codeStyle(colors),
    mediaStyle(colors),
    tableStyles(colors),
  ]);

export default globalStyle;
