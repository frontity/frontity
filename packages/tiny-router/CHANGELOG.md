# Change Log

## 1.2.2

### Patch Changes

- [`c21b2b4f`](https://github.com/frontity/frontity/commit/c21b2b4fb31516d7111fb5ecf195527851c160f8) [#569](https://github.com/frontity/frontity/pull/569) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Do not call `actions.source.fetch()` if it doesn't exist.

## 1.2.1

### Patch Changes

- [`73f9ae35`](https://github.com/frontity/frontity/commit/73f9ae35a64e2dc8038fc1b21ee4f10147680530) [#494](https://github.com/frontity/frontity/pull/494) Thanks [@juanmaguitar](https://github.com/juanmaguitar)! - README created.

- Updated dependencies [[`ba13f70a`](https://github.com/frontity/frontity/commit/ba13f70ae2a4360ca21c77aed1c920c02e9d45b8), [`62fce1e5`](https://github.com/frontity/frontity/commit/62fce1e5c117faeb5902dc0ddae3b13d95cd925b), [`3f61f711`](https://github.com/frontity/frontity/commit/3f61f71197d33b478427d1b74882c31258861e92), [`868c120f`](https://github.com/frontity/frontity/commit/868c120f2ede7a2f9013f6e659e1b0a1bf2785fe)]:
  - frontity@1.9.0
  - @frontity/source@1.2.2
  - @frontity/router@1.1.1

## 1.2.0

### Minor Changes

- [`0b09d627`](https://github.com/frontity/frontity/commit/0b09d627a247fa77f1627a91600f0daa029d4dd9) [#380](https://github.com/frontity/frontity/pull/380) Thanks [@orballo](https://github.com/orballo)! - - Add `method` option to `actions.router.set()` to allow `"replace"` in addition to `"push"`.

  - Add `state` option to `actions.router.set()` to allow storing an object in `window.history`.

  More information in this Feature Discussion: https://community.frontity.org/t/router-set-options-method-title-and-state/1508/14

### Patch Changes

- [`5e199053`](https://github.com/frontity/frontity/commit/5e199053a1fb79711836aeddd535699b5dd5e79d) [#321](https://github.com/frontity/frontity/pull/321) Thanks [@orballo](https://github.com/orballo)! - Temporary fix to make anchors with a hash work, like `/some-post#some-id`.

  This will be superseded by a combination of router converters and an internal router hook.- Updated dependencies [[`0b09d627`](https://github.com/frontity/frontity/commit/0b09d627a247fa77f1627a91600f0daa029d4dd9)]:

  - @frontity/router@1.1.0

## 1.1.1

### Patch Changes

- [`fe790be6`](https://github.com/frontity/frontity/commit/fe790be6b806d19edecb0b1eb980b1af13999ee7) [#332](https://github.com/frontity/frontity/pull/332) Thanks [@luisherranz](https://github.com/luisherranz)! - Move router types to @frontity/router/types file to match the placement of the rest of the packages.
- Updated dependencies [[`fe790be6`](https://github.com/frontity/frontity/commit/fe790be6b806d19edecb0b1eb980b1af13999ee7)]:
  - @frontity/router@1.0.19

## 1.1.0

### Minor Changes

- [`9afad1f6`](https://github.com/frontity/frontity/commit/9afad1f6fd14ccf1a8bcad3049976fb717f2b332) [#309](https://github.com/frontity/frontity/pull/309) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Return correct error codes on when the server responds with 4xx or 5xx.

### Patch Changes

- [`6566d8e7`](https://github.com/frontity/frontity/commit/6566d8e70ae5801168a09008a8b341613a774f34) [#308](https://github.com/frontity/frontity/pull/308) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Update outdated TS types and correct the outdated import paths
- Updated dependencies [[`417f2b0f`](https://github.com/frontity/frontity/commit/417f2b0f0b6f5626be253eb3f1be2daf257b71ef), [`495771f8`](https://github.com/frontity/frontity/commit/495771f83951f192f92d3162221cedc9b791e399), [`80c1aa3a`](https://github.com/frontity/frontity/commit/80c1aa3aee6cf04f46d6fa1a409abfcae2c511cc)]:
  - frontity@1.5.0

## [1.0.18](https://github.com/frontity/frontity/compare/@frontity/tiny-router@1.0.17...@frontity/tiny-router@1.0.18) (2019-12-10)

**Note:** Version bump only for package @frontity/tiny-router

## [1.0.17](https://github.com/frontity/frontity/compare/@frontity/tiny-router@1.0.16...@frontity/tiny-router@1.0.17) (2019-11-04)

**Note:** Version bump only for package @frontity/tiny-router

## [1.0.16](https://github.com/frontity/frontity/compare/@frontity/tiny-router@1.0.15...@frontity/tiny-router@1.0.16) (2019-10-10)

**Note:** Version bump only for package @frontity/tiny-router

## [1.0.15](https://github.com/frontity/frontity/compare/@frontity/tiny-router@1.0.14...@frontity/tiny-router@1.0.15) (2019-10-02)

### Bug Fixes

- **typescript:** update to latest version ([a89b11c](https://github.com/frontity/frontity/commit/a89b11c))

## [1.0.14](https://github.com/frontity/frontity/compare/@frontity/tiny-router@1.0.13...@frontity/tiny-router@1.0.14) (2019-09-10)

**Note:** Version bump only for package @frontity/tiny-router

## [1.0.13](https://github.com/frontity/frontity/compare/@frontity/tiny-router@1.0.12...@frontity/tiny-router@1.0.13) (2019-08-12)

**Note:** Version bump only for package @frontity/tiny-router

## [1.0.12](https://github.com/frontity/frontity/compare/@frontity/tiny-router@1.0.11...@frontity/tiny-router@1.0.12) (2019-07-12)

**Note:** Version bump only for package @frontity/tiny-router

## [1.0.11](https://github.com/frontity/frontity/compare/@frontity/tiny-router@1.0.10...@frontity/tiny-router@1.0.11) (2019-07-04)

**Note:** Version bump only for package @frontity/tiny-router

## [1.0.10](https://github.com/frontity/frontity/compare/@frontity/tiny-router@1.0.9...@frontity/tiny-router@1.0.10) (2019-07-04)

**Note:** Version bump only for package @frontity/tiny-router

## [1.0.9](https://github.com/frontity/frontity/compare/@frontity/tiny-router@1.0.8...@frontity/tiny-router@1.0.9) (2019-07-01)

**Note:** Version bump only for package @frontity/tiny-router

## [1.0.8](https://github.com/frontity/frontity/compare/@frontity/tiny-router@1.0.7...@frontity/tiny-router@1.0.8) (2019-06-20)

**Note:** Version bump only for package @frontity/tiny-router

## [1.0.7](https://github.com/frontity/frontity/compare/@frontity/tiny-router@1.0.6...@frontity/tiny-router@1.0.7) (2019-06-20)

**Note:** Version bump only for package @frontity/tiny-router

## [1.0.6](https://github.com/frontity/frontity/compare/@frontity/tiny-router@1.0.5...@frontity/tiny-router@1.0.6) (2019-06-20)

**Note:** Version bump only for package @frontity/tiny-router

## [1.0.5](https://github.com/frontity/frontity/compare/@frontity/tiny-router@1.0.4...@frontity/tiny-router@1.0.5) (2019-06-19)

**Note:** Version bump only for package @frontity/tiny-router

## [1.0.4](https://github.com/frontity/frontity/compare/@frontity/tiny-router@1.0.3...@frontity/tiny-router@1.0.4) (2019-06-19)

### Bug Fixes

- **source-get:** make isFetching and isReady properties to be always present ([#122](https://github.com/frontity/frontity/issues/122)) ([6d2e485](https://github.com/frontity/frontity/commit/6d2e485))

## [1.0.3](https://github.com/frontity/frontity/compare/@frontity/tiny-router@1.0.2...@frontity/tiny-router@1.0.3) (2019-06-05)

**Note:** Version bump only for package @frontity/tiny-router

## [1.0.2](https://github.com/frontity/frontity/compare/@frontity/tiny-router@1.0.1...@frontity/tiny-router@1.0.2) (2019-06-05)

**Note:** Version bump only for package @frontity/tiny-router

## [1.0.1](https://github.com/frontity/frontity/compare/@frontity/tiny-router@1.0.0...@frontity/tiny-router@1.0.1) (2019-06-05)

### Bug Fixes

- **all:** update typscript and fix some keywords ([1fe5fec](https://github.com/frontity/frontity/commit/1fe5fec))

# [1.0.0](https://github.com/frontity/frontity/compare/@frontity/tiny-router@0.3.8...@frontity/tiny-router@1.0.0) (2019-06-05)

### Bug Fixes

- **tiny-router:** avoid 'An object could not be cloned' error ([997e4fd](https://github.com/frontity/frontity/commit/997e4fd))

### Features

- **core:** refactor entry-points for new modes and files ([#98](https://github.com/frontity/frontity/issues/98)) ([1713522](https://github.com/frontity/frontity/commit/1713522))
- **core:** rename 'initial' to 'initialLink' and convert to a string ([b7bac1e](https://github.com/frontity/frontity/commit/b7bac1e))
- **router:** accept only strings in 'router.set' and add 'link' ([294ef53](https://github.com/frontity/frontity/commit/294ef53))
- **tiny-router:** implement auto fetching ([#113](https://github.com/frontity/frontity/issues/113)) ([3865c6b](https://github.com/frontity/frontity/commit/3865c6b))

### BREAKING CHANGES

- **core:** 'initial' is now 'initialLink' and it's an string instead of an object.
- **router:** Only a string as argument in 'router.set', add 'link' and remove 'path', 'page' and 'query'.

## [0.3.8](https://github.com/frontity/frontity/compare/@frontity/tiny-router@0.3.7...@frontity/tiny-router@0.3.8) (2019-05-29)

**Note:** Version bump only for package @frontity/tiny-router

## [0.3.7](https://github.com/frontity/frontity/compare/@frontity/tiny-router@0.3.6...@frontity/tiny-router@0.3.7) (2019-05-28)

**Note:** Version bump only for package @frontity/tiny-router

## [0.3.6](https://github.com/frontity/frontity/compare/@frontity/tiny-router@0.3.5...@frontity/tiny-router@0.3.6) (2019-05-27)

**Note:** Version bump only for package @frontity/tiny-router

## [0.3.5](https://github.com/frontity/frontity/compare/@frontity/tiny-router@0.3.4...@frontity/tiny-router@0.3.5) (2019-05-27)

**Note:** Version bump only for package @frontity/tiny-router

## [0.3.4](https://github.com/frontity/frontity/compare/@frontity/tiny-router@0.3.3...@frontity/tiny-router@0.3.4) (2019-05-17)

**Note:** Version bump only for package @frontity/tiny-router

## [0.3.3](https://github.com/frontity/frontity/compare/@frontity/tiny-router@0.3.2...@frontity/tiny-router@0.3.3) (2019-05-17)

**Note:** Version bump only for package @frontity/tiny-router

## [0.3.2](https://github.com/frontity/frontity/compare/@frontity/tiny-router@0.3.1...@frontity/tiny-router@0.3.2) (2019-05-16)

**Note:** Version bump only for package @frontity/tiny-router

## [0.3.1](https://github.com/frontity/frontity/compare/@frontity/tiny-router@0.3.0...@frontity/tiny-router@0.3.1) (2019-05-16)

**Note:** Version bump only for package @frontity/tiny-router

# [0.3.0](https://github.com/frontity/frontity/compare/@frontity/tiny-router@0.2.7...@frontity/tiny-router@0.3.0) (2019-05-16)

### Bug Fixes

- **tiny-router:** accept any type of url in the path parameter ([6ba2c3c](https://github.com/frontity/frontity/commit/6ba2c3c))
- **tiny-router:** push correct href to history when page is present ([556964a](https://github.com/frontity/frontity/commit/556964a))

### Features

- **list:** adds pagination to mars-theme ([58a3c3e](https://github.com/frontity/frontity/commit/58a3c3e))

## [0.2.7](https://github.com/frontity/frontity/compare/@frontity/tiny-router@0.2.6...@frontity/tiny-router@0.2.7) (2019-05-16)

**Note:** Version bump only for package @frontity/tiny-router

## [0.2.6](https://github.com/frontity/frontity/compare/@frontity/tiny-router@0.2.5...@frontity/tiny-router@0.2.6) (2019-05-16)

**Note:** Version bump only for package @frontity/tiny-router

## [0.2.5](https://github.com/frontity/frontity/compare/@frontity/tiny-router@0.2.4...@frontity/tiny-router@0.2.5) (2019-05-16)

**Note:** Version bump only for package @frontity/tiny-router

## [0.2.4](https://github.com/frontity/frontity/compare/@frontity/tiny-router@0.2.3...@frontity/tiny-router@0.2.4) (2019-05-16)

**Note:** Version bump only for package @frontity/tiny-router

## [0.2.3](https://github.com/frontity/frontity/compare/@frontity/tiny-router@0.2.2...@frontity/tiny-router@0.2.3) (2019-05-15)

**Note:** Version bump only for package @frontity/tiny-router

## [0.2.2](https://github.com/frontity/frontity/compare/@frontity/tiny-router@0.2.1...@frontity/tiny-router@0.2.2) (2019-05-15)

**Note:** Version bump only for package @frontity/tiny-router

## [0.2.1](https://github.com/frontity/frontity/compare/@frontity/tiny-router@0.2.0...@frontity/tiny-router@0.2.1) (2019-05-15)

**Note:** Version bump only for package @frontity/tiny-router

# 0.2.0 (2019-05-15)

### Features

- **frontity:** use the frontity package as interface for the core packages ([#48](https://github.com/frontity/frontity/issues/48)) ([429e795](https://github.com/frontity/frontity/commit/429e795))
