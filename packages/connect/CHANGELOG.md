# Change Log

## 1.1.3

### Patch Changes

- [`159e02ca`](https://github.com/frontity/frontity/commit/159e02ca080ec9f7004c90276621d1a2708192ce) [#508](https://github.com/frontity/frontity/pull/508) Thanks [@luisherranz](https://github.com/luisherranz)! - Fix the types of `connect` when imported from `frontity` and used with options, like:

  ```js
  import { connect } from "frontity";

  const Component = () = { /* Some React component... */ };

  export default connect(Component, { injectProps: false });
  ```

## 1.1.2

### Patch Changes

- [`1440cfe7`](https://github.com/frontity/frontity/commit/1440cfe77f1a9154562dff23a97185c77bebb59c) [#482](https://github.com/frontity/frontity/pull/482) Thanks [@juanmaguitar](https://github.com/juanmaguitar)! - README.md created for this package.

- Updated dependencies [[`fb67272b`](https://github.com/frontity/frontity/commit/fb67272bd8a3dfff00868af394484ec09f1e0785)]:
  - @frontity/error@0.1.1

## 1.1.1

### Patch Changes

- [`5cb29ab6`](https://github.com/frontity/frontity/commit/5cb29ab63ab31872a4d853e5e2fdbdabca974c9f) [#430](https://github.com/frontity/frontity/pull/430) Thanks [@luisherranz](https://github.com/luisherranz)! - Fix broken types in TypeScript 3.9.

## 1.1.0

### Minor Changes

- [`996865a2`](https://github.com/frontity/frontity/commit/996865a27690d5b89d2ef110f5b1bf3fb91da6f5) [#404](https://github.com/frontity/frontity/pull/404) Thanks [@orballo](https://github.com/orballo)! - Implements `useConnect()` and adds options object `{ injectProps: boolean }` to `connect()`.

## 1.0.5

### Patch Changes

- [`34b37ec8`](https://github.com/frontity/frontity/commit/34b37ec84bc4c387754f241ea56fd5eb8b13b14d) [#360](https://github.com/frontity/frontity/pull/360) Thanks [@luisherranz](https://github.com/luisherranz)! - Move `getSnapshot` from a store property to an import of `"@frontity/connect"`.

## 1.0.4

### Patch Changes

- [`696dec11`](https://github.com/frontity/frontity/commit/696dec11bb8d32f0821cca3f5ce39e27c42d60b6) [#296](https://github.com/frontity/frontity/pull/296) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Fix a critical bug that causes promise errors to be swallowed

## [1.0.3](https://github.com/frontity/frontity/compare/@frontity/connect@1.0.2...@frontity/connect@1.0.3) (2019-10-02)

### Bug Fixes

- **typescript:** update to latest version ([a89b11c](https://github.com/frontity/frontity/commit/a89b11c))

## [1.0.2](https://github.com/frontity/frontity/compare/@frontity/connect@1.0.1...@frontity/connect@1.0.2) (2019-09-10)

### Bug Fixes

- **core:** remove componentWillMount warning with react-helmet-async ([0ea885b](https://github.com/frontity/frontity/commit/0ea885b))
- **wp-source:** properly populate custom post types and taxonomies ([857f803](https://github.com/frontity/frontity/commit/857f803))

## [1.0.1](https://github.com/frontity/frontity/compare/@frontity/connect@1.0.0...@frontity/connect@1.0.1) (2019-06-19)

### Bug Fixes

- **connect:** only run batchMethods if Proxy exists ([fa07e8e](https://github.com/frontity/frontity/commit/fa07e8e))

# [1.0.0](https://github.com/frontity/frontity/compare/@frontity/connect@0.1.4...@frontity/connect@1.0.0) (2019-06-05)

### Bug Fixes

- **all:** update typscript and fix some keywords ([1fe5fec](https://github.com/frontity/frontity/commit/1fe5fec))

### Features

- add some keywords ([9267faa](https://github.com/frontity/frontity/commit/9267faa))

### BREAKING CHANGES

- get this packages to 1.0.0

## [0.1.4](https://github.com/frontity/frontity/compare/@frontity/connect@0.1.3...@frontity/connect@0.1.4) (2019-06-05)

### Bug Fixes

- **connect:** include scheduler to fix batching in async events ([b4aa340](https://github.com/frontity/frontity/commit/b4aa340))

## [0.1.3](https://github.com/frontity/frontity/compare/@frontity/connect@0.1.2...@frontity/connect@0.1.3) (2019-05-17)

### Bug Fixes

- **connect:** support hooks inside connected components ([708dc95](https://github.com/frontity/frontity/commit/708dc95))

## [0.1.2](https://github.com/frontity/frontity/compare/@frontity/connect@0.1.1...@frontity/connect@0.1.2) (2019-05-15)

**Note:** Version bump only for package @frontity/connect

## 0.1.1 (2019-05-15)

**Note:** Version bump only for package @frontity/connect
