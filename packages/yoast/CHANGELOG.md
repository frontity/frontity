# @frontity/yoast

## 2.0.1

### Patch Changes

- [`12fc1797`](https://github.com/frontity/frontity/commit/12fc179797d8b1a60069dbfe4441b451c19a8123) [#610](https://github.com/frontity/frontity/pull/610) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Fix Yoast type import of `state.source.api`, which is now in `@frontity/wp-source` and not in `@frontity/source`.

  > 💡 In the future, once the `@frontity/yoast` package starts using `state.source.url` instead of `state.source.api`, the types of `@frontity/source` should be used again.

* [`362b02f1`](https://github.com/frontity/frontity/commit/362b02f1beb100ffb178a1d4e775e89b84b99ccc) [#449](https://github.com/frontity/frontity/pull/449) Thanks [@luisherranz](https://github.com/luisherranz)! - Adapt packages to changes in `@frontity/source`.

- [`44f44e3f`](https://github.com/frontity/frontity/commit/44f44e3f2ba436236b65518ddac30cd4af57ea18) [#590](https://github.com/frontity/frontity/pull/590) Thanks [@luisherranz](https://github.com/luisherranz)! - Update TypeScript definitions.

- Updated dependencies [[`362b02f1`](https://github.com/frontity/frontity/commit/362b02f1beb100ffb178a1d4e775e89b84b99ccc), [`362b02f1`](https://github.com/frontity/frontity/commit/362b02f1beb100ffb178a1d4e775e89b84b99ccc), [`362b02f1`](https://github.com/frontity/frontity/commit/362b02f1beb100ffb178a1d4e775e89b84b99ccc), [`362b02f1`](https://github.com/frontity/frontity/commit/362b02f1beb100ffb178a1d4e775e89b84b99ccc), [`3dfa3c48`](https://github.com/frontity/frontity/commit/3dfa3c4809d3b00528db8c1c8c530cf311901553), [`2c69da57`](https://github.com/frontity/frontity/commit/2c69da577ebd93d3335a2e50f8fb38c3eba1d7f7), [`6b4bf82b`](https://github.com/frontity/frontity/commit/6b4bf82b5eee698f7ea8ea3b0bfd69a989caaba3), [`44f44e3f`](https://github.com/frontity/frontity/commit/44f44e3f2ba436236b65518ddac30cd4af57ea18), [`3dfa3c48`](https://github.com/frontity/frontity/commit/3dfa3c4809d3b00528db8c1c8c530cf311901553)]:
  - @frontity/source@1.4.0
  - frontity@1.13.0
  - @frontity/head-tags@1.0.8
  - @frontity/wp-source@1.10.0
  - @frontity/router@1.1.2

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
