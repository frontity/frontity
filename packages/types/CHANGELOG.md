# Change Log

## 1.4.2

### Patch Changes

- [`f5bf7b1c`](https://github.com/frontity/frontity/commit/f5bf7b1cee2850445fe5304e1b39e20e786e9377) [#475](https://github.com/frontity/frontity/pull/475) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Use `React.ElementType` instead of the deprecated `React.ReactType`

* [`159e02ca`](https://github.com/frontity/frontity/commit/159e02ca080ec9f7004c90276621d1a2708192ce) [#508](https://github.com/frontity/frontity/pull/508) Thanks [@luisherranz](https://github.com/luisherranz)! - Fix the types of `connect` when imported from `frontity` and used with options, like:

  ```js
  import { connect } from "frontity";

  const Component = () = { /* Some React component... */ };

  export default connect(Component, { injectProps: false });
  ```

## 1.4.1

### Patch Changes

- [`ee9f2616`](https://github.com/frontity/frontity/commit/ee9f26165e1f965d3234b4cf9588966e3ab36ec7) [#478](https://github.com/frontity/frontity/pull/478) Thanks [@juanmaguitar](https://github.com/juanmaguitar)! - README.md package created

## 1.4.0

### Minor Changes

- [`6900916a`](https://github.com/frontity/frontity/commit/6900916ace309d3cc55b9c732124df5d3db96838) [#430](https://github.com/frontity/frontity/pull/430) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Add types for `state.fills` and `library.fills` for the ["Slot and Fill" pattern](https://community.frontity.org/t/slot-and-fill/895).

## 1.3.0

### Minor Changes

- [`897780d5`](https://github.com/frontity/frontity/commit/897780d549b56cc6ddb1c06b107b570114ff5587) [#328](https://github.com/frontity/frontity/pull/328) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Add a new type for server actions that want to modify Koa's context called `ServerAction`.

## 1.2.0

### Minor Changes

- [`a4e9e579`](https://github.com/frontity/frontity/commit/a4e9e579a6306c87cb91f33e635201387bd405ea) [#309](https://github.com/frontity/frontity/pull/309) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Pass Koa's context to beforeSSR action so packages can modify it.

## 1.2.0

### Minor Changes

- [`009c502`](https://github.com/frontity/frontity/commit/009c50288db2af45d2f586e8be43b76f52612540) [#259](https://github.com/frontity/frontity/pull/259) Thanks [@orballo](https://github.com/orballo)! - Adds types for async actions.

## [1.1.2](https://github.com/frontity/frontity/compare/@frontity/types@1.1.1...@frontity/types@1.1.2) (2019-10-02)

### Bug Fixes

- **typescript:** update to latest version ([a89b11c](https://github.com/frontity/frontity/commit/a89b11c))

## [1.1.1](https://github.com/frontity/frontity/compare/@frontity/types@1.1.0...@frontity/types@1.1.1) (2019-09-10)

### Bug Fixes

- **core:** remove componentWillMount warning with react-helmet-async ([0ea885b](https://github.com/frontity/frontity/commit/0ea885b))

# [1.1.0](https://github.com/frontity/frontity/compare/@frontity/types@1.0.2...@frontity/types@1.1.0) (2019-08-12)

### Features

- **core:** add state.frontity.rendering with either ssr or csr ([707b80f](https://github.com/frontity/frontity/commit/707b80f))

## [1.0.2](https://github.com/frontity/frontity/compare/@frontity/types@1.0.1...@frontity/types@1.0.2) (2019-07-12)

**Note:** Version bump only for package @frontity/types

## [1.0.1](https://github.com/frontity/frontity/compare/@frontity/types@1.0.0...@frontity/types@1.0.1) (2019-06-05)

### Bug Fixes

- **all:** update typscript and fix some keywords ([1fe5fec](https://github.com/frontity/frontity/commit/1fe5fec))

# [1.0.0](https://github.com/frontity/frontity/compare/@frontity/types@0.1.2...@frontity/types@1.0.0) (2019-06-05)

### Bug Fixes

- **types:** improve connect types with overloads ([#106](https://github.com/frontity/frontity/issues/106)) ([1c5d8e8](https://github.com/frontity/frontity/commit/1c5d8e8))

### Features

- **core:** rename 'initial' to 'initialLink' and convert to a string ([b7bac1e](https://github.com/frontity/frontity/commit/b7bac1e))

### BREAKING CHANGES

- **core:** 'initial' is now 'initialLink' and it's an string instead of an object.

## [0.1.2](https://github.com/frontity/frontity/compare/@frontity/types@0.1.1...@frontity/types@0.1.2) (2019-05-15)

**Note:** Version bump only for package @frontity/types

## 0.1.1 (2019-05-15)

**Note:** Version bump only for package @frontity/types
