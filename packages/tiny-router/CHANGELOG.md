# Change Log

## 1.4.2

### Patch Changes

- [`86b2eff9`](https://github.com/frontity/frontity/commit/86b2eff993aac3e9360946a0c190e239b6f93abf) [#783](https://github.com/frontity/frontity/pull/783) Thanks [@luisherranz](https://github.com/luisherranz)! - Fix a bug that causes the URL being incorrectly populated when doing an HMR refresh.

* [`277c05d3`](https://github.com/frontity/frontity/commit/277c05d30cf39468aad3348abde425e11ea0bf6f) [#775](https://github.com/frontity/frontity/pull/775) Thanks [@DAreRodz](https://github.com/DAreRodz)! - Make redirection URLs relative, so they redirect to `localhost` in a dev environment.

* Updated dependencies [[`62e60216`](https://github.com/frontity/frontity/commit/62e60216198111626d82566507f7f208323ffeee), [`77e0a286`](https://github.com/frontity/frontity/commit/77e0a286ceb8274efb6a473c01c8f60d78b70225)]:
  - frontity@1.15.0

## 1.4.1

### Patch Changes

- [`d25c49db`](https://github.com/frontity/frontity/commit/d25c49db326392d69e20d71634687201cfa6d59a) [#745](https://github.com/frontity/frontity/pull/745) Thanks [@DAreRodz](https://github.com/DAreRodz)! - Fix a bug which caused infinite loop when visiting any link without the final trailing slash in the URL.

- Updated dependencies [[`4a179f5d`](https://github.com/frontity/frontity/commit/4a179f5d57cbb8c0008779e84db2b28b4017addf)]:
  - frontity@1.14.3

## 1.4.0

### Minor Changes

- [`31102365`](https://github.com/frontity/frontity/commit/311023655594f7bb6f8bc1332e79ecc333e0571b) [#429](https://github.com/frontity/frontity/pull/429) Thanks [@orballo](https://github.com/orballo)! - Implements actions.router.updateState() which takes a browser state object as an argument and executes a window.history.replaceState() with that object and the current url.

### Patch Changes

- [`7d8d1af4`](https://github.com/frontity/frontity/commit/7d8d1af4e3acce4596922fa9fe28965f91ab5fb9) [#652](https://github.com/frontity/frontity/pull/652) Thanks [@DAreRodz](https://github.com/DAreRodz)! - Fix the order `search` and `hash` are used internally to generate links.

- Updated dependencies [[`7c3f0769`](https://github.com/frontity/frontity/commit/7c3f076999d243de4f7dee631f40d2e71d47337d), [`49020718`](https://github.com/frontity/frontity/commit/49020718c569de081391c114a5684d092fd9769d), [`31102365`](https://github.com/frontity/frontity/commit/311023655594f7bb6f8bc1332e79ecc333e0571b), [`15e8f1d8`](https://github.com/frontity/frontity/commit/15e8f1d8cf66394d20034370df171a0c19ad51d3), [`7992fb85`](https://github.com/frontity/frontity/commit/7992fb854ec563b0781f375ebcdd2d83f5a6a562)]:
  - frontity@1.14.2
  - @frontity/router@1.3.0

## 1.3.2

### Patch Changes

- [`6cd501b1`](https://github.com/frontity/frontity/commit/6cd501b117a053dc67f2ab2be5f696ce6b8259b8) [#688](https://github.com/frontity/frontity/pull/688) Thanks [@SantosGuillamot](https://github.com/SantosGuillamot)! - Pass the correct context to replaceLocation to prevent and Illegal invocation in external redirects from client side navigation.

## 1.3.2-infinite-scroll-beta.0

### Patch Changes

- Release a new beta version in the infinite scroll tag.

## 1.3.1

### Patch Changes

- [`b41175d0`](https://github.com/frontity/frontity/commit/b41175d0f5df9ca95fc449ca1a0eca6649f1bccf) [#683](https://github.com/frontity/frontity/pull/683) Thanks [@cristianbote](https://github.com/cristianbote)! - Reverts the preinstall hook added for development workflows.

- Updated dependencies [[`b41175d0`](https://github.com/frontity/frontity/commit/b41175d0f5df9ca95fc449ca1a0eca6649f1bccf)]:
  - frontity@1.14.1
  - @frontity/router@1.1.4
  - @frontity/source@1.5.1

## 1.3.0

### Minor Changes

- [`cf35baa5`](https://github.com/frontity/frontity/commit/cf35baa5f14f93e8c814cb8bc850f53ee60af547) [#601](https://github.com/frontity/frontity/pull/601) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Add support for 30x Redirections.

  1. Redirections can be stored in the backend server, which will be checked according to different configurations:

     - Each time a link is fetched.
     - When the API returns a 404.
     - When the link belongs to a certain set of URLs (configured using a regexp).

     This configuration is stored in `state.source.redirections`.

     The redirection information will be stored in `state.source.data` similar to what happens for 4xx and 5xx errors.

  2. Redirections can be added to Frontity by populating `state.source.data` directly or using a handler.

  Feature Discussion: https://community.frontity.org/t/301-redirects-stored-in-wordpress-database/3032

## 1.3.0-infinite-scroll-beta.0

### Minor Changes

- [`31102365`](https://github.com/frontity/frontity/commit/311023655594f7bb6f8bc1332e79ecc333e0571b) [#429](https://github.com/frontity/frontity/pull/429) Thanks [@orballo](https://github.com/orballo)! - Implements actions.router.updateState() which takes a browser state object as an argument and executes a window.history.replaceState() with that object and the current url.

### Patch Changes

- Updated dependencies [[`31102365`](https://github.com/frontity/frontity/commit/311023655594f7bb6f8bc1332e79ecc333e0571b)]:
  - @frontity/router@1.2.0-infinite-scroll-beta.0
  - frontity@1.8.1-infinite-scroll-beta.0
  - @frontity/source@1.2.2-infinite-scroll-beta.0

### Patch Changes

- [`5f329dab`](https://github.com/frontity/frontity/commit/5f329dabe9d67d0b3664938865491674ef798433) [#655](https://github.com/frontity/frontity/pull/655) Thanks [@mburridge](https://github.com/mburridge)! - Fix broken links in README files.

- Updated dependencies [[`a5520f56`](https://github.com/frontity/frontity/commit/a5520f5605cfda2323e0c9ea4a553658a021fd15), [`01880c34`](https://github.com/frontity/frontity/commit/01880c34c111f55c23169adb7365ea9262e6cca8), [`3ced7fdf`](https://github.com/frontity/frontity/commit/3ced7fdfd93004c210bb47692ffae265874828e7), [`898cde32`](https://github.com/frontity/frontity/commit/898cde32b78992807fa0c7ffb76cd32c5545a6ad), [`5f329dab`](https://github.com/frontity/frontity/commit/5f329dabe9d67d0b3664938865491674ef798433), [`09f07484`](https://github.com/frontity/frontity/commit/09f07484c920e99d46290986d7a64b8f3c20e53c), [`e4221d4b`](https://github.com/frontity/frontity/commit/e4221d4b451268b5c951197a08b4021d50394c1b), [`9346f560`](https://github.com/frontity/frontity/commit/9346f560c4806483b914aa3fb7a37e373f48f712), [`5f329dab`](https://github.com/frontity/frontity/commit/5f329dabe9d67d0b3664938865491674ef798433), [`c5b0b8f7`](https://github.com/frontity/frontity/commit/c5b0b8f7e5ebfdf02f40ded7d7347a1d28039c2d), [`4f4b7f81`](https://github.com/frontity/frontity/commit/4f4b7f81d8eacb19e3d06eba72dcc199f556d7e4)]:
  - frontity@1.14.0
  - @frontity/source@1.5.0
  - @frontity/router@1.1.3

## 1.2.4

### Patch Changes

- [`a74704d0`](https://github.com/frontity/frontity/commit/a74704d06c910117e561d34771c006705e6d26c5) [#634](https://github.com/frontity/frontity/pull/634) Thanks [@DAreRodz](https://github.com/DAreRodz)! - Prevent navigation errors when the initial location in the browser doesn't match `state.router.link`.

  This could happen if Frontity is embedded in WordPress (see [embedded mode](https://github.com/frontity/frontity-embedded-proof-of-concept)) and the WordPress server modifies the URL when doing a request to the Frontity server.

## 1.2.3

### Patch Changes

- [`252c89d2`](https://github.com/frontity/frontity/commit/252c89d226b9575f8f30e9f102ed97de598061e6) [#616](https://github.com/frontity/frontity/pull/616) Thanks [@luisherranz](https://github.com/luisherranz)! - Fix a couple of unnecessary rerenderings when transitioning from one data object to another.

* [`362b02f1`](https://github.com/frontity/frontity/commit/362b02f1beb100ffb178a1d4e775e89b84b99ccc) [#449](https://github.com/frontity/frontity/pull/449) Thanks [@luisherranz](https://github.com/luisherranz)! - Adapt packages to changes in `@frontity/source`.

- [`44f44e3f`](https://github.com/frontity/frontity/commit/44f44e3f2ba436236b65518ddac30cd4af57ea18) [#590](https://github.com/frontity/frontity/pull/590) Thanks [@luisherranz](https://github.com/luisherranz)! - Update TypeScript definitions.

- Updated dependencies [[`362b02f1`](https://github.com/frontity/frontity/commit/362b02f1beb100ffb178a1d4e775e89b84b99ccc), [`362b02f1`](https://github.com/frontity/frontity/commit/362b02f1beb100ffb178a1d4e775e89b84b99ccc), [`362b02f1`](https://github.com/frontity/frontity/commit/362b02f1beb100ffb178a1d4e775e89b84b99ccc), [`3dfa3c48`](https://github.com/frontity/frontity/commit/3dfa3c4809d3b00528db8c1c8c530cf311901553), [`6b4bf82b`](https://github.com/frontity/frontity/commit/6b4bf82b5eee698f7ea8ea3b0bfd69a989caaba3), [`44f44e3f`](https://github.com/frontity/frontity/commit/44f44e3f2ba436236b65518ddac30cd4af57ea18), [`3dfa3c48`](https://github.com/frontity/frontity/commit/3dfa3c4809d3b00528db8c1c8c530cf311901553)]:
  - @frontity/source@1.4.0
  - frontity@1.13.0
  - @frontity/router@1.1.2

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
