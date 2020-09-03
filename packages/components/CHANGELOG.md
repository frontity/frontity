# Change Log

## 1.5.1

### Patch Changes

- Updated dependencies [[`611f3e2a`](https://github.com/frontity/frontity/commit/611f3e2ac836033417e9921a44b52cdd2f07793f), [`d95262df`](https://github.com/frontity/frontity/commit/d95262df70c43afb955747473393c8440d2a3af9), [`6ece281a`](https://github.com/frontity/frontity/commit/6ece281a8a3b8cf66443123fa1f4b88734ef95c2), [`d95262df`](https://github.com/frontity/frontity/commit/d95262df70c43afb955747473393c8440d2a3af9), [`2a1a1f35`](https://github.com/frontity/frontity/commit/2a1a1f35810337a18edc96c3da06ffd492152ed8), [`623a4146`](https://github.com/frontity/frontity/commit/623a41464aab97981f3c02d16747c5b8f9111b83)]:
  - frontity@2.0.0
  - @frontity/router@1.1.2
  - @frontity/source@1.2.3

## 1.5.0

### Minor Changes

- [`453e58de`](https://github.com/frontity/frontity/commit/453e58dee065a03e70355973b5f77d443fc5b0f6) [#518](https://github.com/frontity/frontity/pull/518) - Introducing [auto prefetching](https://community.frontity.org/t/auto-prefetch-data/886) to the `<Link />` component.

  There are four supported modes:

  - "in-view": Only prefetch links that are currently visible in the viewport. (recommended)
  - "all": Prefetches all internal links on the page.
  - "hover": Prefetches links on hover.
  - "no": No auto prefetch.

  The prefetch mode should be set in `state.theme.autoPrefetch`.

### Patch Changes

- Updated dependencies [[`17f539bf`](https://github.com/frontity/frontity/commit/17f539bfb547105bd4565735c5491f2400c3c8fe)]:
  - frontity@1.10.1

## 1.4.0

### Minor Changes

- [`559b3c5a`](https://github.com/frontity/frontity/commit/559b3c5a261d8a986e91c60b909c532d97f96555) [#507](https://github.com/frontity/frontity/pull/507) - Introduces the `<Link>` component. Theme authors can now use the Link component without having to create one or manually deal with the router.

### Patch Changes

- [`a0cc3e77`](https://github.com/frontity/frontity/commit/a0cc3e778a747b1826c6f106a7845813d69bf591) [#503](https://github.com/frontity/frontity/pull/503) Thanks [@goiblas](https://github.com/goiblas)! - Filter the `when` prop from the Switch component children.

- Updated dependencies [[`322d22ec`](https://github.com/frontity/frontity/commit/322d22ecb825d510296243736a79e4208023477f), [`f5bf7b1c`](https://github.com/frontity/frontity/commit/f5bf7b1cee2850445fe5304e1b39e20e786e9377)]:
  - frontity@1.10.0

## 1.3.3

### Patch Changes

- [`cfa8062d`](https://github.com/frontity/frontity/commit/cfa8062d60ccf46b3e0c5aa5490e4e03f1b693a5) [#480](https://github.com/frontity/frontity/pull/480) Thanks [@juanmaguitar](https://github.com/juanmaguitar)! - Removed unneeded dependency.

* [`845de536`](https://github.com/frontity/frontity/commit/845de536d111105dd3f636c3543170a676ac65cc) [#485](https://github.com/frontity/frontity/pull/485) Thanks [@juanmaguitar](https://github.com/juanmaguitar)! - README.md created.

* Updated dependencies [[`fc1220b5`](https://github.com/frontity/frontity/commit/fc1220b5eb2ae0af933b76cc9fb1a62b83fc7075), [`ba13f70a`](https://github.com/frontity/frontity/commit/ba13f70ae2a4360ca21c77aed1c920c02e9d45b8), [`62fce1e5`](https://github.com/frontity/frontity/commit/62fce1e5c117faeb5902dc0ddae3b13d95cd925b)]:
  - @frontity/hooks@2.0.2
  - frontity@1.9.0

## 1.3.2

### Patch Changes

- Updated dependencies [[`8a0bb8f0`](https://github.com/frontity/frontity/commit/8a0bb8f03ad70ac6b92be14c2c95dcad2b3ccf75), [`661ac083`](https://github.com/frontity/frontity/commit/661ac08316f44172166e79b05b47f0c15a837a9a), [`75343be3`](https://github.com/frontity/frontity/commit/75343be3154dda5b587a3065b225161af96f0488)]:
  - @frontity/hooks@2.0.0
  - frontity@1.7.0

## 1.3.1

### Patch Changes

- Updated dependencies [[`7854971e`](https://github.com/frontity/frontity/commit/7854971eaefa665dc5d77b0b91129c1495b0dab4), [`43cf2305`](https://github.com/frontity/frontity/commit/43cf230526ed810c3778c830e41eb26ef2c53bc3)]:
  - frontity@1.5.3
  - @frontity/error@0.1.0

## 1.3.0

### Minor Changes

- [`7d07748e`](https://github.com/frontity/frontity/commit/7d07748e3b19c6c4599116e95fa91a472f9e3aa3) [#318](https://github.com/frontity/frontity/pull/318) Thanks [@iamuchejude](https://github.com/iamuchejude)! - Add a `<Switch>` component for conditional rendering.

### Patch Changes

- Updated dependencies [[`b3225692`](https://github.com/frontity/frontity/commit/b32256929351b66647f64900cc59862ee7c702a7), [`b3225692`](https://github.com/frontity/frontity/commit/b32256929351b66647f64900cc59862ee7c702a7), [`f7418071`](https://github.com/frontity/frontity/commit/f741807197c4cda5df2e43f5496a121428d309bf)]:
  - frontity@1.5.2

## 1.2.0

### Minor Changes

- [`5431499d`](https://github.com/frontity/frontity/commit/5431499db510997374d4459ae5675c845fa90f0c) [#280](https://github.com/frontity/frontity/pull/280) Thanks [@iamuchejude](https://github.com/iamuchejude)! - Add iframe processor and component to lazy load the iframes. It supports
  native lazy loading and fallbacks to the Intersection Observer.

- [`ece68296`](https://github.com/frontity/frontity/commit/ece68296d4fa68d63d10bdfa528da83f826e7f18) [#256](https://github.com/frontity/frontity/pull/256) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Use the recommended react-intersection-observer in the <Image/> component in @frontity/components.

* [`aaed99f5`](https://github.com/frontity/frontity/commit/aaed99f56d02e96b6713d901e06bcfd631b6c92c) [#266](https://github.com/frontity/frontity/pull/266) Thanks [@iamuchejude](https://github.com/iamuchejude)! - Create script component for processor.

### Patch Changes

- Updated dependencies [[`417f2b0f`](https://github.com/frontity/frontity/commit/417f2b0f0b6f5626be253eb3f1be2daf257b71ef), [`495771f8`](https://github.com/frontity/frontity/commit/495771f83951f192f92d3162221cedc9b791e399), [`80c1aa3a`](https://github.com/frontity/frontity/commit/80c1aa3aee6cf04f46d6fa1a409abfcae2c511cc)]:
  - frontity@1.5.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.1.15](https://github.com/frontity/frontity/compare/@frontity/components@1.1.14...@frontity/components@1.1.15) (2019-12-10)

**Note:** Version bump only for package @frontity/components

## [1.1.14](https://github.com/frontity/frontity/compare/@frontity/components@1.1.13...@frontity/components@1.1.14) (2019-11-04)

**Note:** Version bump only for package @frontity/components

## [1.1.13](https://github.com/frontity/frontity/compare/@frontity/components@1.1.12...@frontity/components@1.1.13) (2019-10-10)

**Note:** Version bump only for package @frontity/components

## [1.1.12](https://github.com/frontity/frontity/compare/@frontity/components@1.1.11...@frontity/components@1.1.12) (2019-10-02)

### Bug Fixes

- **image:** add height prop and set loading=auto if no height is present ([9870414](https://github.com/frontity/frontity/commit/9870414))
- **typescript:** update to latest version ([a89b11c](https://github.com/frontity/frontity/commit/a89b11c))

## [1.1.11](https://github.com/frontity/frontity/compare/@frontity/components@1.1.10...@frontity/components@1.1.11) (2019-09-10)

### Bug Fixes

- **core:** remove componentWillMount warning with react-helmet-async ([0ea885b](https://github.com/frontity/frontity/commit/0ea885b))

## [1.1.10](https://github.com/frontity/frontity/compare/@frontity/components@1.1.9...@frontity/components@1.1.10) (2019-08-14)

### Bug Fixes

- **components:** set Image loading attribute to lazy by default ([822b1e1](https://github.com/frontity/frontity/commit/822b1e1))

## [1.1.9](https://github.com/frontity/frontity/compare/@frontity/components@1.1.8...@frontity/components@1.1.9) (2019-08-12)

### Bug Fixes

- **components:** fixes image component ([#171](https://github.com/frontity/frontity/issues/171)) ([566b8f9](https://github.com/frontity/frontity/commit/566b8f9))

## [1.1.8](https://github.com/frontity/frontity/compare/@frontity/components@1.1.7...@frontity/components@1.1.8) (2019-07-12)

**Note:** Version bump only for package @frontity/components

## [1.1.7](https://github.com/frontity/frontity/compare/@frontity/components@1.1.6...@frontity/components@1.1.7) (2019-07-04)

**Note:** Version bump only for package @frontity/components

## [1.1.6](https://github.com/frontity/frontity/compare/@frontity/components@1.1.5...@frontity/components@1.1.6) (2019-07-04)

**Note:** Version bump only for package @frontity/components

## [1.1.5](https://github.com/frontity/frontity/compare/@frontity/components@1.1.4...@frontity/components@1.1.5) (2019-07-01)

### Bug Fixes

- **components:** add rootMargin to <Image> component and pass it to useInView ([#142](https://github.com/frontity/frontity/issues/142)) ([73103bb](https://github.com/frontity/frontity/commit/73103bb))

## [1.1.4](https://github.com/frontity/frontity/compare/@frontity/components@1.1.3...@frontity/components@1.1.4) (2019-06-20)

**Note:** Version bump only for package @frontity/components

## [1.1.3](https://github.com/frontity/frontity/compare/@frontity/components@1.1.2...@frontity/components@1.1.3) (2019-06-20)

**Note:** Version bump only for package @frontity/components

## [1.1.2](https://github.com/frontity/frontity/compare/@frontity/components@1.1.1...@frontity/components@1.1.2) (2019-06-20)

**Note:** Version bump only for package @frontity/components

## [1.1.1](https://github.com/frontity/frontity/compare/@frontity/components@1.1.0...@frontity/components@1.1.1) (2019-06-19)

**Note:** Version bump only for package @frontity/components

# 1.1.0 (2019-06-19)

### Features

- **packages:** creates packages @frontity/components, @frontity/hooks, and adds image processor to @frontity/html2react ([#130](https://github.com/frontity/frontity/issues/130)) ([6af4aa1](https://github.com/frontity/frontity/commit/6af4aa1))
