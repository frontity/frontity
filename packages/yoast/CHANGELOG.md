# @frontity/yoast

## 2.0.0

### Major Changes

- [`b12a1006`](https://github.com/frontity/frontity/commit/b12a100643d3207ab540b66cd7a1bb5626953900) [#548](https://github.com/frontity/frontity/pull/548) Thanks [@DAreRodz](https://github.com/DAreRodz)! - Republish the `@frontity/yoast` package
  ([feature discussion](https://community.frontity.org/t/support-for-yoast-plugin-rest-api-fields/2626)).

  This new version is compatible with WordPress sites using the
  [Yoast SEO](https://wordpress.org/plugins/wordpress-seo/) plugin since its
  version 14.0.

  The old
  [`@frontity/yoast`](https://www.npmjs.com/package/@frontity/yoast/v/1.2.0)
  package was deprecated in favor of the
  [`@frontity/head-tags`](https://www.npmjs.com/package/@frontity/head-tags)
  package for WordPress sites using also the
  [REST API - Head Tags](https://wordpress.org/plugins/rest-api-head-tags/)
  plugin, but that plugin is not compatible with recent versions of Yoast SEO.

### Patch Changes

- Updated dependencies [[`870e4ba5`](https://github.com/frontity/frontity/commit/870e4ba5ab6afd216d9f2c5f15383fb8028d471c), [`5eaf92cc`](https://github.com/frontity/frontity/commit/5eaf92cca957e4444c47db22d6c739a9d4c64f3b), [`b12a1006`](https://github.com/frontity/frontity/commit/b12a100643d3207ab540b66cd7a1bb5626953900), [`b12a1006`](https://github.com/frontity/frontity/commit/b12a100643d3207ab540b66cd7a1bb5626953900)]:
  - @frontity/source@1.3.0
  - @frontity/html2react@1.4.0
  - @frontity/head-tags@1.0.7

## 1.2.0

### Minor Changes

- [`68b395f1`](https://github.com/frontity/frontity/commit/68b395f10086fc7096442007d4f1a1a9929443c5) [#310](https://github.com/frontity/frontity/pull/310) Thanks [@luisherranz](https://github.com/luisherranz)! - Deprecate `@frontity/yoast` in favor of `@frontity/head-tags`

### Patch Changes

- [`6566d8e7`](https://github.com/frontity/frontity/commit/6566d8e70ae5801168a09008a8b341613a774f34) [#308](https://github.com/frontity/frontity/pull/308) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Update outdated TS types and correct the outdated import paths
