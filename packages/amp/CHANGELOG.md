# @frontity/amp

## 0.1.0

### Minor Changes

- [`00009580`](https://github.com/frontity/frontity/commit/0000958068747ec9cebd02610b4927254bb19e77) [#718](https://github.com/frontity/frontity/pull/718) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Add the first version of html2react processors that are necessary for the AMP
  package. The processors created include:

  1. Processors to substitute an element `x` with its AMP `amp-x` equivalent:

  - iframe
  - img
  - audio
  - video

  2. Processors for embeds:

  - youtube
  - twitter

  3. Processors that remove some HTML tags and/or it's HTML tag attributes & properties
     that are disallowed in an AMP page

### Patch Changes

- Updated dependencies [[`4a179f5d`](https://github.com/frontity/frontity/commit/4a179f5d57cbb8c0008779e84db2b28b4017addf), [`c326111a`](https://github.com/frontity/frontity/commit/c326111a387c89c7227ffe104bc9e3670e7ca273)]:
  - frontity@1.14.3
  - @frontity/html2react@1.6.2

## 0.0.2

### Patch Changes

- [`f7152d38`](https://github.com/frontity/frontity/commit/f7152d38daf802d2369e17ad48b4473b489d81e8) [#722](https://github.com/frontity/frontity/pull/722) Thanks [@cristianbote](https://github.com/cristianbote)! - Add a dedicated AMP template for the @frontity/amp package, that strips away the scripts and keeps the critical css into a custom style tag

* [`804f19fe`](https://github.com/frontity/frontity/commit/804f19fe323d7555172a9eef0f81681e0d2d11cd) [#686](https://github.com/frontity/frontity/pull/686) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Create the first version of the frontity AMP package.

- [`2f7169cb`](https://github.com/frontity/frontity/commit/2f7169cb961ace5196fb6b7067f1f851e43acf2e) [#720](https://github.com/frontity/frontity/pull/720) Thanks [@cristianbote](https://github.com/cristianbote)! - Export CacheProvider from @frontity/core and use it to extract critical css into a custom style tag, needed for the @frontity/amp package.

- Updated dependencies [[`7c3f0769`](https://github.com/frontity/frontity/commit/7c3f076999d243de4f7dee631f40d2e71d47337d), [`49020718`](https://github.com/frontity/frontity/commit/49020718c569de081391c114a5684d092fd9769d), [`15e8f1d8`](https://github.com/frontity/frontity/commit/15e8f1d8cf66394d20034370df171a0c19ad51d3), [`7992fb85`](https://github.com/frontity/frontity/commit/7992fb854ec563b0781f375ebcdd2d83f5a6a562)]:
  - frontity@1.14.2
