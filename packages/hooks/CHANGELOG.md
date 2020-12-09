# Change Log

## 2.1.0-infinite-scroll-beta.4

### Patch Changes

- Updated dependencies []:
  - @frontity/wp-source@1.10.1-infinite-scroll-beta.0

## 2.1.0-infinite-scroll-beta.3

### Patch Changes

- [`c702ab9f`](https://github.com/frontity/frontity/commit/c702ab9f350d9a1b217b5f51e9469f3e5c92b53e) [#575](https://github.com/frontity/frontity/pull/575) Thanks [@orballo](https://github.com/orballo)! - Use `state.source.subdirectory` and `state.source.postsPage` to get the link of the post archive in `usePostTypeInfiniteScroll`.

* [`464aa87f`](https://github.com/frontity/frontity/commit/464aa87f49e57f493bb1b2725f0c8e0e4ce7d31d) [#575](https://github.com/frontity/frontity/pull/575) Thanks [@orballo](https://github.com/orballo)! - Fix `isLast` value when last post returned `isError`.

## 2.1.0-infinite-scroll-beta.2

### Minor Changes

- [`32c03d58`](https://github.com/frontity/frontity/commit/32c03d58fd40889e98997a8715704b58c994c34b) [#533](https://github.com/frontity/frontity/pull/533) Thanks [@orballo](https://github.com/orballo)! - Adds `isError` boolean to infinite scroll hooks will be `true` when either the last post or the last page has failed to fetch.

## 2.1.0-infinite-scroll-beta.1

### Patch Changes

- [`9bdf948b`](https://github.com/frontity/frontity/commit/9bdf948bda7e5352762ccf220ecb1f41c911d6dc) [#476](https://github.com/frontity/frontity/pull/476) Thanks [@orballo](https://github.com/orballo)! - Fixes a bug on the `usePostTypeInfiniteScroll` where the archive is not requested if we are loading the post type from SSR.

## 2.1.0-infinite-scroll-beta.0

### Minor Changes

- [`31102365`](https://github.com/frontity/frontity/commit/311023655594f7bb6f8bc1332e79ecc333e0571b) [#429](https://github.com/frontity/frontity/pull/429) Thanks [@orballo](https://github.com/orballo)! - Implements the brand new and long-awaited infinite scroll hooks collection, featuring `useArchiveInfiniteScroll`, `usePostTypeInfiniteScroll` and `useInfiniteScroll`.

### Patch Changes

- Updated dependencies [[`31102365`](https://github.com/frontity/frontity/commit/311023655594f7bb6f8bc1332e79ecc333e0571b)]:
  - @frontity/router@1.2.0-infinite-scroll-beta.0
  - frontity@1.8.1-infinite-scroll-beta.0
  - @frontity/source@1.2.2-infinite-scroll-beta.0

## 2.0.2

### Patch Changes

- [`fc1220b5`](https://github.com/frontity/frontity/commit/fc1220b5eb2ae0af933b76cc9fb1a62b83fc7075) [#484](https://github.com/frontity/frontity/pull/484) Thanks [@juanmaguitar](https://github.com/juanmaguitar)! - README.md created.

## 2.0.1

### Patch Changes

- [`5cb29ab6`](https://github.com/frontity/frontity/commit/5cb29ab63ab31872a4d853e5e2fdbdabca974c9f) [#430](https://github.com/frontity/frontity/pull/430) Thanks [@luisherranz](https://github.com/luisherranz)! - Mark the package as "side-effect free" to allow [tree shaking in Webpack](https://webpack.js.org/guides/tree-shaking/).

## 2.0.0

### Major Changes

- [`8a0bb8f0`](https://github.com/frontity/frontity/commit/8a0bb8f03ad70ac6b92be14c2c95dcad2b3ccf75) [#413](https://github.com/frontity/frontity/pull/413) Thanks [@orballo](https://github.com/orballo)! - Reimplementation of `useInView` hook as a wrapper for `react-intersection-observer` that checks if `IntersectionObserver` is supported by the browser.

### Patch Changes

- Updated dependencies [[`661ac083`](https://github.com/frontity/frontity/commit/661ac08316f44172166e79b05b47f0c15a837a9a), [`75343be3`](https://github.com/frontity/frontity/commit/75343be3154dda5b587a3065b225161af96f0488)]:
  - frontity@1.7.0

## 1.2.0

### Minor Changes

- [`1aa1fb22`](https://github.com/frontity/frontity/commit/1aa1fb22e4da9f0c8b00dd08cb364eea31f20a6c) [#256](https://github.com/frontity/frontity/pull/256) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Deprecate the @frontity/hooks package and recommend https://github.com/thebuilder/react-intersection-observer instead.

### Patch Changes

- [`b9372580`](https://github.com/frontity/frontity/commit/b937258068c13e97265d96a6239d584673a17fcd) [#251](https://github.com/frontity/frontity/pull/251) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Bugfix for useInView hook. Fixes occasional error when attempting to find a nonexistent element in page.
- Updated dependencies [[`417f2b0f`](https://github.com/frontity/frontity/commit/417f2b0f0b6f5626be253eb3f1be2daf257b71ef), [`495771f8`](https://github.com/frontity/frontity/commit/495771f83951f192f92d3162221cedc9b791e399), [`80c1aa3a`](https://github.com/frontity/frontity/commit/80c1aa3aee6cf04f46d6fa1a409abfcae2c511cc)]:
  - frontity@1.5.0

## [1.1.14](https://github.com/frontity/frontity/compare/@frontity/hooks@1.1.13...@frontity/hooks@1.1.14) (2019-12-10)

**Note:** Version bump only for package @frontity/hooks

## [1.1.13](https://github.com/frontity/frontity/compare/@frontity/hooks@1.1.12...@frontity/hooks@1.1.13) (2019-11-04)

**Note:** Version bump only for package @frontity/hooks

## [1.1.12](https://github.com/frontity/frontity/compare/@frontity/hooks@1.1.11...@frontity/hooks@1.1.12) (2019-10-10)

**Note:** Version bump only for package @frontity/hooks

## [1.1.11](https://github.com/frontity/frontity/compare/@frontity/hooks@1.1.10...@frontity/hooks@1.1.11) (2019-10-02)

### Bug Fixes

- **typescript:** update to latest version ([a89b11c](https://github.com/frontity/frontity/commit/a89b11c))

## [1.1.10](https://github.com/frontity/frontity/compare/@frontity/hooks@1.1.9...@frontity/hooks@1.1.10) (2019-09-10)

**Note:** Version bump only for package @frontity/hooks

## [1.1.9](https://github.com/frontity/frontity/compare/@frontity/hooks@1.1.8...@frontity/hooks@1.1.9) (2019-08-12)

**Note:** Version bump only for package @frontity/hooks

## [1.1.8](https://github.com/frontity/frontity/compare/@frontity/hooks@1.1.7...@frontity/hooks@1.1.8) (2019-07-12)

**Note:** Version bump only for package @frontity/hooks

## [1.1.7](https://github.com/frontity/frontity/compare/@frontity/hooks@1.1.6...@frontity/hooks@1.1.7) (2019-07-04)

**Note:** Version bump only for package @frontity/hooks

## [1.1.6](https://github.com/frontity/frontity/compare/@frontity/hooks@1.1.5...@frontity/hooks@1.1.6) (2019-07-04)

**Note:** Version bump only for package @frontity/hooks

## [1.1.5](https://github.com/frontity/frontity/compare/@frontity/hooks@1.1.4...@frontity/hooks@1.1.5) (2019-07-01)

**Note:** Version bump only for package @frontity/hooks

## [1.1.4](https://github.com/frontity/frontity/compare/@frontity/hooks@1.1.3...@frontity/hooks@1.1.4) (2019-06-20)

**Note:** Version bump only for package @frontity/hooks

## [1.1.3](https://github.com/frontity/frontity/compare/@frontity/hooks@1.1.2...@frontity/hooks@1.1.3) (2019-06-20)

**Note:** Version bump only for package @frontity/hooks

## [1.1.2](https://github.com/frontity/frontity/compare/@frontity/hooks@1.1.1...@frontity/hooks@1.1.2) (2019-06-20)

**Note:** Version bump only for package @frontity/hooks

## [1.1.1](https://github.com/frontity/frontity/compare/@frontity/hooks@1.1.0...@frontity/hooks@1.1.1) (2019-06-19)

**Note:** Version bump only for package @frontity/hooks

# 1.1.0 (2019-06-19)

### Features

- **packages:** creates packages @frontity/components, @frontity/hooks, and adds image processor to @frontity/html2react ([#130](https://github.com/frontity/frontity/issues/130)) ([6af4aa1](https://github.com/frontity/frontity/commit/6af4aa1))
