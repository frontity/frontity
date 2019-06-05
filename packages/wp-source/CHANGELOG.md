# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
