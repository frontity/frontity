# Change Log

## 1.3.5

### Patch Changes

- [`c062b39c`](https://github.com/frontity/frontity/commit/c062b39c9091ba40edc56e00a8c92cdd542ad9a5) [#530](https://github.com/frontity/frontity/pull/530) Thanks [@orballo](https://github.com/orballo)! - Fixes html2react parser support for some SVG attributes that contain dashes and colons

## 1.3.4

### Patch Changes

- [`19912053`](https://github.com/frontity/frontity/commit/1991205379a103bc4ec09397cca99c1f2ba09a2d) [#486](https://github.com/frontity/frontity/pull/486) Thanks [@juanmaguitar](https://github.com/juanmaguitar)! - README.md added.

- Updated dependencies [[`cfa8062d`](https://github.com/frontity/frontity/commit/cfa8062d60ccf46b3e0c5aa5490e4e03f1b693a5), [`ba13f70a`](https://github.com/frontity/frontity/commit/ba13f70ae2a4360ca21c77aed1c920c02e9d45b8), [`845de536`](https://github.com/frontity/frontity/commit/845de536d111105dd3f636c3543170a676ac65cc), [`62fce1e5`](https://github.com/frontity/frontity/commit/62fce1e5c117faeb5902dc0ddae3b13d95cd925b)]:
  - @frontity/components@1.3.3
  - frontity@1.9.0

## 1.3.3

### Patch Changes

- [`e9cff121`](https://github.com/frontity/frontity/commit/e9cff1218289a2c84a38ae4c575db381627c86bc) [#437](https://github.com/frontity/frontity/pull/437) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Add support for processing `<script>` tags with `type=module`.
- Updated dependencies [[`996865a2`](https://github.com/frontity/frontity/commit/996865a27690d5b89d2ef110f5b1bf3fb91da6f5), [`661ac083`](https://github.com/frontity/frontity/commit/661ac08316f44172166e79b05b47f0c15a837a9a), [`75343be3`](https://github.com/frontity/frontity/commit/75343be3154dda5b587a3065b225161af96f0488)]:
  - @frontity/connect@1.1.0
  - frontity@1.7.0
  - @frontity/components@1.3.2

## 1.3.2

### Patch Changes

- [`4dc3ccd8`](https://github.com/frontity/frontity/commit/4dc3ccd8b27a70632bc79ab593fdd8a2768ae316) [#370](https://github.com/frontity/frontity/pull/370) Thanks [@DAreRodz](https://github.com/DAreRodz)! - Change the TypeScript API to define processors, allowing to pass an Element definition instead of just the element's props definition.
- Updated dependencies [[`34b37ec8`](https://github.com/frontity/frontity/commit/34b37ec84bc4c387754f241ea56fd5eb8b13b14d), [`7854971e`](https://github.com/frontity/frontity/commit/7854971eaefa665dc5d77b0b91129c1495b0dab4)]:
  - @frontity/connect@1.0.5
  - frontity@1.5.3
  - @frontity/components@1.3.1

## 1.3.1

### Patch Changes

- [`06985b1a`](https://github.com/frontity/frontity/commit/06985b1a908b91086172aa0253ac41b5b8057be1) [#336](https://github.com/frontity/frontity/pull/336) Thanks [@luisherranz](https://github.com/luisherranz)! - Add deprecation warning for `process` in processors. Apart from that, types don't need to be backward compatible because they don't cause errors in Frontity, so I have removed all the old types.

## 1.3.0

### Minor Changes

- [`9cfc178d`](https://github.com/frontity/frontity/commit/9cfc178dc1fb67381607ca67756d629f311bb9f9) [#327](https://github.com/frontity/frontity/pull/327) Thanks [@DAreRodz](https://github.com/DAreRodz)! - Add the possibility to access state and libraries at the processors so users can use settings or functionalities stored there.

### Patch Changes

- Updated dependencies [[`b3225692`](https://github.com/frontity/frontity/commit/b32256929351b66647f64900cc59862ee7c702a7), [`b3225692`](https://github.com/frontity/frontity/commit/b32256929351b66647f64900cc59862ee7c702a7), [`f7418071`](https://github.com/frontity/frontity/commit/f741807197c4cda5df2e43f5496a121428d309bf), [`7d07748e`](https://github.com/frontity/frontity/commit/7d07748e3b19c6c4599116e95fa91a472f9e3aa3)]:
  - frontity@1.5.2
  - @frontity/components@1.3.0

## 1.2.0

### Minor Changes

- [`5431499d`](https://github.com/frontity/frontity/commit/5431499db510997374d4459ae5675c845fa90f0c) [#280](https://github.com/frontity/frontity/pull/280) Thanks [@iamuchejude](https://github.com/iamuchejude)! - Add iframe processor and component to lazy load the iframes. It supports
  native lazy loading and fallbacks to the Intersection Observer.

- [`4c89da89`](https://github.com/frontity/frontity/commit/4c89da8968533a3a340b5b5981108c092a743fb2) [#305](https://github.com/frontity/frontity/pull/305) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - - Decode all the HTML attributes that are strings.
  - Map correctly from some HTML attributes to their corresponding React props.

### Patch Changes

- [`495771f8`](https://github.com/frontity/frontity/commit/495771f83951f192f92d3162221cedc9b791e399) [#302](https://github.com/frontity/frontity/pull/302) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Add a new `decode` function to 'frontity', which unescapes the HTML.

  This replaces the `decode` function previously in `html2react`.

  This is necessary because some of the content fro WP API can come as escaped HTML entities and we want to render it straight into react components.

- [`f9059f3e`](https://github.com/frontity/frontity/commit/f9059f3e41e6d600b6bfee1e0220b25f5efda039) [#266](https://github.com/frontity/frontity/pull/266) Thanks [@iamuchejude](https://github.com/iamuchejude)! - Fix execution of scripts tags e.g in embedded blocks.
- Updated dependencies [[`5431499d`](https://github.com/frontity/frontity/commit/5431499db510997374d4459ae5675c845fa90f0c), [`417f2b0f`](https://github.com/frontity/frontity/commit/417f2b0f0b6f5626be253eb3f1be2daf257b71ef), [`495771f8`](https://github.com/frontity/frontity/commit/495771f83951f192f92d3162221cedc9b791e399), [`ece68296`](https://github.com/frontity/frontity/commit/ece68296d4fa68d63d10bdfa528da83f826e7f18), [`696dec11`](https://github.com/frontity/frontity/commit/696dec11bb8d32f0821cca3f5ce39e27c42d60b6), [`aaed99f5`](https://github.com/frontity/frontity/commit/aaed99f56d02e96b6713d901e06bcfd631b6c92c), [`80c1aa3a`](https://github.com/frontity/frontity/commit/80c1aa3aee6cf04f46d6fa1a409abfcae2c511cc)]:
  - @frontity/components@1.2.0
  - frontity@1.5.0
  - @frontity/connect@1.0.4

## [1.1.15](https://github.com/frontity/frontity/compare/@frontity/html2react@1.1.14...@frontity/html2react@1.1.15) (2019-12-10)

**Note:** Version bump only for package @frontity/html2react

## [1.1.14](https://github.com/frontity/frontity/compare/@frontity/html2react@1.1.13...@frontity/html2react@1.1.14) (2019-11-04)

**Note:** Version bump only for package @frontity/html2react

## [1.1.13](https://github.com/frontity/frontity/compare/@frontity/html2react@1.1.12...@frontity/html2react@1.1.13) (2019-10-10)

**Note:** Version bump only for package @frontity/html2react

## [1.1.12](https://github.com/frontity/frontity/compare/@frontity/html2react@1.1.11...@frontity/html2react@1.1.12) (2019-10-02)

**Note:** Version bump only for package @frontity/html2react

## [1.1.11](https://github.com/frontity/frontity/compare/@frontity/html2react@1.1.10...@frontity/html2react@1.1.11) (2019-09-10)

**Note:** Version bump only for package @frontity/html2react

## [1.1.10](https://github.com/frontity/frontity/compare/@frontity/html2react@1.1.9...@frontity/html2react@1.1.10) (2019-08-14)

**Note:** Version bump only for package @frontity/html2react

## [1.1.9](https://github.com/frontity/frontity/compare/@frontity/html2react@1.1.8...@frontity/html2react@1.1.9) (2019-08-12)

**Note:** Version bump only for package @frontity/html2react

## [1.1.8](https://github.com/frontity/frontity/compare/@frontity/html2react@1.1.7...@frontity/html2react@1.1.8) (2019-07-12)

**Note:** Version bump only for package @frontity/html2react

## [1.1.7](https://github.com/frontity/frontity/compare/@frontity/html2react@1.1.6...@frontity/html2react@1.1.7) (2019-07-04)

**Note:** Version bump only for package @frontity/html2react

## [1.1.6](https://github.com/frontity/frontity/compare/@frontity/html2react@1.1.5...@frontity/html2react@1.1.6) (2019-07-04)

**Note:** Version bump only for package @frontity/html2react

## [1.1.5](https://github.com/frontity/frontity/compare/@frontity/html2react@1.1.4...@frontity/html2react@1.1.5) (2019-07-01)

**Note:** Version bump only for package @frontity/html2react

## [1.1.4](https://github.com/frontity/frontity/compare/@frontity/html2react@1.1.3...@frontity/html2react@1.1.4) (2019-06-20)

**Note:** Version bump only for package @frontity/html2react

## [1.1.3](https://github.com/frontity/frontity/compare/@frontity/html2react@1.1.2...@frontity/html2react@1.1.3) (2019-06-20)

**Note:** Version bump only for package @frontity/html2react

## [1.1.2](https://github.com/frontity/frontity/compare/@frontity/html2react@1.1.1...@frontity/html2react@1.1.2) (2019-06-20)

**Note:** Version bump only for package @frontity/html2react

## [1.1.1](https://github.com/frontity/frontity/compare/@frontity/html2react@1.1.0...@frontity/html2react@1.1.1) (2019-06-19)

**Note:** Version bump only for package @frontity/html2react

# 1.1.0 (2019-06-19)

### Features

- **html2react:** first implementation of Html2React ([#116](https://github.com/frontity/frontity/issues/116)) ([aa2b6f6](https://github.com/frontity/frontity/commit/aa2b6f6))
- **packages:** creates packages @frontity/components, @frontity/hooks, and adds image processor to @frontity/html2react ([#130](https://github.com/frontity/frontity/issues/130)) ([6af4aa1](https://github.com/frontity/frontity/commit/6af4aa1))
