# @frontity/analytics

## 1.3.1

### Patch Changes

- [`b41175d0`](https://github.com/frontity/frontity/commit/b41175d0f5df9ca95fc449ca1a0eca6649f1bccf) [#683](https://github.com/frontity/frontity/pull/683) Thanks [@cristianbote](https://github.com/cristianbote)! - Reverts the preinstall hook added for development workflows.

- Updated dependencies [[`b41175d0`](https://github.com/frontity/frontity/commit/b41175d0f5df9ca95fc449ca1a0eca6649f1bccf)]:
  - frontity@1.14.1
  - @frontity/router@1.1.4
  - @frontity/source@1.5.1

## 1.3.0

### Minor Changes

- [`3ced7fdf`](https://github.com/frontity/frontity/commit/3ced7fdfd93004c210bb47692ffae265874828e7) [#670](https://github.com/frontity/frontity/pull/670) Thanks [@nicholasio](https://github.com/nicholasio)! - Update react imports in all packages (including themes) to removed unnecessary React Imports

### Patch Changes

- [`5f329dab`](https://github.com/frontity/frontity/commit/5f329dabe9d67d0b3664938865491674ef798433) [#655](https://github.com/frontity/frontity/pull/655) Thanks [@mburridge](https://github.com/mburridge)! - Fix broken links in README files.

- Updated dependencies [[`a5520f56`](https://github.com/frontity/frontity/commit/a5520f5605cfda2323e0c9ea4a553658a021fd15), [`01880c34`](https://github.com/frontity/frontity/commit/01880c34c111f55c23169adb7365ea9262e6cca8), [`3ced7fdf`](https://github.com/frontity/frontity/commit/3ced7fdfd93004c210bb47692ffae265874828e7), [`898cde32`](https://github.com/frontity/frontity/commit/898cde32b78992807fa0c7ffb76cd32c5545a6ad), [`5f329dab`](https://github.com/frontity/frontity/commit/5f329dabe9d67d0b3664938865491674ef798433), [`09f07484`](https://github.com/frontity/frontity/commit/09f07484c920e99d46290986d7a64b8f3c20e53c), [`e4221d4b`](https://github.com/frontity/frontity/commit/e4221d4b451268b5c951197a08b4021d50394c1b), [`9346f560`](https://github.com/frontity/frontity/commit/9346f560c4806483b914aa3fb7a37e373f48f712), [`5f329dab`](https://github.com/frontity/frontity/commit/5f329dabe9d67d0b3664938865491674ef798433), [`c5b0b8f7`](https://github.com/frontity/frontity/commit/c5b0b8f7e5ebfdf02f40ded7d7347a1d28039c2d), [`4f4b7f81`](https://github.com/frontity/frontity/commit/4f4b7f81d8eacb19e3d06eba72dcc199f556d7e4)]:
  - frontity@1.14.0
  - @frontity/source@1.5.0
  - @frontity/router@1.1.3

## 1.2.1

### Patch Changes

- [`44f44e3f`](https://github.com/frontity/frontity/commit/44f44e3f2ba436236b65518ddac30cd4af57ea18) [#590](https://github.com/frontity/frontity/pull/590) Thanks [@luisherranz](https://github.com/luisherranz)! - Update TypeScript definitions.

- Updated dependencies [[`362b02f1`](https://github.com/frontity/frontity/commit/362b02f1beb100ffb178a1d4e775e89b84b99ccc), [`362b02f1`](https://github.com/frontity/frontity/commit/362b02f1beb100ffb178a1d4e775e89b84b99ccc), [`362b02f1`](https://github.com/frontity/frontity/commit/362b02f1beb100ffb178a1d4e775e89b84b99ccc), [`3dfa3c48`](https://github.com/frontity/frontity/commit/3dfa3c4809d3b00528db8c1c8c530cf311901553), [`6b4bf82b`](https://github.com/frontity/frontity/commit/6b4bf82b5eee698f7ea8ea3b0bfd69a989caaba3), [`44f44e3f`](https://github.com/frontity/frontity/commit/44f44e3f2ba436236b65518ddac30cd4af57ea18), [`3dfa3c48`](https://github.com/frontity/frontity/commit/3dfa3c4809d3b00528db8c1c8c530cf311901553)]:
  - @frontity/source@1.4.0
  - frontity@1.13.0
  - @frontity/router@1.1.2

## 1.2.0

### Minor Changes

- [`2fb73fc7`](https://github.com/frontity/frontity/commit/2fb73fc798653803a21f9e9bd7f21355f7675e55) [#472](https://github.com/frontity/frontity/pull/472) Thanks [@DAreRodz](https://github.com/DAreRodz)! - Release the first stable version of @frontity/analytics library ([Feature Discussion](https://community.frontity.org/t/the-analytics-library/1103)).

  The main differences with the previous version are:

  - In `state.analytics`, the `namespace` array is replaced by two objects that will contain the namespaces with a boolean value: `pageviews` and `events`. This allow users to have more control over which analytics packages should send pageviews or events, and it can also be configured in `frontity.settings.js`.

  - In `actions.analytics`, the `sendPageview` and `sendEvent` actions are renamed to `pageview` and `event` respectively.

  - Pageview `page` property is now `link`.

  - Event `event` property is now `name`.

### Patch Changes

- Updated dependencies [[`322d22ec`](https://github.com/frontity/frontity/commit/322d22ecb825d510296243736a79e4208023477f), [`f5bf7b1c`](https://github.com/frontity/frontity/commit/f5bf7b1cee2850445fe5304e1b39e20e786e9377)]:
  - frontity@1.10.0

## 1.1.1

### Patch Changes

- [`3e2c355a`](https://github.com/frontity/frontity/commit/3e2c355a7530a2cda7ad74e0410389690ea57012) [#471](https://github.com/frontity/frontity/pull/471) Thanks [@DAreRodz](https://github.com/DAreRodz)! - Fix a bug that was causing pageviews not to be sent if the previous page has the same title.

* [`4879e0e7`](https://github.com/frontity/frontity/commit/4879e0e7b9069c0fe2a93e02281704683616ae17) [#489](https://github.com/frontity/frontity/pull/489) Thanks [@juanmaguitar](https://github.com/juanmaguitar)! - README updated.

* Updated dependencies [[`ba13f70a`](https://github.com/frontity/frontity/commit/ba13f70ae2a4360ca21c77aed1c920c02e9d45b8), [`62fce1e5`](https://github.com/frontity/frontity/commit/62fce1e5c117faeb5902dc0ddae3b13d95cd925b), [`3f61f711`](https://github.com/frontity/frontity/commit/3f61f71197d33b478427d1b74882c31258861e92), [`868c120f`](https://github.com/frontity/frontity/commit/868c120f2ede7a2f9013f6e659e1b0a1bf2785fe)]:
  - frontity@1.9.0
  - @frontity/source@1.2.2
  - @frontity/router@1.1.1

## 1.1.0

### Minor Changes

- [`72c33fbd`](https://github.com/frontity/frontity/commit/72c33fbde5d60de33e7f5c25f081ffd458d15f63) [#451](https://github.com/frontity/frontity/pull/451) Thanks [@juanmaguitar](https://github.com/juanmaguitar)! - README.md updated or added

### Patch Changes

- [`24a20ee1`](https://github.com/frontity/frontity/commit/24a20ee15e65d56f88daac4dd49372072bdd10c6) [#416](https://github.com/frontity/frontity/pull/416) Thanks [@iamuchejude](https://github.com/iamuchejude)! - Send event only if the sendEvent() method is available

- Updated dependencies [[`6900916a`](https://github.com/frontity/frontity/commit/6900916ace309d3cc55b9c732124df5d3db96838)]:
  - frontity@1.8.0

## 1.0.0

### Major Changes

- [`bc43519c`](https://github.com/frontity/frontity/commit/bc43519cb2eb2d416a59a37b245ce4741a30641e) [#267](https://github.com/frontity/frontity/pull/267) Thanks [@DAreRodz](https://github.com/DAreRodz)! - Release first version of @frontity/analytics library.

### Patch Changes

- [`6566d8e7`](https://github.com/frontity/frontity/commit/6566d8e70ae5801168a09008a8b341613a774f34) [#308](https://github.com/frontity/frontity/pull/308) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Update outdated TS types and correct the outdated import paths
- Updated dependencies [[`417f2b0f`](https://github.com/frontity/frontity/commit/417f2b0f0b6f5626be253eb3f1be2daf257b71ef), [`495771f8`](https://github.com/frontity/frontity/commit/495771f83951f192f92d3162221cedc9b791e399), [`80c1aa3a`](https://github.com/frontity/frontity/commit/80c1aa3aee6cf04f46d6fa1a409abfcae2c511cc)]:
  - frontity@1.5.0

## 1.0.0-beta.0

### Major Changes

- [`bc43519`](https://github.com/frontity/frontity/commit/bc43519cb2eb2d416a59a37b245ce4741a30641e) [#267](https://github.com/frontity/frontity/pull/267) Thanks [@DAreRodz](https://github.com/DAreRodz)! - Release first version of @frontity/analytics library.
