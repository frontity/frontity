# Change Log

## 1.7.0

### Minor Changes

- [`3ced7fdf`](https://github.com/frontity/frontity/commit/3ced7fdfd93004c210bb47692ffae265874828e7) [#670](https://github.com/frontity/frontity/pull/670) Thanks [@nicholasio](https://github.com/nicholasio)! - Update react imports in all packages (including themes) to removed unnecessary React Imports

### Patch Changes

- [`01880c34`](https://github.com/frontity/frontity/commit/01880c34c111f55c23169adb7365ea9262e6cca8) [#666](https://github.com/frontity/frontity/pull/666) Thanks [@cristianbote](https://github.com/cristianbote)! - Adopt the new version of emotion 11. That means using the emotion deidcated babel plugin for rewriting the imports, generating source-maps and enable auto labels.

* [`b288143b`](https://github.com/frontity/frontity/commit/b288143be0ad332c0bbd006e1da344c142635aee) [#625](https://github.com/frontity/frontity/pull/625) Thanks [@nicholasio](https://github.com/nicholasio)! - Fix: takes the `match` property into account when replacing internal links.

  See [Bug Report](https://community.frontity.org/t/client-routing-for-internal-content-links/887/10).

- [`5f329dab`](https://github.com/frontity/frontity/commit/5f329dabe9d67d0b3664938865491674ef798433) [#655](https://github.com/frontity/frontity/pull/655) Thanks [@mburridge](https://github.com/mburridge)! - Fix broken links in README files.

* [`e94c0daa`](https://github.com/frontity/frontity/commit/e94c0daa5fa561384f4593939f25141e7bb0ada2) [#669](https://github.com/frontity/frontity/pull/669) Thanks [@nicholasio](https://github.com/nicholasio)! - Fix a bug where the Link component would try to fetch mailto:, tel: and sms: links

* Updated dependencies [[`a5520f56`](https://github.com/frontity/frontity/commit/a5520f5605cfda2323e0c9ea4a553658a021fd15), [`01880c34`](https://github.com/frontity/frontity/commit/01880c34c111f55c23169adb7365ea9262e6cca8), [`3ced7fdf`](https://github.com/frontity/frontity/commit/3ced7fdfd93004c210bb47692ffae265874828e7), [`898cde32`](https://github.com/frontity/frontity/commit/898cde32b78992807fa0c7ffb76cd32c5545a6ad), [`5f329dab`](https://github.com/frontity/frontity/commit/5f329dabe9d67d0b3664938865491674ef798433), [`09f07484`](https://github.com/frontity/frontity/commit/09f07484c920e99d46290986d7a64b8f3c20e53c), [`e4221d4b`](https://github.com/frontity/frontity/commit/e4221d4b451268b5c951197a08b4021d50394c1b), [`9346f560`](https://github.com/frontity/frontity/commit/9346f560c4806483b914aa3fb7a37e373f48f712), [`5f329dab`](https://github.com/frontity/frontity/commit/5f329dabe9d67d0b3664938865491674ef798433), [`c5b0b8f7`](https://github.com/frontity/frontity/commit/c5b0b8f7e5ebfdf02f40ded7d7347a1d28039c2d), [`4f4b7f81`](https://github.com/frontity/frontity/commit/4f4b7f81d8eacb19e3d06eba72dcc199f556d7e4)]:
  - frontity@1.14.0
  - @frontity/hooks@2.1.0
  - @frontity/source@1.5.0
  - @frontity/router@1.1.3

## 1.6.0

### Minor Changes

- [`54c588a9`](https://github.com/frontity/frontity/commit/54c588a9534d7c1761c0def8c83381696fd443fc) [#520](https://github.com/frontity/frontity/pull/520) Thanks [@nicholasio](https://github.com/nicholasio)! - Introduces a `replaceSourceUrls` prop to the `Link` component and `link` processor that replaces all anchor tags with the `Link` component to make internal links work.

  https://community.frontity.org/t/client-routing-for-internal-content-links/887

### Patch Changes

- Updated dependencies [[`362b02f1`](https://github.com/frontity/frontity/commit/362b02f1beb100ffb178a1d4e775e89b84b99ccc), [`362b02f1`](https://github.com/frontity/frontity/commit/362b02f1beb100ffb178a1d4e775e89b84b99ccc), [`362b02f1`](https://github.com/frontity/frontity/commit/362b02f1beb100ffb178a1d4e775e89b84b99ccc), [`3dfa3c48`](https://github.com/frontity/frontity/commit/3dfa3c4809d3b00528db8c1c8c530cf311901553), [`6b4bf82b`](https://github.com/frontity/frontity/commit/6b4bf82b5eee698f7ea8ea3b0bfd69a989caaba3), [`44f44e3f`](https://github.com/frontity/frontity/commit/44f44e3f2ba436236b65518ddac30cd4af57ea18), [`3dfa3c48`](https://github.com/frontity/frontity/commit/3dfa3c4809d3b00528db8c1c8c530cf311901553)]:
  - @frontity/source@1.4.0
  - frontity@1.13.0
  - @frontity/router@1.1.2

## 1.5.1

### Patch Changes

- [`882450a9`](https://github.com/frontity/frontity/commit/882450a95ac88855384909d2476404fd93bc1b11) [#593](https://github.com/frontity/frontity/pull/593) Thanks [@DAreRodz](https://github.com/DAreRodz)! - Fix an error that happens when an inline script evaluation returns a value.

  See [#592](https://github.com/frontity/frontity/issues/592).

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
