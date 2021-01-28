# @frontity/yoast

## 2.1.0

### Minor Changes

- [`3ced7fdf`](https://github.com/frontity/frontity/commit/3ced7fdfd93004c210bb47692ffae265874828e7) [#670](https://github.com/frontity/frontity/pull/670) Thanks [@nicholasio](https://github.com/nicholasio)! - Update react imports in all packages (including themes) to removed unnecessary React Imports

### Patch Changes

- [`5f329dab`](https://github.com/frontity/frontity/commit/5f329dabe9d67d0b3664938865491674ef798433) [#655](https://github.com/frontity/frontity/pull/655) Thanks [@mburridge](https://github.com/mburridge)! - Fix broken links in README files.

* [`7c2fa5cc`](https://github.com/frontity/frontity/commit/7c2fa5cc47a42de8ba0a331045186e3009427cd8) [#635](https://github.com/frontity/frontity/pull/635) Thanks [@DAreRodz](https://github.com/DAreRodz)! - Refactor some packages to use `state.source.url` instead of `state.source.api` to get the backend URL.

* Updated dependencies [[`681caef1`](https://github.com/frontity/frontity/commit/681caef16c1660152e13c62afd0740071e968428), [`a5520f56`](https://github.com/frontity/frontity/commit/a5520f5605cfda2323e0c9ea4a553658a021fd15), [`01880c34`](https://github.com/frontity/frontity/commit/01880c34c111f55c23169adb7365ea9262e6cca8), [`367700eb`](https://github.com/frontity/frontity/commit/367700ebcad8dd6b87728c526de63a9c19f2df32), [`3ced7fdf`](https://github.com/frontity/frontity/commit/3ced7fdfd93004c210bb47692ffae265874828e7), [`898cde32`](https://github.com/frontity/frontity/commit/898cde32b78992807fa0c7ffb76cd32c5545a6ad), [`5f329dab`](https://github.com/frontity/frontity/commit/5f329dabe9d67d0b3664938865491674ef798433), [`09f07484`](https://github.com/frontity/frontity/commit/09f07484c920e99d46290986d7a64b8f3c20e53c), [`e4221d4b`](https://github.com/frontity/frontity/commit/e4221d4b451268b5c951197a08b4021d50394c1b), [`0ca83cd5`](https://github.com/frontity/frontity/commit/0ca83cd5c068c4a0b759a277c8d819cdbc5c88db), [`9346f560`](https://github.com/frontity/frontity/commit/9346f560c4806483b914aa3fb7a37e373f48f712), [`cf35baa5`](https://github.com/frontity/frontity/commit/cf35baa5f14f93e8c814cb8bc850f53ee60af547), [`5f329dab`](https://github.com/frontity/frontity/commit/5f329dabe9d67d0b3664938865491674ef798433), [`c5b0b8f7`](https://github.com/frontity/frontity/commit/c5b0b8f7e5ebfdf02f40ded7d7347a1d28039c2d), [`7c2fa5cc`](https://github.com/frontity/frontity/commit/7c2fa5cc47a42de8ba0a331045186e3009427cd8), [`4f4b7f81`](https://github.com/frontity/frontity/commit/4f4b7f81d8eacb19e3d06eba72dcc199f556d7e4), [`d38040d3`](https://github.com/frontity/frontity/commit/d38040d3986d3d1cdf3af45eafe7d9a868920d02)]:
  - @frontity/wp-source@1.11.0
  - frontity@1.14.0
  - @frontity/html2react@1.6.0
  - @frontity/head-tags@1.1.0
  - @frontity/source@1.5.0
  - @frontity/router@1.1.3

## 2.0.1

### Patch Changes

- [`12fc1797`](https://github.com/frontity/frontity/commit/12fc179797d8b1a60069dbfe4441b451c19a8123) [#610](https://github.com/frontity/frontity/pull/610) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Fix Yoast type import of `state.source.api`, which is now in `@frontity/wp-source` and not in `@frontity/source`.

  > 💡 In the future, once the `@frontity/yoast` package starts using `state.source.url` instead of `state.source.api`, the types of `@frontity/source` should be used again.

* [`362b02f1`](https://github.com/frontity/frontity/commit/362b02f1beb100ffb178a1d4e775e89b84b99ccc) [#449](https://github.com/frontity/frontity/pull/449) Thanks [@luisherranz](https://github.com/luisherranz)! - Adapt packages to changes in `@frontity/source`.

- [`0eefb47b`](https://github.com/frontity/frontity/commit/0eefb47be4e779bcddf44b00f845ededdece798e) [#615](https://github.com/frontity/frontity/pull/615) Thanks [@luisherranz](https://github.com/luisherranz)! - Add `isTaxonomy` back to avoid breaking Yoast for sites with custom handlers that are not using `isTerm` yet.

* [`44f44e3f`](https://github.com/frontity/frontity/commit/44f44e3f2ba436236b65518ddac30cd4af57ea18) [#590](https://github.com/frontity/frontity/pull/590) Thanks [@luisherranz](https://github.com/luisherranz)! - Update TypeScript definitions.

* Updated dependencies [[`362b02f1`](https://github.com/frontity/frontity/commit/362b02f1beb100ffb178a1d4e775e89b84b99ccc), [`362b02f1`](https://github.com/frontity/frontity/commit/362b02f1beb100ffb178a1d4e775e89b84b99ccc), [`54c588a9`](https://github.com/frontity/frontity/commit/54c588a9534d7c1761c0def8c83381696fd443fc), [`d7b4b429`](https://github.com/frontity/frontity/commit/d7b4b429f1f23dfae74b9781ea1b1de00aed763c), [`252c89d2`](https://github.com/frontity/frontity/commit/252c89d226b9575f8f30e9f102ed97de598061e6), [`362b02f1`](https://github.com/frontity/frontity/commit/362b02f1beb100ffb178a1d4e775e89b84b99ccc), [`362b02f1`](https://github.com/frontity/frontity/commit/362b02f1beb100ffb178a1d4e775e89b84b99ccc), [`3dfa3c48`](https://github.com/frontity/frontity/commit/3dfa3c4809d3b00528db8c1c8c530cf311901553), [`2c69da57`](https://github.com/frontity/frontity/commit/2c69da577ebd93d3335a2e50f8fb38c3eba1d7f7), [`6b4bf82b`](https://github.com/frontity/frontity/commit/6b4bf82b5eee698f7ea8ea3b0bfd69a989caaba3), [`44f44e3f`](https://github.com/frontity/frontity/commit/44f44e3f2ba436236b65518ddac30cd4af57ea18), [`3dfa3c48`](https://github.com/frontity/frontity/commit/3dfa3c4809d3b00528db8c1c8c530cf311901553)]:
  - @frontity/source@1.4.0
  - frontity@1.13.0
  - @frontity/html2react@1.5.0
  - @frontity/wp-source@1.10.0
  - @frontity/head-tags@1.0.8
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
