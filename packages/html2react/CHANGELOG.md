# Change Log

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
