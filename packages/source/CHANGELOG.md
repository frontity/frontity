# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.1](https://github.com/frontity/frontity/compare/@frontity/source@1.0.0...@frontity/source@1.0.1) (2019-06-05)


### Bug Fixes

* **all:** update typscript and fix some keywords ([1fe5fec](https://github.com/frontity/frontity/commit/1fe5fec))





# [1.0.0](https://github.com/frontity/frontity/compare/@frontity/source@0.1.2...@frontity/source@1.0.0) (2019-06-05)


### Bug Fixes

* **source:** change routeUtils functions to "getParams" and "getRoute" ([e385d3c](https://github.com/frontity/frontity/commit/e385d3c))


### Features

* **source:** accept only strings in 'source.get' and 'source.fetch' ([2e9ae62](https://github.com/frontity/frontity/commit/2e9ae62))
* **source:** add 'normalize' to libraries ([9e0e9e3](https://github.com/frontity/frontity/commit/9e0e9e3))
* **source:** change 'data' to 'get' and 'dataMap' to 'data' ([f32be1a](https://github.com/frontity/frontity/commit/f32be1a))
* **source:** move list pages to their own data ([148bc0a](https://github.com/frontity/frontity/commit/148bc0a))
* **source:** rename route libraries to 'stringify' and 'parse' ([f230f86](https://github.com/frontity/frontity/commit/f230f86))


### BREAKING CHANGES

* **source:** objects cannot be passed as arguments in 'source.get' and 'source.set'
* **source:** route libraries have new names
* **source:** "data.pages" doesn't exist anymore, use "data.items" instead. Each "route" represents now an archive's page (if "route" points to an archive).
* **source:** changes source API ("data" by  "get")





## [0.1.2](https://github.com/frontity/frontity/compare/@frontity/source@0.1.1...@frontity/source@0.1.2) (2019-05-15)

**Note:** Version bump only for package @frontity/source





## 0.1.1 (2019-05-15)

**Note:** Version bump only for package @frontity/source
