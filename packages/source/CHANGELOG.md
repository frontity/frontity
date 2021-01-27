# Change Log

## 1.5.0

### Minor Changes

- [`4f4b7f81`](https://github.com/frontity/frontity/commit/4f4b7f81d8eacb19e3d06eba72dcc199f556d7e4) [#601](https://github.com/frontity/frontity/pull/601) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Add the types for 30x redirections in accord with: https://community.frontity.org/t/301-redirects-stored-in-wordpress-database/3032

### Patch Changes

- [`898cde32`](https://github.com/frontity/frontity/commit/898cde32b78992807fa0c7ffb76cd32c5545a6ad) [#650](https://github.com/frontity/frontity/pull/650) Thanks [@luisherranz](https://github.com/luisherranz)! - Fix the `AttachmentEntity` type, which was not extending from the `PostTypeEntity` type.

* [`5f329dab`](https://github.com/frontity/frontity/commit/5f329dabe9d67d0b3664938865491674ef798433) [#655](https://github.com/frontity/frontity/pull/655) Thanks [@mburridge](https://github.com/mburridge)! - Fix broken links in README files.

* Updated dependencies [[`a5520f56`](https://github.com/frontity/frontity/commit/a5520f5605cfda2323e0c9ea4a553658a021fd15), [`01880c34`](https://github.com/frontity/frontity/commit/01880c34c111f55c23169adb7365ea9262e6cca8), [`3ced7fdf`](https://github.com/frontity/frontity/commit/3ced7fdfd93004c210bb47692ffae265874828e7), [`5f329dab`](https://github.com/frontity/frontity/commit/5f329dabe9d67d0b3664938865491674ef798433), [`09f07484`](https://github.com/frontity/frontity/commit/09f07484c920e99d46290986d7a64b8f3c20e53c), [`e4221d4b`](https://github.com/frontity/frontity/commit/e4221d4b451268b5c951197a08b4021d50394c1b), [`9346f560`](https://github.com/frontity/frontity/commit/9346f560c4806483b914aa3fb7a37e373f48f712), [`5f329dab`](https://github.com/frontity/frontity/commit/5f329dabe9d67d0b3664938865491674ef798433), [`c5b0b8f7`](https://github.com/frontity/frontity/commit/c5b0b8f7e5ebfdf02f40ded7d7347a1d28039c2d)]:
  - frontity@1.14.0

## 1.4.0

### Minor Changes

- [`362b02f1`](https://github.com/frontity/frontity/commit/362b02f1beb100ffb178a1d4e775e89b84b99ccc) [#449](https://github.com/frontity/frontity/pull/449) Thanks [@luisherranz](https://github.com/luisherranz)! - Rename `Taxonomy` to `Term` when it refers to [terms](https://developer.wordpress.org/reference/classes/wp_term/), and refactor entity types ([feature discussion](https://community.frontity.org/t/extend-sources-data-interface-with-types-from-new-handlers/1187/28)).

  These changes were made:

  - Alias `TaxonomyData` to `TermData`.
  - Alias `isTaxonomy()` to `isTerm()`.
  - Deprecate `data.isTaxonomy` and add `data.isTerm`.
  - Rename `TaxonomyEntity` to `TermEntity`.
  - Rename `TaxonomyType` to `TaxonomyEntity`.
  - Also, rename `PostType` to `TypeEntity`.

* [`362b02f1`](https://github.com/frontity/frontity/commit/362b02f1beb100ffb178a1d4e775e89b84b99ccc) [#449](https://github.com/frontity/frontity/pull/449) Thanks [@luisherranz](https://github.com/luisherranz)! - Add [type guards](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards) for data objects and entities ([feature discussion](https://community.frontity.org/t/extend-sources-data-interface-with-types-from-new-handlers/1187/28)).

- [`3dfa3c48`](https://github.com/frontity/frontity/commit/3dfa3c4809d3b00528db8c1c8c530cf311901553) [#610](https://github.com/frontity/frontity/pull/610) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Add the `state.source.url` setting to source according to
  https://community.frontity.org/t/make-the-backend-url-a-global-setting/2381.
  The types are in `@frontity/source` and the implementation is in
  `@frontity/wp-source`.

### Patch Changes

- [`3dfa3c48`](https://github.com/frontity/frontity/commit/3dfa3c4809d3b00528db8c1c8c530cf311901553) [#610](https://github.com/frontity/frontity/pull/610) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Update `state.source.api` to be a derived state.

- Updated dependencies [[`362b02f1`](https://github.com/frontity/frontity/commit/362b02f1beb100ffb178a1d4e775e89b84b99ccc), [`6b4bf82b`](https://github.com/frontity/frontity/commit/6b4bf82b5eee698f7ea8ea3b0bfd69a989caaba3), [`44f44e3f`](https://github.com/frontity/frontity/commit/44f44e3f2ba436236b65518ddac30cd4af57ea18)]:
  - frontity@1.13.0

## 1.3.1

### Patch Changes

- [`63fc4559`](https://github.com/frontity/frontity/commit/63fc45592f678bcc7503ea7fef01186a408a5396) [#564](https://github.com/frontity/frontity/pull/564) Thanks [@luisherranz](https://github.com/luisherranz)! - Rename `RouteParams` type to `LinkParams`. The word `route` is now used to
  describe a `link` without the pagination part.
- Updated dependencies [[`e2c193f2`](https://github.com/frontity/frontity/commit/e2c193f2ad8353886a8eb27ea74838383f6d2e4b)]:
  - frontity@1.12.0

## 1.3.0

### Minor Changes

- [`870e4ba5`](https://github.com/frontity/frontity/commit/870e4ba5ab6afd216d9f2c5f15383fb8028d471c) [#542](https://github.com/frontity/frontity/pull/542) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Add the new types required for wp-comments.

### Patch Changes

- [`5eaf92cc`](https://github.com/frontity/frontity/commit/5eaf92cca957e4444c47db22d6c739a9d4c64f3b) [#548](https://github.com/frontity/frontity/pull/548) Thanks [@DAreRodz](https://github.com/DAreRodz)! - Add a derived prop in `state.source` called `entity` that returns the entity pointed by a given link.

## 1.2.2

### Patch Changes

- [`3f61f711`](https://github.com/frontity/frontity/commit/3f61f71197d33b478427d1b74882c31258861e92) [#493](https://github.com/frontity/frontity/pull/493) Thanks [@juanmaguitar](https://github.com/juanmaguitar)! - README created.

- Updated dependencies [[`ba13f70a`](https://github.com/frontity/frontity/commit/ba13f70ae2a4360ca21c77aed1c920c02e9d45b8), [`62fce1e5`](https://github.com/frontity/frontity/commit/62fce1e5c117faeb5902dc0ddae3b13d95cd925b)]:
  - frontity@1.9.0

## 1.2.1

### Patch Changes

- [`75343be3`](https://github.com/frontity/frontity/commit/75343be3154dda5b587a3065b225161af96f0488) [#433](https://github.com/frontity/frontity/pull/433) Thanks [@SantosGuillamot](https://github.com/SantosGuillamot)! - Change urls to point to test.frontity.org instead of test.frontity.io.
- Updated dependencies [[`661ac083`](https://github.com/frontity/frontity/commit/661ac08316f44172166e79b05b47f0c15a837a9a), [`75343be3`](https://github.com/frontity/frontity/commit/75343be3154dda5b587a3065b225161af96f0488)]:
  - frontity@1.7.0

## 1.2.0

### Minor Changes

- [`e8210ee9`](https://github.com/frontity/frontity/commit/e8210ee97c25555a122dc63f114fb4188ea0b7af) [#253](https://github.com/frontity/frontity/pull/253) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - We have made easier to work with searches and pagination by adding this new properties to the data object returned by `state.source.get(someLink)`:

  In all entities:

  - `data.link`: the link (short for permalink).
  - `data.page`: the page number.
  - `data.route`: the link without the pagination part.

  In archives:

  - `data.next`: the link of the next page in an archive.
  - `data.previous`: the link of the previous page in an archive.

  In searches:

  - `data.isSearch`: true for links that are searches.
  - `data.searchQuery`: the value of the search.

### Patch Changes

- Updated dependencies [[`b3225692`](https://github.com/frontity/frontity/commit/b32256929351b66647f64900cc59862ee7c702a7), [`b3225692`](https://github.com/frontity/frontity/commit/b32256929351b66647f64900cc59862ee7c702a7), [`f7418071`](https://github.com/frontity/frontity/commit/f741807197c4cda5df2e43f5496a121428d309bf)]:
  - frontity@1.5.2

## 1.1.0

### Minor Changes

- [`e887fa1`](https://github.com/frontity/frontity/commit/e887fa1d28449cd9189861fe5a4be92fa4acbe33) [#242](https://github.com/frontity/frontity/pull/242) Thanks [@DAreRodz](https://github.com/DAreRodz)! - Change the name of entity types and add new ones:

  - Change `PostType` to `PostEntity`
  - Append `Entity` to all other entity types.
  - Add `PostType` and `TaxonomyType` for the objects that represent entity types. From WordPress, those types come from `/wp/v2/types` and `wp/v2/taxonomies` endpoints respectively.

## [1.0.17](https://github.com/frontity/frontity/compare/@frontity/source@1.0.16...@frontity/source@1.0.17) (2019-12-10)

**Note:** Version bump only for package @frontity/source

## [1.0.16](https://github.com/frontity/frontity/compare/@frontity/source@1.0.15...@frontity/source@1.0.16) (2019-11-04)

**Note:** Version bump only for package @frontity/source

## [1.0.15](https://github.com/frontity/frontity/compare/@frontity/source@1.0.14...@frontity/source@1.0.15) (2019-10-10)

**Note:** Version bump only for package @frontity/source

## [1.0.14](https://github.com/frontity/frontity/compare/@frontity/source@1.0.13...@frontity/source@1.0.14) (2019-10-02)

### Bug Fixes

- **typescript:** update to latest version ([a89b11c](https://github.com/frontity/frontity/commit/a89b11c))

## [1.0.13](https://github.com/frontity/frontity/compare/@frontity/source@1.0.12...@frontity/source@1.0.13) (2019-09-10)

**Note:** Version bump only for package @frontity/source

## [1.0.12](https://github.com/frontity/frontity/compare/@frontity/source@1.0.11...@frontity/source@1.0.12) (2019-08-12)

**Note:** Version bump only for package @frontity/source

## [1.0.11](https://github.com/frontity/frontity/compare/@frontity/source@1.0.10...@frontity/source@1.0.11) (2019-07-12)

### Bug Fixes

- **source:** export entity types ([6f2e369](https://github.com/frontity/frontity/commit/6f2e369))
- **source:** set isHome value for the home data object ([9af88b4](https://github.com/frontity/frontity/commit/9af88b4))

## [1.0.10](https://github.com/frontity/frontity/compare/@frontity/source@1.0.9...@frontity/source@1.0.10) (2019-07-04)

**Note:** Version bump only for package @frontity/source

## [1.0.9](https://github.com/frontity/frontity/compare/@frontity/source@1.0.8...@frontity/source@1.0.9) (2019-07-04)

**Note:** Version bump only for package @frontity/source

## [1.0.8](https://github.com/frontity/frontity/compare/@frontity/source@1.0.7...@frontity/source@1.0.8) (2019-07-01)

**Note:** Version bump only for package @frontity/source

## [1.0.7](https://github.com/frontity/frontity/compare/@frontity/source@1.0.6...@frontity/source@1.0.7) (2019-06-20)

**Note:** Version bump only for package @frontity/source

## [1.0.6](https://github.com/frontity/frontity/compare/@frontity/source@1.0.5...@frontity/source@1.0.6) (2019-06-20)

**Note:** Version bump only for package @frontity/source

## [1.0.5](https://github.com/frontity/frontity/compare/@frontity/source@1.0.4...@frontity/source@1.0.5) (2019-06-20)

**Note:** Version bump only for package @frontity/source

## [1.0.4](https://github.com/frontity/frontity/compare/@frontity/source@1.0.3...@frontity/source@1.0.4) (2019-06-19)

**Note:** Version bump only for package @frontity/source

## [1.0.3](https://github.com/frontity/frontity/compare/@frontity/source@1.0.2...@frontity/source@1.0.3) (2019-06-19)

### Bug Fixes

- **source-get:** make isFetching and isReady properties to be always present ([#122](https://github.com/frontity/frontity/issues/122)) ([6d2e485](https://github.com/frontity/frontity/commit/6d2e485))

## [1.0.2](https://github.com/frontity/frontity/compare/@frontity/source@1.0.1...@frontity/source@1.0.2) (2019-06-05)

### Bug Fixes

- **source:** fix wrong import in source tests ([209cdfd](https://github.com/frontity/frontity/commit/209cdfd))

## [1.0.1](https://github.com/frontity/frontity/compare/@frontity/source@1.0.0...@frontity/source@1.0.1) (2019-06-05)

### Bug Fixes

- **all:** update typscript and fix some keywords ([1fe5fec](https://github.com/frontity/frontity/commit/1fe5fec))

# [1.0.0](https://github.com/frontity/frontity/compare/@frontity/source@0.1.2...@frontity/source@1.0.0) (2019-06-05)

### Bug Fixes

- **source:** change routeUtils functions to "getParams" and "getRoute" ([e385d3c](https://github.com/frontity/frontity/commit/e385d3c))

### Features

- **source:** accept only strings in 'source.get' and 'source.fetch' ([2e9ae62](https://github.com/frontity/frontity/commit/2e9ae62))
- **source:** add 'normalize' to libraries ([9e0e9e3](https://github.com/frontity/frontity/commit/9e0e9e3))
- **source:** change 'data' to 'get' and 'dataMap' to 'data' ([f32be1a](https://github.com/frontity/frontity/commit/f32be1a))
- **source:** move list pages to their own data ([148bc0a](https://github.com/frontity/frontity/commit/148bc0a))
- **source:** rename route libraries to 'stringify' and 'parse' ([f230f86](https://github.com/frontity/frontity/commit/f230f86))

### BREAKING CHANGES

- **source:** objects cannot be passed as arguments in 'source.get' and 'source.set'
- **source:** route libraries have new names
- **source:** "data.pages" doesn't exist anymore, use "data.items" instead. Each "route" represents now an archive's page (if "route" points to an archive).
- **source:** changes source API ("data" by "get")

## [0.1.2](https://github.com/frontity/frontity/compare/@frontity/source@0.1.1...@frontity/source@0.1.2) (2019-05-15)

**Note:** Version bump only for package @frontity/source

## 0.1.1 (2019-05-15)

**Note:** Version bump only for package @frontity/source
