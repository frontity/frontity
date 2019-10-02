# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.3.0](https://github.com/frontity/frontity/compare/@frontity/core@1.2.1...@frontity/core@1.3.0) (2019-10-02)


### Bug Fixes

* **core:** delete package name from merged store ([7428a90](https://github.com/frontity/frontity/commit/7428a90))
* **typescript:** update to latest version ([a89b11c](https://github.com/frontity/frontity/commit/a89b11c))


### Features

* **cli:** add --dont-open-browser option to dev ([6ae037c](https://github.com/frontity/frontity/commit/6ae037c))





## [1.2.1](https://github.com/frontity/frontity/compare/@frontity/core@1.2.0...@frontity/core@1.2.1) (2019-09-10)


### Bug Fixes

* **core:** remove componentWillMount warning with react-helmet-async ([0ea885b](https://github.com/frontity/frontity/commit/0ea885b))
* **webpack:** add support for images in Windows ([#196](https://github.com/frontity/frontity/issues/196)) ([00aa4e1](https://github.com/frontity/frontity/commit/00aa4e1))





# [1.2.0](https://github.com/frontity/frontity/compare/@frontity/core@1.1.3...@frontity/core@1.2.0) (2019-08-12)


### Features

* **core:** add state.frontity.rendering with either ssr or csr ([707b80f](https://github.com/frontity/frontity/commit/707b80f))
* **core:** make localhost wait for webpack to avoid returning an error ([#174](https://github.com/frontity/frontity/issues/174)) ([51847d2](https://github.com/frontity/frontity/commit/51847d2))
* **frontity:** expose fetch and URL from frontity package ([#168](https://github.com/frontity/frontity/issues/168)) ([235c465](https://github.com/frontity/frontity/commit/235c465))





## [1.1.3](https://github.com/frontity/frontity/compare/@frontity/core@1.1.2...@frontity/core@1.1.3) (2019-07-12)

**Note:** Version bump only for package @frontity/core





## [1.1.2](https://github.com/frontity/frontity/compare/@frontity/core@1.1.1...@frontity/core@1.1.2) (2019-07-01)


### Bug Fixes

* **core:** return 404 if HMR endpoint gets through Webpack to Frontity ([#144](https://github.com/frontity/frontity/issues/144)) ([b86627a](https://github.com/frontity/frontity/commit/b86627a))





## [1.1.1](https://github.com/frontity/frontity/compare/@frontity/core@1.1.0...@frontity/core@1.1.1) (2019-06-19)


### Bug Fixes

* **core:** remove some viewport props in html to improve accessibility ([2962362](https://github.com/frontity/frontity/commit/2962362))





# [1.1.0](https://github.com/frontity/frontity/compare/@frontity/core@1.0.1...@frontity/core@1.1.0) (2019-06-19)


### Bug Fixes

* **connect:** add babel-polyfill to the es5 bundles ([9ee75fb](https://github.com/frontity/frontity/commit/9ee75fb))
* **core:** fix cert import when using https mode ([ea2ad4e](https://github.com/frontity/frontity/commit/ea2ad4e))
* **core:** fixes webpack MultiCompiler types ([ffaf853](https://github.com/frontity/frontity/commit/ffaf853))


### Features

* **core:** add HMR to the Connect store ([bde0186](https://github.com/frontity/frontity/commit/bde0186))
* **core:** open browser in "frontity dev" command ([f81d054](https://github.com/frontity/frontity/commit/f81d054))
* **packages:** creates packages @frontity/components, @frontity/hooks, and adds image processor to @frontity/html2react ([#130](https://github.com/frontity/frontity/issues/130)) ([6af4aa1](https://github.com/frontity/frontity/commit/6af4aa1))
* **webpack:** use raw-loader to import css files ([#133](https://github.com/frontity/frontity/issues/133)) ([5c5f7dd](https://github.com/frontity/frontity/commit/5c5f7dd))





## [1.0.1](https://github.com/frontity/frontity/compare/@frontity/core@1.0.0...@frontity/core@1.0.1) (2019-06-05)


### Bug Fixes

* **all:** update typscript and fix some keywords ([1fe5fec](https://github.com/frontity/frontity/commit/1fe5fec))





# [1.0.0](https://github.com/frontity/frontity/compare/@frontity/core@0.4.1...@frontity/core@1.0.0) (2019-06-05)


### Features

* **core:** merge arrays found in state instead of overwriting them ([#117](https://github.com/frontity/frontity/issues/117)) ([45dcacb](https://github.com/frontity/frontity/commit/45dcacb))
* **core:** refactor entry-points for new modes and files ([#98](https://github.com/frontity/frontity/issues/98)) ([1713522](https://github.com/frontity/frontity/commit/1713522))
* **core:** rename 'initial' to 'initialLink' and convert to a string ([b7bac1e](https://github.com/frontity/frontity/commit/b7bac1e))


### BREAKING CHANGES

* **core:** Arrays found in state are merged instead of overwritten
* **core:** 'initial' is now 'initialLink' and it's an string instead of an object.





## [0.4.1](https://github.com/frontity/frontity/compare/@frontity/core@0.4.0...@frontity/core@0.4.1) (2019-05-29)


### Bug Fixes

* **core:** deep clone state on each SSR to avoid bugs ([#104](https://github.com/frontity/frontity/issues/104)) ([0059eab](https://github.com/frontity/frontity/commit/0059eab)), closes [#101](https://github.com/frontity/frontity/issues/101)





# [0.4.0](https://github.com/frontity/frontity/compare/@frontity/core@0.3.7...@frontity/core@0.4.0) (2019-05-27)


### Features

* **webpack:** add support for images (png, jpg, gif and svg) ([fadbe29](https://github.com/frontity/frontity/commit/fadbe29))





## [0.3.7](https://github.com/frontity/frontity/compare/@frontity/core@0.3.6...@frontity/core@0.3.7) (2019-05-17)

**Note:** Version bump only for package @frontity/core





## [0.3.6](https://github.com/frontity/frontity/compare/@frontity/core@0.3.5...@frontity/core@0.3.6) (2019-05-17)


### Bug Fixes

* **core:** fix wrong public path in scripts ([a1f328b](https://github.com/frontity/frontity/commit/a1f328b))





## [0.3.5](https://github.com/frontity/frontity/compare/@frontity/core@0.3.4...@frontity/core@0.3.5) (2019-05-16)

**Note:** Version bump only for package @frontity/core





## [0.3.4](https://github.com/frontity/frontity/compare/@frontity/core@0.3.3...@frontity/core@0.3.4) (2019-05-16)


### Bug Fixes

* **initial-state:** fix merge of package state ([262c75e](https://github.com/frontity/frontity/commit/262c75e))
* **initial-state:** fix merge of package state ([#71](https://github.com/frontity/frontity/issues/71)) ([8c9771e](https://github.com/frontity/frontity/commit/8c9771e))
* **initial-state:** overwrite arrays instead of merge ([31db03c](https://github.com/frontity/frontity/commit/31db03c))
* **merge-packages:** don't clone to allow complex objects ([b1b127a](https://github.com/frontity/frontity/commit/b1b127a))
* **webpack:** fix bug with publicPath and dynamic imports ([#63](https://github.com/frontity/frontity/issues/63)) ([c6e99f5](https://github.com/frontity/frontity/commit/c6e99f5))





## [0.3.3](https://github.com/frontity/frontity/compare/@frontity/core@0.3.2...@frontity/core@0.3.3) (2019-05-16)


### Bug Fixes

* **core-scripts:** fixes texts and core dependencies ([faf8761](https://github.com/frontity/frontity/commit/faf8761))





## [0.3.2](https://github.com/frontity/frontity/compare/@frontity/core@0.3.1...@frontity/core@0.3.2) (2019-05-15)

**Note:** Version bump only for package @frontity/core





## [0.3.1](https://github.com/frontity/frontity/compare/@frontity/core@0.3.0...@frontity/core@0.3.1) (2019-05-15)

**Note:** Version bump only for package @frontity/core





# [0.3.0](https://github.com/frontity/frontity/compare/@frontity/core@0.2.0...@frontity/core@0.3.0) (2019-05-15)


### Bug Fixes

* **client:** do not load scripts if Proxy is not present ([55e4ca8](https://github.com/frontity/frontity/commit/55e4ca8))
* **tsconfig-build:**  set 'allowJs' and 'isoltatedModules' to false ([cd8a26d](https://github.com/frontity/frontity/commit/cd8a26d))


### Features

* **client:** run init and beforeCSR actions on client ([#50](https://github.com/frontity/frontity/issues/50)) ([5b69984](https://github.com/frontity/frontity/commit/5b69984))





# [0.2.0](https://github.com/frontity/frontity/compare/@frontity/core@0.1.2...@frontity/core@0.2.0) (2019-03-27)


### Bug Fixes

* **lerna:** execute bootstrap with --hoist after prepare ([e85cdee](https://github.com/frontity/frontity/commit/e85cdee))


### Features

* **basic-typescript:** example folders work ([cc5b0bf](https://github.com/frontity/frontity/commit/cc5b0bf))
* **core:** add build script ([1d4b19c](https://github.com/frontity/frontity/commit/1d4b19c))
* **core:** add server script ([f8d46bc](https://github.com/frontity/frontity/commit/f8d46bc))
* **core:** fix hot-server-middleware to make bundle severless ready ([34d25ee](https://github.com/frontity/frontity/commit/34d25ee))
* **core:** serve static files from Koa ([e57706d](https://github.com/frontity/frontity/commit/e57706d))





## [0.1.2](https://github.com/frontity/frontity/compare/@frontity/core@0.1.1...@frontity/core@0.1.2) (2019-02-27)


### Bug Fixes

* **core:** use the corrent character ([1f0830e](https://github.com/frontity/frontity/commit/1f0830e))





## 0.1.1 (2019-02-27)

**Note:** Version bump only for package @frontity/core
