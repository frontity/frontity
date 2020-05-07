# Change Log

## 1.5.3

### Patch Changes

- [`502bc144`](https://github.com/frontity/frontity/commit/502bc144158a1b64971c738dcf93306ad5b61a8f) [#406](https://github.com/frontity/frontity/pull/406) Thanks [@luisherranz](https://github.com/luisherranz)! - Don't embed fonts so big because they have an impact on LightHouse performance score. I have reduced the limit from 25Kbs to 8Kbs, which seems to be the recommendation in Webpack.

* [`7c2a99f9`](https://github.com/frontity/frontity/commit/7c2a99f9be43ad965f4d4b00c81145f21230f63f) [#387](https://github.com/frontity/frontity/pull/387) Thanks [@iamuchejude](https://github.com/iamuchejude)! - Fix yarn symlink bug

## 1.5.2

### Patch Changes

- [`34b37ec8`](https://github.com/frontity/frontity/commit/34b37ec84bc4c387754f241ea56fd5eb8b13b14d) [#360](https://github.com/frontity/frontity/pull/360) Thanks [@luisherranz](https://github.com/luisherranz)! - Move `getSnapshot` from a store property to an import of `"@frontity/connect"`.

* [`ffdebed8`](https://github.com/frontity/frontity/commit/ffdebed862541d39f06305137a5cbcdec8f4ee66) [#357](https://github.com/frontity/frontity/pull/357) Thanks [@luisherranz](https://github.com/luisherranz)! - Fix vulnerability in minimist package.

- [`ac8832b1`](https://github.com/frontity/frontity/commit/ac8832b1be702f8bf4e00a8c9bc4ec3a32a3e236) [#350](https://github.com/frontity/frontity/pull/350) Thanks [@luisherranz](https://github.com/luisherranz)! - Don't catch errors in `npx frontity serve`.
- Updated dependencies [[`34b37ec8`](https://github.com/frontity/frontity/commit/34b37ec84bc4c387754f241ea56fd5eb8b13b14d)]:
  - @frontity/connect@1.0.5

## 1.5.1

### Patch Changes

- [`a6cea54c`](https://github.com/frontity/frontity/commit/a6cea54c577c3bae42576e22c7b6c5a0c29e8846) [#333](https://github.com/frontity/frontity/pull/333) Thanks [@luisherranz](https://github.com/luisherranz)! - Fix some minor Webpack bundling warnings.

* [`96180f92`](https://github.com/frontity/frontity/commit/96180f926130d4d0f986c9095ef44a6c2b9ab907) [#344](https://github.com/frontity/frontity/pull/344) Thanks [@luisherranz](https://github.com/luisherranz)! - Avoid console error when an old tab is opened with localhost and the server is restarted.

- [`b6fab41a`](https://github.com/frontity/frontity/commit/b6fab41ac5abb917fbcfec9a8a06c3f23909d7bc) [#348](https://github.com/frontity/frontity/pull/348) Thanks [@luisherranz](https://github.com/luisherranz)! - `babel-loader` throws an error if the cache identifier is not a string.

## 1.5.0

### Minor Changes

- [`a4e9e579`](https://github.com/frontity/frontity/commit/a4e9e579a6306c87cb91f33e635201387bd405ea) [#309](https://github.com/frontity/frontity/pull/309) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Pass Koa's context to beforeSSR action so packages can modify it.

* [`ed257939`](https://github.com/frontity/frontity/commit/ed257939010b5a1ed79562439fed426843649af5) [#301](https://github.com/frontity/frontity/pull/301) Thanks [@wisammechano](https://github.com/wisammechano)! - babel-plugin-macros was added to babel core configs

### Patch Changes

- [`15a8b582`](https://github.com/frontity/frontity/commit/15a8b582bc38d15f49b80dbbc86884d3ba607c4d) [#299](https://github.com/frontity/frontity/pull/299) Thanks [@DAreRodz](https://github.com/DAreRodz)! - Prevent array elements stored in the state to be duplicated during CSR

* [`495771f8`](https://github.com/frontity/frontity/commit/495771f83951f192f92d3162221cedc9b791e399) [#302](https://github.com/frontity/frontity/pull/302) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Add a new `decode` function to 'frontity', which unescapes the HTML.

  This replaces the `decode` function previously in `html2react`.

  This is necessary because some of the content fro WP API can come as escaped HTML entities and we want to render it straight into react components.- Updated dependencies [[`696dec11`](https://github.com/frontity/frontity/commit/696dec11bb8d32f0821cca3f5ce39e27c42d60b6), [`a4e9e579`](https://github.com/frontity/frontity/commit/a4e9e579a6306c87cb91f33e635201387bd405ea)]:

  - @frontity/connect@1.0.4
  - @frontity/types@1.2.0

## [1.4.1](https://github.com/frontity/frontity/compare/@frontity/core@1.4.0...@frontity/core@1.4.1) (2019-12-10)

### Bug Fixes

- **loadable:** fix secondary chunks ([913d64a](https://github.com/frontity/frontity/commit/913d64a))

# [1.4.0](https://github.com/frontity/frontity/compare/@frontity/core@1.3.0...@frontity/core@1.4.0) (2019-11-04)

### Bug Fixes

- **core:** add labels and source maps ([#227](https://github.com/frontity/frontity/issues/227)) ([d5af653](https://github.com/frontity/frontity/commit/d5af653))
- **emotion:** fix Global css not ending up in head ([e8c3430](https://github.com/frontity/frontity/commit/e8c3430))
- **emotion:** fix Global leak ([baad509](https://github.com/frontity/frontity/commit/baad509))

### Features

- **webpack:** add support for fonts to webpack ([2148823](https://github.com/frontity/frontity/commit/2148823))

# [1.3.0](https://github.com/frontity/frontity/compare/@frontity/core@1.2.1...@frontity/core@1.3.0) (2019-10-02)

### Bug Fixes

- **core:** delete package name from merged store ([7428a90](https://github.com/frontity/frontity/commit/7428a90))
- **typescript:** update to latest version ([a89b11c](https://github.com/frontity/frontity/commit/a89b11c))

### Features

- **cli:** add --dont-open-browser option to dev ([6ae037c](https://github.com/frontity/frontity/commit/6ae037c))

## [1.2.1](https://github.com/frontity/frontity/compare/@frontity/core@1.2.0...@frontity/core@1.2.1) (2019-09-10)

### Bug Fixes

- **core:** remove componentWillMount warning with react-helmet-async ([0ea885b](https://github.com/frontity/frontity/commit/0ea885b))
- **webpack:** add support for images in Windows ([#196](https://github.com/frontity/frontity/issues/196)) ([00aa4e1](https://github.com/frontity/frontity/commit/00aa4e1))

# [1.2.0](https://github.com/frontity/frontity/compare/@frontity/core@1.1.3...@frontity/core@1.2.0) (2019-08-12)

### Features

- **core:** add state.frontity.rendering with either ssr or csr ([707b80f](https://github.com/frontity/frontity/commit/707b80f))
- **core:** make localhost wait for webpack to avoid returning an error ([#174](https://github.com/frontity/frontity/issues/174)) ([51847d2](https://github.com/frontity/frontity/commit/51847d2))
- **frontity:** expose fetch and URL from frontity package ([#168](https://github.com/frontity/frontity/issues/168)) ([235c465](https://github.com/frontity/frontity/commit/235c465))

## [1.1.3](https://github.com/frontity/frontity/compare/@frontity/core@1.1.2...@frontity/core@1.1.3) (2019-07-12)

**Note:** Version bump only for package @frontity/core

## [1.1.2](https://github.com/frontity/frontity/compare/@frontity/core@1.1.1...@frontity/core@1.1.2) (2019-07-01)

### Bug Fixes

- **core:** return 404 if HMR endpoint gets through Webpack to Frontity ([#144](https://github.com/frontity/frontity/issues/144)) ([b86627a](https://github.com/frontity/frontity/commit/b86627a))

## [1.1.1](https://github.com/frontity/frontity/compare/@frontity/core@1.1.0...@frontity/core@1.1.1) (2019-06-19)

### Bug Fixes

- **core:** remove some viewport props in html to improve accessibility ([2962362](https://github.com/frontity/frontity/commit/2962362))

# [1.1.0](https://github.com/frontity/frontity/compare/@frontity/core@1.0.1...@frontity/core@1.1.0) (2019-06-19)

### Bug Fixes

- **connect:** add babel-polyfill to the es5 bundles ([9ee75fb](https://github.com/frontity/frontity/commit/9ee75fb))
- **core:** fix cert import when using https mode ([ea2ad4e](https://github.com/frontity/frontity/commit/ea2ad4e))
- **core:** fixes webpack MultiCompiler types ([ffaf853](https://github.com/frontity/frontity/commit/ffaf853))

### Features

- **core:** add HMR to the Connect store ([bde0186](https://github.com/frontity/frontity/commit/bde0186))
- **core:** open browser in "frontity dev" command ([f81d054](https://github.com/frontity/frontity/commit/f81d054))
- **packages:** creates packages @frontity/components, @frontity/hooks, and adds image processor to @frontity/html2react ([#130](https://github.com/frontity/frontity/issues/130)) ([6af4aa1](https://github.com/frontity/frontity/commit/6af4aa1))
- **webpack:** use raw-loader to import css files ([#133](https://github.com/frontity/frontity/issues/133)) ([5c5f7dd](https://github.com/frontity/frontity/commit/5c5f7dd))

## [1.0.1](https://github.com/frontity/frontity/compare/@frontity/core@1.0.0...@frontity/core@1.0.1) (2019-06-05)

### Bug Fixes

- **all:** update typscript and fix some keywords ([1fe5fec](https://github.com/frontity/frontity/commit/1fe5fec))

# [1.0.0](https://github.com/frontity/frontity/compare/@frontity/core@0.4.1...@frontity/core@1.0.0) (2019-06-05)

### Features

- **core:** merge arrays found in state instead of overwriting them ([#117](https://github.com/frontity/frontity/issues/117)) ([45dcacb](https://github.com/frontity/frontity/commit/45dcacb))
- **core:** refactor entry-points for new modes and files ([#98](https://github.com/frontity/frontity/issues/98)) ([1713522](https://github.com/frontity/frontity/commit/1713522))
- **core:** rename 'initial' to 'initialLink' and convert to a string ([b7bac1e](https://github.com/frontity/frontity/commit/b7bac1e))

### BREAKING CHANGES

- **core:** Arrays found in state are merged instead of overwritten
- **core:** 'initial' is now 'initialLink' and it's an string instead of an object.

## [0.4.1](https://github.com/frontity/frontity/compare/@frontity/core@0.4.0...@frontity/core@0.4.1) (2019-05-29)

### Bug Fixes

- **core:** deep clone state on each SSR to avoid bugs ([#104](https://github.com/frontity/frontity/issues/104)) ([0059eab](https://github.com/frontity/frontity/commit/0059eab)), closes [#101](https://github.com/frontity/frontity/issues/101)

# [0.4.0](https://github.com/frontity/frontity/compare/@frontity/core@0.3.7...@frontity/core@0.4.0) (2019-05-27)

### Features

- **webpack:** add support for images (png, jpg, gif and svg) ([fadbe29](https://github.com/frontity/frontity/commit/fadbe29))

## [0.3.7](https://github.com/frontity/frontity/compare/@frontity/core@0.3.6...@frontity/core@0.3.7) (2019-05-17)

**Note:** Version bump only for package @frontity/core

## [0.3.6](https://github.com/frontity/frontity/compare/@frontity/core@0.3.5...@frontity/core@0.3.6) (2019-05-17)

### Bug Fixes

- **core:** fix wrong public path in scripts ([a1f328b](https://github.com/frontity/frontity/commit/a1f328b))

## [0.3.5](https://github.com/frontity/frontity/compare/@frontity/core@0.3.4...@frontity/core@0.3.5) (2019-05-16)

**Note:** Version bump only for package @frontity/core

## [0.3.4](https://github.com/frontity/frontity/compare/@frontity/core@0.3.3...@frontity/core@0.3.4) (2019-05-16)

### Bug Fixes

- **initial-state:** fix merge of package state ([262c75e](https://github.com/frontity/frontity/commit/262c75e))
- **initial-state:** fix merge of package state ([#71](https://github.com/frontity/frontity/issues/71)) ([8c9771e](https://github.com/frontity/frontity/commit/8c9771e))
- **initial-state:** overwrite arrays instead of merge ([31db03c](https://github.com/frontity/frontity/commit/31db03c))
- **merge-packages:** don't clone to allow complex objects ([b1b127a](https://github.com/frontity/frontity/commit/b1b127a))
- **webpack:** fix bug with publicPath and dynamic imports ([#63](https://github.com/frontity/frontity/issues/63)) ([c6e99f5](https://github.com/frontity/frontity/commit/c6e99f5))

## [0.3.3](https://github.com/frontity/frontity/compare/@frontity/core@0.3.2...@frontity/core@0.3.3) (2019-05-16)

### Bug Fixes

- **core-scripts:** fixes texts and core dependencies ([faf8761](https://github.com/frontity/frontity/commit/faf8761))

## [0.3.2](https://github.com/frontity/frontity/compare/@frontity/core@0.3.1...@frontity/core@0.3.2) (2019-05-15)

**Note:** Version bump only for package @frontity/core

## [0.3.1](https://github.com/frontity/frontity/compare/@frontity/core@0.3.0...@frontity/core@0.3.1) (2019-05-15)

**Note:** Version bump only for package @frontity/core

# [0.3.0](https://github.com/frontity/frontity/compare/@frontity/core@0.2.0...@frontity/core@0.3.0) (2019-05-15)

### Bug Fixes

- **client:** do not load scripts if Proxy is not present ([55e4ca8](https://github.com/frontity/frontity/commit/55e4ca8))
- **tsconfig-build:** set 'allowJs' and 'isoltatedModules' to false ([cd8a26d](https://github.com/frontity/frontity/commit/cd8a26d))

### Features

- **client:** run init and beforeCSR actions on client ([#50](https://github.com/frontity/frontity/issues/50)) ([5b69984](https://github.com/frontity/frontity/commit/5b69984))

# [0.2.0](https://github.com/frontity/frontity/compare/@frontity/core@0.1.2...@frontity/core@0.2.0) (2019-03-27)

### Bug Fixes

- **lerna:** execute bootstrap with --hoist after prepare ([e85cdee](https://github.com/frontity/frontity/commit/e85cdee))

### Features

- **basic-typescript:** example folders work ([cc5b0bf](https://github.com/frontity/frontity/commit/cc5b0bf))
- **core:** add build script ([1d4b19c](https://github.com/frontity/frontity/commit/1d4b19c))
- **core:** add server script ([f8d46bc](https://github.com/frontity/frontity/commit/f8d46bc))
- **core:** fix hot-server-middleware to make bundle severless ready ([34d25ee](https://github.com/frontity/frontity/commit/34d25ee))
- **core:** serve static files from Koa ([e57706d](https://github.com/frontity/frontity/commit/e57706d))

## [0.1.2](https://github.com/frontity/frontity/compare/@frontity/core@0.1.1...@frontity/core@0.1.2) (2019-02-27)

### Bug Fixes

- **core:** use the corrent character ([1f0830e](https://github.com/frontity/frontity/commit/1f0830e))

## 0.1.1 (2019-02-27)

**Note:** Version bump only for package @frontity/core
