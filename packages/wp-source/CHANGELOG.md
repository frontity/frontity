# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.3.0](https://github.com/frontity/frontity/compare/@frontity/wp-source@1.2.0...@frontity/wp-source@1.3.0) (2019-09-10)


### Bug Fixes

* **wp-source:** allow arrays inside params in api.get ([50fcd63](https://github.com/frontity/frontity/commit/50fcd63))
* **wp-source:** fix handlers, refactor them and improve tests ([#193](https://github.com/frontity/frontity/issues/193)) ([c7e2bfe](https://github.com/frontity/frontity/commit/c7e2bfe))
* **wp-source:** properly populate custom post types and taxonomies ([857f803](https://github.com/frontity/frontity/commit/857f803))


### Features

* **wp-source:** add `postEndpoint` and `params` props to state ([d921b33](https://github.com/frontity/frontity/commit/d921b33))





# [1.2.0](https://github.com/frontity/frontity/compare/@frontity/wp-source@1.1.8...@frontity/wp-source@1.2.0) (2019-08-12)


### Bug Fixes

* **wp-source:** do not set `isHome` in `postArchive` handler ([#179](https://github.com/frontity/frontity/issues/179)) ([13e5c1e](https://github.com/frontity/frontity/commit/13e5c1e))


### Features

* **frontity:** expose fetch and URL from frontity package ([#168](https://github.com/frontity/frontity/issues/168)) ([235c465](https://github.com/frontity/frontity/commit/235c465))





## [1.1.8](https://github.com/frontity/frontity/compare/@frontity/wp-source@1.1.7...@frontity/wp-source@1.1.8) (2019-07-12)


### Bug Fixes

* **source:** set isHome value for the home data object ([9af88b4](https://github.com/frontity/frontity/commit/9af88b4))





## [1.1.7](https://github.com/frontity/frontity/compare/@frontity/wp-source@1.1.6...@frontity/wp-source@1.1.7) (2019-07-04)

**Note:** Version bump only for package @frontity/wp-source





## [1.1.6](https://github.com/frontity/frontity/compare/@frontity/wp-source@1.1.5...@frontity/wp-source@1.1.6) (2019-07-04)


### Bug Fixes

* **babel:** use workaround for a bug in babel 7.5.0 ([3c489ae](https://github.com/frontity/frontity/commit/3c489ae))





## [1.1.5](https://github.com/frontity/frontity/compare/@frontity/wp-source@1.1.4...@frontity/wp-source@1.1.5) (2019-07-01)

**Note:** Version bump only for package @frontity/wp-source





## [1.1.4](https://github.com/frontity/frontity/compare/@frontity/wp-source@1.1.3...@frontity/wp-source@1.1.4) (2019-06-20)

**Note:** Version bump only for package @frontity/wp-source





## [1.1.3](https://github.com/frontity/frontity/compare/@frontity/wp-source@1.1.2...@frontity/wp-source@1.1.3) (2019-06-20)

**Note:** Version bump only for package @frontity/wp-source





## [1.1.2](https://github.com/frontity/frontity/compare/@frontity/wp-source@1.1.1...@frontity/wp-source@1.1.2) (2019-06-20)

**Note:** Version bump only for package @frontity/wp-source





## [1.1.1](https://github.com/frontity/frontity/compare/@frontity/wp-source@1.1.0...@frontity/wp-source@1.1.1) (2019-06-19)

**Note:** Version bump only for package @frontity/wp-source





# [1.1.0](https://github.com/frontity/frontity/compare/@frontity/wp-source@1.0.3...@frontity/wp-source@1.1.0) (2019-06-19)


### Features

* **wp-source:** add support for subdirectory, redirections, pages as home, category and tag base ([#131](https://github.com/frontity/frontity/issues/131)) ([0b877b2](https://github.com/frontity/frontity/commit/0b877b2))





## [1.0.3](https://github.com/frontity/frontity/compare/@frontity/wp-source@1.0.2...@frontity/wp-source@1.0.3) (2019-06-19)


### Bug Fixes

* **source-get:** make isFetching and isReady properties to be always present ([#122](https://github.com/frontity/frontity/issues/122)) ([6d2e485](https://github.com/frontity/frontity/commit/6d2e485))





## [1.0.2](https://github.com/frontity/frontity/compare/@frontity/wp-source@1.0.1...@frontity/wp-source@1.0.2) (2019-06-05)


### Bug Fixes

* **source:** fix wrong import in source tests ([209cdfd](https://github.com/frontity/frontity/commit/209cdfd))





## [1.0.1](https://github.com/frontity/frontity/compare/@frontity/wp-source@1.0.0...@frontity/wp-source@1.0.1) (2019-06-05)


### Bug Fixes

* **all:** update typscript and fix some keywords ([1fe5fec](https://github.com/frontity/frontity/commit/1fe5fec))
* **wp-source:** change apiUrl for api ([26947e7](https://github.com/frontity/frontity/commit/26947e7))





# [1.0.0](https://github.com/frontity/frontity/compare/@frontity/wp-source@0.1.7...@frontity/wp-source@1.0.0) (2019-06-05)


### Bug Fixes

* **route-utils:** support custom names in routes ([1b0994b](https://github.com/frontity/frontity/commit/1b0994b))
* **source:** change routeUtils functions to "getParams" and "getRoute" ([e385d3c](https://github.com/frontity/frontity/commit/e385d3c))
* **wp-source:** fix archive handlers ([c09736f](https://github.com/frontity/frontity/commit/c09736f))
* **wp-source:** fix searches in taxonomies ([8b9257f](https://github.com/frontity/frontity/commit/8b9257f))
* **wp-source:** remove domains from links ([f111b8c](https://github.com/frontity/frontity/commit/f111b8c))
* **wp-source:** transform WpSource into a function ([abd7034](https://github.com/frontity/frontity/commit/abd7034))


### Features

* **source:** accept only strings in 'source.get' and 'source.fetch' ([2e9ae62](https://github.com/frontity/frontity/commit/2e9ae62))
* **source:** add 'normalize' to libraries ([9e0e9e3](https://github.com/frontity/frontity/commit/9e0e9e3))
* **source:** change 'data' to 'get' and 'dataMap' to 'data' ([f32be1a](https://github.com/frontity/frontity/commit/f32be1a))
* **source:** move list pages to their own data ([148bc0a](https://github.com/frontity/frontity/commit/148bc0a))
* **source:** rename route libraries to 'stringify' and 'parse' ([f230f86](https://github.com/frontity/frontity/commit/f230f86))
* **wp-source:** add library 'routeUtils' ([0a31246](https://github.com/frontity/frontity/commit/0a31246))
* **wp-source:** remove domain from links ([ff1752b](https://github.com/frontity/frontity/commit/ff1752b))


### BREAKING CHANGES

* **source:** objects cannot be passed as arguments in 'source.get' and 'source.set'
* **source:** route libraries have new names
* **source:** "data.pages" doesn't exist anymore, use "data.items" instead. Each "route" represents now an archive's page (if "route" points to an archive).
* **source:** changes source API ("data" by  "get")





## [0.1.7](https://github.com/frontity/frontity/compare/@frontity/wp-source@0.1.6...@frontity/wp-source@0.1.7) (2019-05-20)

**Note:** Version bump only for package @frontity/wp-source





## [0.1.6](https://github.com/frontity/frontity/compare/@frontity/wp-source@0.1.5...@frontity/wp-source@0.1.6) (2019-05-17)

**Note:** Version bump only for package @frontity/wp-source





## [0.1.5](https://github.com/frontity/frontity/compare/@frontity/wp-source@0.1.4...@frontity/wp-source@0.1.5) (2019-05-16)

**Note:** Version bump only for package @frontity/wp-source





## [0.1.4](https://github.com/frontity/frontity/compare/@frontity/wp-source@0.1.3...@frontity/wp-source@0.1.4) (2019-05-16)

**Note:** Version bump only for package @frontity/wp-source





## [0.1.3](https://github.com/frontity/frontity/compare/@frontity/wp-source@0.1.2...@frontity/wp-source@0.1.3) (2019-05-15)

**Note:** Version bump only for package @frontity/wp-source





## [0.1.2](https://github.com/frontity/frontity/compare/@frontity/wp-source@0.1.1...@frontity/wp-source@0.1.2) (2019-05-15)

**Note:** Version bump only for package @frontity/wp-source





## 0.1.1 (2019-05-15)


### Bug Fixes

* **jest-config:** transform js files with ts-jest ([943b3e4](https://github.com/frontity/frontity/commit/943b3e4))
