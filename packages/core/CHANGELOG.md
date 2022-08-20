# Change Log

## 1.16.0

### Minor Changes

- [`0981b14b`](https://github.com/frontity/frontity/commit/0981b14b4a86380122ba717896f33b23fde55b88) [#916](https://github.com/frontity/frontity/pull/916) Thanks [@orballo](https://github.com/orballo)! - Adds server extensibility to Frontity packages.

## 1.15.1

### Patch Changes

- [`8bc33732`](https://github.com/frontity/frontity/commit/8bc33732beb036506de57a9288d330274b2f84d2) [#909](https://github.com/frontity/frontity/pull/909) Thanks [@luisherranz](https://github.com/luisherranz)! - Fix public path of assets (fonts, images...) during server-side rendering.

## 1.15.0

### Minor Changes

- [`d67e74a7`](https://github.com/frontity/frontity/commit/d67e74a764b39a9c48203ae4d7dff140dbe120dc) [#890](https://github.com/frontity/frontity/pull/890) Thanks [@orballo](https://github.com/orballo)! - Add support for dynamic `publicPath` configuration via `state.frontity.options.publicPath` (in `frontity.settings.js`) or the `?frontity_public_path=/your-path` query option.

## 1.14.3

### Patch Changes

- [`e5ca6cd7`](https://github.com/frontity/frontity/commit/e5ca6cd7d1c3562c04ff6371fb895be1a3558cff) [#850](https://github.com/frontity/frontity/pull/850) Thanks [@luisherranz](https://github.com/luisherranz)! - Fix problem with CDNs that return the same HTML response for URLs with same queries in different order.

## 1.14.2

### Patch Changes

- [`a154a9cb`](https://github.com/frontity/frontity/commit/a154a9cb7093ab0199c01f28b6363f93427abb17) [#840](https://github.com/frontity/frontity/pull/840) Thanks [@luisherranz](https://github.com/luisherranz)! - Fix Webpack/TS-Node excludes not working on Windows.

* [`63154b4f`](https://github.com/frontity/frontity/commit/63154b4fb16095ccf22e4862c6d91c9c6157af67) [#837](https://github.com/frontity/frontity/pull/837) Thanks [@luisherranz](https://github.com/luisherranz)! - Fix transpilation of `frontity.config.js` files in external packages.

- [`31cf53f0`](https://github.com/frontity/frontity/commit/31cf53f02128b19995ea3eed6f6f75ef936210a5) [#843](https://github.com/frontity/frontity/pull/843) Thanks [@DAreRodz](https://github.com/DAreRodz)! - Refactor `createSymlinks` to use a custom implementation of `fs-extra`'s `readFile` function.

## 1.14.1

### Patch Changes

- [`6c27804f`](https://github.com/frontity/frontity/commit/6c27804f096ded67b3926afc9b974fcbb548c978) Thanks [@luisherranz](https://github.com/luisherranz)! - Fix a problem that prevented Frontity packages containing "webpack" in the name from being transpiled.

## 1.14.0

### Minor Changes

- [`e7997268`](https://github.com/frontity/frontity/commit/e7997268bc7dd076daeca04951bbb1bc7e778183) [#812](https://github.com/frontity/frontity/pull/812) Thanks [@cristianbote](https://github.com/cristianbote)! - Introduce the possibility to customize Webpack, Babel, and the build directory with a `frontity.config.js` file.

## 1.13.0

### Minor Changes

- [`8d6dbd5e`](https://github.com/frontity/frontity/commit/8d6dbd5e9c2a1703c26786f05e56c50555debe37) [#798](https://github.com/frontity/frontity/pull/798) Thanks [@luisherranz](https://github.com/luisherranz)! - Send a `X-Frontity-Dev` header when Frontity is run in development mode. Useful to know what type of error should be shown in the Embedded mode plugin.

## 1.12.0

### Minor Changes

- [`62e60216`](https://github.com/frontity/frontity/commit/62e60216198111626d82566507f7f208323ffeee) [#774](https://github.com/frontity/frontity/pull/774) Thanks [@DAreRodz](https://github.com/DAreRodz)! - Add an `--analyze` option to the `dev` and `build` commands. The flag should be explicitly set in order to generate HTML files for bundle analysis.

* [`86b2eff9`](https://github.com/frontity/frontity/commit/86b2eff993aac3e9360946a0c190e239b6f93abf) [#783](https://github.com/frontity/frontity/pull/783) Thanks [@luisherranz](https://github.com/luisherranz)! - Add an HMR flag to the Frontity state (`state.frontity.hmr`) that indicates if the code is run on an HMR refresh or not.

### Patch Changes

- [`aaa85073`](https://github.com/frontity/frontity/commit/aaa850731dc4b9defa51618f09a1ebf3427ce83b) [#764](https://github.com/frontity/frontity/pull/764) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Move the call of the afterSSR() actions to before taking the state snapshot. This way any `afterSSR()` action still has an option to modify the snapshot before sending it to the client. This is important for security as we delete the state.source.auth token in that action in wp-source.

* [`89de8177`](https://github.com/frontity/frontity/commit/89de81770279d353f330298f82fe3abc718b5c52) [#777](https://github.com/frontity/frontity/pull/777) Thanks [@cristianbote](https://github.com/cristianbote)! - Due to a recent warning in Chrome for missusing preload instead of modulepreload for module files we need to replace the loadable linkType for assets that have to be preloaded as modules instead.

* Updated dependencies [[`7111b3ce`](https://github.com/frontity/frontity/commit/7111b3cee7065816a885629cac93967f705d0969), [`641a1cf0`](https://github.com/frontity/frontity/commit/641a1cf00a02f78076e23b7918027d7219c08f58)]:
  - @frontity/connect@1.3.0

## 1.11.1

### Patch Changes

- [`4a179f5d`](https://github.com/frontity/frontity/commit/4a179f5d57cbb8c0008779e84db2b28b4017addf) [#738](https://github.com/frontity/frontity/pull/738) Thanks [@luisherranz](https://github.com/luisherranz)! - Update `react-helmet-async` dependency to solve a npm warning.

## 1.11.0

### Minor Changes

- [`3673a228`](https://github.com/frontity/frontity/commit/3673a228c1940f60c1a8ac9e67634a153a373df6) [#687](https://github.com/frontity/frontity/pull/687) Thanks [@cristianbote](https://github.com/cristianbote)! - Expose the render, template and App methods to override the built-in default with user-defined ones.

### Patch Changes

- [`49c0429c`](https://github.com/frontity/frontity/commit/49c0429c3663c5c15e924e1f4724524b647bbfa2) [#729](https://github.com/frontity/frontity/pull/729) Thanks [@cristianbote](https://github.com/cristianbote)! - Downgrade webpack-dev-middleware@3.7.2 which is the last known version that was not slow.

* [`d6421f08`](https://github.com/frontity/frontity/commit/d6421f0859b7e60d1510ae128c290670bab1fc03) [#721](https://github.com/frontity/frontity/pull/721) Thanks [@DAreRodz](https://github.com/DAreRodz)! - Handle the case where the query param `frontity_name` is an array of strings.

- [`63effecb`](https://github.com/frontity/frontity/commit/63effecba99ff861510cfaf3ee0877f544ae6db0) [#725](https://github.com/frontity/frontity/pull/725) Thanks [@cristianbote](https://github.com/cristianbote)! - Expose head and scripts API on frontity namespace for ease of defining custom tags for the html document.

* [`2f7169cb`](https://github.com/frontity/frontity/commit/2f7169cb961ace5196fb6b7067f1f851e43acf2e) [#720](https://github.com/frontity/frontity/pull/720) Thanks [@cristianbote](https://github.com/cristianbote)! - Export CacheProvider from @frontity/core and use it to extract critical css into a custom style tag, needed for the @frontity/amp package.

## 1.10.1

### Patch Changes

- [`b41175d0`](https://github.com/frontity/frontity/commit/b41175d0f5df9ca95fc449ca1a0eca6649f1bccf) [#683](https://github.com/frontity/frontity/pull/683) Thanks [@cristianbote](https://github.com/cristianbote)! - Reverts the preinstall hook added for development workflows.

- Updated dependencies [[`b41175d0`](https://github.com/frontity/frontity/commit/b41175d0f5df9ca95fc449ca1a0eca6649f1bccf)]:
  - @frontity/connect@1.2.1
  - @frontity/file-settings@1.1.8

## 1.10.0

### Minor Changes

- [`01880c34`](https://github.com/frontity/frontity/commit/01880c34c111f55c23169adb7365ea9262e6cca8) [#666](https://github.com/frontity/frontity/pull/666) Thanks [@cristianbote](https://github.com/cristianbote)! - Adopt the new version of emotion 11. That means using the emotion deidcated babel plugin for rewriting the imports, generating source-maps and enable auto labels.

* [`3ced7fdf`](https://github.com/frontity/frontity/commit/3ced7fdfd93004c210bb47692ffae265874828e7) [#670](https://github.com/frontity/frontity/pull/670) Thanks [@nicholasio](https://github.com/nicholasio)! - Update react imports in all packages (including themes) to removed unnecessary React Imports

- [`0b5fff74`](https://github.com/frontity/frontity/commit/0b5fff74b2b04fbf3ebb6c70acb6f39fb8149340) [#672](https://github.com/frontity/frontity/pull/672) Thanks [@cristianbote](https://github.com/cristianbote)! - Add the CORS header and Cache-Control for static files. This will apply only to the files inside the static build folder.

* [`d7fe1f50`](https://github.com/frontity/frontity/commit/d7fe1f507f7ab8d5b4db54a45fc38d37e1022b0e) [#661](https://github.com/frontity/frontity/pull/661) Thanks [@cristianbote](https://github.com/cristianbote)! - Updated React to version 17. This is a major version update that contains and paves the way for the newly added features. Also introduces jsx-runtime. Here's the community link https://community.frontity.org/t/update-to-react-17-and-emotion-11/3225.

- [`cf35baa5`](https://github.com/frontity/frontity/commit/cf35baa5f14f93e8c814cb8bc850f53ee60af547) [#601](https://github.com/frontity/frontity/pull/601) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Add support for 30x Redirections.

  1. Redirections can be stored in the backend server, which will be checked according to different configurations:

     - Each time a link is fetched.
     - When the API returns a 404.
     - When the link belongs to a certain set of URLs (configured using a regexp).

     This configuration is stored in `state.source.redirections`.

     The redirection information will be stored in `state.source.data` similar to what happens for 4xx and 5xx errors.

  2. Redirections can be added to Frontity by populating `state.source.data` directly or using a handler.

  Feature Discussion: https://community.frontity.org/t/301-redirects-stored-in-wordpress-database/3032

### Patch Changes

- [`e4221d4b`](https://github.com/frontity/frontity/commit/e4221d4b451268b5c951197a08b4021d50394c1b) [#640](https://github.com/frontity/frontity/pull/640) Thanks [@luisherranz](https://github.com/luisherranz)! - Update `babel-preset-env` to the latest version and switch to `core-js` v3.

* [`e4221d4b`](https://github.com/frontity/frontity/commit/e4221d4b451268b5c951197a08b4021d50394c1b) [#640](https://github.com/frontity/frontity/pull/640) Thanks [@luisherranz](https://github.com/luisherranz)! - Update dependencies. Some of them to major versions because they dropped support for Node 8, which Frontity doesn't support either anymore.

- [`2de4a3a1`](https://github.com/frontity/frontity/commit/2de4a3a1a17f410c2e8480789aa3c54354a5ffc7) [#674](https://github.com/frontity/frontity/pull/674) Thanks [@luisherranz](https://github.com/luisherranz)! - Update `webpack-dev-middleware` to v4.1 make sure people don't see a bug in the console output.

* [`5f329dab`](https://github.com/frontity/frontity/commit/5f329dabe9d67d0b3664938865491674ef798433) [#655](https://github.com/frontity/frontity/pull/655) Thanks [@mburridge](https://github.com/mburridge)! - Fix broken links in README files.

* Updated dependencies [[`01880c34`](https://github.com/frontity/frontity/commit/01880c34c111f55c23169adb7365ea9262e6cca8), [`3ced7fdf`](https://github.com/frontity/frontity/commit/3ced7fdfd93004c210bb47692ffae265874828e7), [`5f329dab`](https://github.com/frontity/frontity/commit/5f329dabe9d67d0b3664938865491674ef798433)]:
  - @frontity/connect@1.2.0
  - @frontity/file-settings@1.1.7

## 1.9.1

### Patch Changes

- [`e9f7b5c6`](https://github.com/frontity/frontity/commit/e9f7b5c6889fb6dfb68fb15baad77031ffd7c324) [#609](https://github.com/frontity/frontity/pull/609) Thanks [@cristianbote](https://github.com/cristianbote)! - The `serve` command was taking too much to spin the server. That was due to the build and dev scripts which are having side-effects by loading ts-node and other scripts.

- Updated dependencies [[`d7b4b429`](https://github.com/frontity/frontity/commit/d7b4b429f1f23dfae74b9781ea1b1de00aed763c), [`b766e330`](https://github.com/frontity/frontity/commit/b766e330465b6a76d927eaddaa763a684dc1b228)]:
  - @frontity/connect@1.1.4

## 1.9.0

### Minor Changes

- [`e2c193f2`](https://github.com/frontity/frontity/commit/e2c193f2ad8353886a8eb27ea74838383f6d2e4b) [#568](https://github.com/frontity/frontity/pull/568) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Add support for auth headers: https://community.frontity.org/t/support-for-auth-header-in-source-packages/2678/12

  - Use use the URL search param `frontity_name` instead of just `name` for frontity multisite.
  - Remove all querystring parameters that start with `frontity_` from the page querystring and pass them (camelCased) to `state.frontity.options`.

## 1.8.0

### Minor Changes

- [`2a1a1f35`](https://github.com/frontity/frontity/commit/2a1a1f35810337a18edc96c3da06ffd492152ed8) [#550](https://github.com/frontity/frontity/pull/550) Thanks [@luisherranz](https://github.com/luisherranz)! - Expose Webpack errors and warnings in the `npx frontity build` command.

### Patch Changes

- [`611f3e2a`](https://github.com/frontity/frontity/commit/611f3e2ac836033417e9921a44b52cdd2f07793f) [#541](https://github.com/frontity/frontity/pull/541) Thanks [@luisherranz](https://github.com/luisherranz)! - Deprecate the `--publicPath` CLI arg of the `npx frontity dev` and `npx frontity build` commands in favor of `--public-path` to be consistent with the rest of the arguments.

  It also adds a log to those commands, along with the already existing `mode` and `target` logs.

* [`f4f20007`](https://github.com/frontity/frontity/commit/f4f200074dd360fbf6b41dea63c89f9c6938c75d) [#450](https://github.com/frontity/frontity/pull/450) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Remove the unused `minimist` dependency and its types.

- [`94a1c41c`](https://github.com/frontity/frontity/commit/94a1c41cc683675b70fd92e759eb14c7f6daca8a) [#547](https://github.com/frontity/frontity/pull/547) Thanks [@luisherranz](https://github.com/luisherranz)! - Relax `maxEntrypointSize` option of Webpack's performance to:

  - 5Mbs for the server bundle.
  - 500Kbs for the client bundles.

## 1.7.3

### Patch Changes

- [`a0fc05cb`](https://github.com/frontity/frontity/commit/a0fc05cb8d51e4e101994b1b35410d5c2fd16e55) [#525](https://github.com/frontity/frontity/pull/525) Thanks [@luisherranz](https://github.com/luisherranz)! - Fix for package names that start with a number, like `@123/package`.

## 1.7.2

### Patch Changes

- [`322d22ec`](https://github.com/frontity/frontity/commit/322d22ecb825d510296243736a79e4208023477f) [#501](https://github.com/frontity/frontity/pull/501) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Add the tsNode.register for `dev` and `build` scripts which were previously in `frontity`

- Updated dependencies [[`159e02ca`](https://github.com/frontity/frontity/commit/159e02ca080ec9f7004c90276621d1a2708192ce)]:
  - @frontity/connect@1.1.3

## 1.7.1

### Patch Changes

- [`2c9ddab1`](https://github.com/frontity/frontity/commit/2c9ddab1f8962c1860fe206f77d8872808c2c3ef) [#463](https://github.com/frontity/frontity/pull/463) Thanks [@juanmaguitar](https://github.com/juanmaguitar)! - README.md with full info of the package.

* [`aade774f`](https://github.com/frontity/frontity/commit/aade774fba18e8790153e49365790a1c7826a9a5) [#467](https://github.com/frontity/frontity/pull/467) Thanks [@luisherranz](https://github.com/luisherranz)! - Do not allow the new `state.frontity.debug` flag to be `true` in production.

* Updated dependencies [[`ba11bca8`](https://github.com/frontity/frontity/commit/ba11bca879d86493181b35e358ded8c583496641), [`1440cfe7`](https://github.com/frontity/frontity/commit/1440cfe77f1a9154562dff23a97185c77bebb59c), [`b6ada1cc`](https://github.com/frontity/frontity/commit/b6ada1cc7075d32a9ef82d525e251e1554baaba3)]:
  - babel-plugin-frontity@1.0.2
  - @frontity/connect@1.1.2
  - @frontity/file-settings@1.1.6

## 1.7.1-infinite-scroll-beta.0

### Patch Changes

- Updated dependencies []:
  - @frontity/file-settings@1.1.5-infinite-scroll-beta.0

## 1.7.0

### Minor Changes

- [`4212f46a`](https://github.com/frontity/frontity/commit/4212f46a9a655b2c91940135a22f3f0b69715119) [#422](https://github.com/frontity/frontity/pull/422) Thanks [@Koli14](https://github.com/Koli14)! - Optionally, use the content of a robots.txt file if it exists in the root project folder.

### Patch Changes

- [`f13f72bb`](https://github.com/frontity/frontity/commit/f13f72bb19b7d1f379ef21e349e7d6b047ec5098) [#456](https://github.com/frontity/frontity/pull/456) Thanks [@DAreRodz](https://github.com/DAreRodz)! - Replace `lodash-es` by `lodash` library and remove the `lodash` alias to avoid problems with third-party libraries.

  Also, adds `babel-plugin-lodash` to still get tree shaking when importing named exports from `lodash`.

* [`5cb29ab6`](https://github.com/frontity/frontity/commit/5cb29ab63ab31872a4d853e5e2fdbdabca974c9f) [#430](https://github.com/frontity/frontity/pull/430) Thanks [@luisherranz](https://github.com/luisherranz)! - Remove React `Fills` package export. This was meant to be used for the [Slot and Fill](https://community.frontity.org/t/slot-and-fill/895) pattern, but we are going to finally use `state.fills` to add the configuration for the fills and `libraries.fills` to expose the React components.

- [`5ada3cb0`](https://github.com/frontity/frontity/commit/5ada3cb0e44dc869291d5e9fdea67a1ef6bcced8) [#374](https://github.com/frontity/frontity/pull/374) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Try to re-use an already open browser tab when running `frontity dev` on MacOS.

- Updated dependencies [[`5cb29ab6`](https://github.com/frontity/frontity/commit/5cb29ab63ab31872a4d853e5e2fdbdabca974c9f)]:
  - @frontity/connect@1.1.1

## 1.6.1

### Patch Changes

- [`b4b25e43`](https://github.com/frontity/frontity/commit/b4b25e434e5e7c2a96e1fce8c11b0e0dac228295) [#446](https://github.com/frontity/frontity/pull/446) Thanks [@DAreRodz](https://github.com/DAreRodz)! - Fix --publicPath option when its value is a URL with domain specified.

## 1.6.0

### Minor Changes

- [`661ac083`](https://github.com/frontity/frontity/commit/661ac08316f44172166e79b05b47f0c15a837a9a) [#420](https://github.com/frontity/frontity/pull/420) Thanks [@DAreRodz](https://github.com/DAreRodz)! - Add a `--publicPath` option to `build` and `dev` commands and pass it to webpack builds.

### Patch Changes

- Updated dependencies [[`996865a2`](https://github.com/frontity/frontity/commit/996865a27690d5b89d2ef110f5b1bf3fb91da6f5)]:
  - @frontity/connect@1.1.0

## 1.5.3

### Patch Changes

- [`502bc144`](https://github.com/frontity/frontity/commit/502bc144158a1b64971c738dcf93306ad5b61a8f) [#406](https://github.com/frontity/frontity/pull/406) Thanks [@luisherranz](https://github.com/luisherranz)! - Don't embed fonts so big because they have an impact on LightHouse performance score. I have reduced the limit from 25Kbs to 8Kbs, which seems to be the recommendation in Webpack.

* [`7c2a99f9`](https://github.com/frontity/frontity/commit/7c2a99f9be43ad965f4d4b00c81145f21230f63f) [#387](https://github.com/frontity/frontity/pull/387) Thanks [@iamuchejude](https://github.com/iamuchejude)! - Fix yarn symlink bug

## 1.5.2

### Patch Changes

- [`34b37ec8`](https://github.com/frontity/frontity/commit/34b37ec84bc4c387754f241ea56fd5eb8b13b14d) [#360](https://github.com/frontity/frontity/pull/360) Thanks [@luisherranz](https://github.com/luisherranz)! - Move `getSnapshot` from a store property to an import of `"@frontity/connect"`.

* [`ffdebed8`](https://github.com/frontity/frontity/commit/ffdebed862541d39f06305137a5cbcdec8f4ee66) [#357](https://github.com/frontity/frontity/pull/357) Thanks [@luisherranz](https://github.com/luisherranz)! - Fix vulnerability in minimist package.

- [`ac8832b1`](https://github.com/frontity/frontity/commit/ac8832b1be702f8bf4e00a8c9bc4ec3a32a3e236) [#350](https://github.com/frontity/frontity/pull/350) Thanks [@luisherranz](https://github.com/luisherranz)! - Don't catch errors in `npx frontity serve`.
- Updated dependencies [[`34b37ec8`](https://github.com/frontity/frontity/commit/34b37ec84bc4c387754f241ea56fd5eb8b13b14d)]:
  - @frontity/connect@1.0.5

## 1.5.1

### Patch Changes

- [`a6cea54c`](https://github.com/frontity/frontity/commit/a6cea54c577c3bae42576e22c7b6c5a0c29e8846) [#333](https://github.com/frontity/frontity/pull/333) Thanks [@luisherranz](https://github.com/luisherranz)! - Fix some minor Webpack bundling warnings.

* [`96180f92`](https://github.com/frontity/frontity/commit/96180f926130d4d0f986c9095ef44a6c2b9ab907) [#344](https://github.com/frontity/frontity/pull/344) Thanks [@luisherranz](https://github.com/luisherranz)! - Avoid console error when an old tab is opened with localhost and the server is restarted.

- [`b6fab41a`](https://github.com/frontity/frontity/commit/b6fab41ac5abb917fbcfec9a8a06c3f23909d7bc) [#348](https://github.com/frontity/frontity/pull/348) Thanks [@luisherranz](https://github.com/luisherranz)! - `babel-loader` throws an error if the cache identifier is not a string.

## 1.5.0

### Minor Changes

- [`a4e9e579`](https://github.com/frontity/frontity/commit/a4e9e579a6306c87cb91f33e635201387bd405ea) [#309](https://github.com/frontity/frontity/pull/309) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Pass Koa's context to beforeSSR action so packages can modify it.

* [`ed257939`](https://github.com/frontity/frontity/commit/ed257939010b5a1ed79562439fed426843649af5) [#301](https://github.com/frontity/frontity/pull/301) Thanks [@wisammechano](https://github.com/wisammechano)! - babel-plugin-macros was added to babel core configs

### Patch Changes

- [`15a8b582`](https://github.com/frontity/frontity/commit/15a8b582bc38d15f49b80dbbc86884d3ba607c4d) [#299](https://github.com/frontity/frontity/pull/299) Thanks [@DAreRodz](https://github.com/DAreRodz)! - Prevent array elements stored in the state to be duplicated during CSR

* [`495771f8`](https://github.com/frontity/frontity/commit/495771f83951f192f92d3162221cedc9b791e399) [#302](https://github.com/frontity/frontity/pull/302) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Add a new `decode` function to 'frontity', which unescapes the HTML.

  This replaces the `decode` function previously in `html2react`.

  This is necessary because some of the content fro WP API can come as escaped HTML entities and we want to render it straight into react components.- Updated dependencies [[`696dec11`](https://github.com/frontity/frontity/commit/696dec11bb8d32f0821cca3f5ce39e27c42d60b6), [`a4e9e579`](https://github.com/frontity/frontity/commit/a4e9e579a6306c87cb91f33e635201387bd405ea)]:

  - @frontity/connect@1.0.4
  - @frontity/types@1.2.0

## [1.4.1](https://github.com/frontity/frontity/compare/@frontity/core@1.4.0...@frontity/core@1.4.1) (2019-12-10)

### Bug Fixes

- **loadable:** fix secondary chunks ([913d64a](https://github.com/frontity/frontity/commit/913d64a))

# [1.4.0](https://github.com/frontity/frontity/compare/@frontity/core@1.3.0...@frontity/core@1.4.0) (2019-11-04)

### Bug Fixes

- **core:** add labels and source maps ([#227](https://github.com/frontity/frontity/issues/227)) ([d5af653](https://github.com/frontity/frontity/commit/d5af653))
- **emotion:** fix Global css not ending up in head ([e8c3430](https://github.com/frontity/frontity/commit/e8c3430))
- **emotion:** fix Global leak ([baad509](https://github.com/frontity/frontity/commit/baad509))

### Features

- **webpack:** add support for fonts to webpack ([2148823](https://github.com/frontity/frontity/commit/2148823))

# [1.3.0](https://github.com/frontity/frontity/compare/@frontity/core@1.2.1...@frontity/core@1.3.0) (2019-10-02)

### Bug Fixes

- **core:** delete package name from merged store ([7428a90](https://github.com/frontity/frontity/commit/7428a90))
- **typescript:** update to latest version ([a89b11c](https://github.com/frontity/frontity/commit/a89b11c))

### Features

- **cli:** add --dont-open-browser option to dev ([6ae037c](https://github.com/frontity/frontity/commit/6ae037c))

## [1.2.1](https://github.com/frontity/frontity/compare/@frontity/core@1.2.0...@frontity/core@1.2.1) (2019-09-10)

### Bug Fixes

- **core:** remove componentWillMount warning with react-helmet-async ([0ea885b](https://github.com/frontity/frontity/commit/0ea885b))
- **webpack:** add support for images in Windows ([#196](https://github.com/frontity/frontity/issues/196)) ([00aa4e1](https://github.com/frontity/frontity/commit/00aa4e1))

# [1.2.0](https://github.com/frontity/frontity/compare/@frontity/core@1.1.3...@frontity/core@1.2.0) (2019-08-12)

### Features

- **core:** add state.frontity.rendering with either ssr or csr ([707b80f](https://github.com/frontity/frontity/commit/707b80f))
- **core:** make localhost wait for webpack to avoid returning an error ([#174](https://github.com/frontity/frontity/issues/174)) ([51847d2](https://github.com/frontity/frontity/commit/51847d2))
- **frontity:** expose fetch and URL from frontity package ([#168](https://github.com/frontity/frontity/issues/168)) ([235c465](https://github.com/frontity/frontity/commit/235c465))

## [1.1.3](https://github.com/frontity/frontity/compare/@frontity/core@1.1.2...@frontity/core@1.1.3) (2019-07-12)

**Note:** Version bump only for package @frontity/core

## [1.1.2](https://github.com/frontity/frontity/compare/@frontity/core@1.1.1...@frontity/core@1.1.2) (2019-07-01)

### Bug Fixes

- **core:** return 404 if HMR endpoint gets through Webpack to Frontity ([#144](https://github.com/frontity/frontity/issues/144)) ([b86627a](https://github.com/frontity/frontity/commit/b86627a))

## [1.1.1](https://github.com/frontity/frontity/compare/@frontity/core@1.1.0...@frontity/core@1.1.1) (2019-06-19)

### Bug Fixes

- **core:** remove some viewport props in html to improve accessibility ([2962362](https://github.com/frontity/frontity/commit/2962362))

# [1.1.0](https://github.com/frontity/frontity/compare/@frontity/core@1.0.1...@frontity/core@1.1.0) (2019-06-19)

### Bug Fixes

- **connect:** add babel-polyfill to the es5 bundles ([9ee75fb](https://github.com/frontity/frontity/commit/9ee75fb))
- **core:** fix cert import when using https mode ([ea2ad4e](https://github.com/frontity/frontity/commit/ea2ad4e))
- **core:** fixes webpack MultiCompiler types ([ffaf853](https://github.com/frontity/frontity/commit/ffaf853))

### Features

- **core:** add HMR to the Connect store ([bde0186](https://github.com/frontity/frontity/commit/bde0186))
- **core:** open browser in "frontity dev" command ([f81d054](https://github.com/frontity/frontity/commit/f81d054))
- **packages:** creates packages @frontity/components, @frontity/hooks, and adds image processor to @frontity/html2react ([#130](https://github.com/frontity/frontity/issues/130)) ([6af4aa1](https://github.com/frontity/frontity/commit/6af4aa1))
- **webpack:** use raw-loader to import css files ([#133](https://github.com/frontity/frontity/issues/133)) ([5c5f7dd](https://github.com/frontity/frontity/commit/5c5f7dd))

## [1.0.1](https://github.com/frontity/frontity/compare/@frontity/core@1.0.0...@frontity/core@1.0.1) (2019-06-05)

### Bug Fixes

- **all:** update typscript and fix some keywords ([1fe5fec](https://github.com/frontity/frontity/commit/1fe5fec))

# [1.0.0](https://github.com/frontity/frontity/compare/@frontity/core@0.4.1...@frontity/core@1.0.0) (2019-06-05)

### Features

- **core:** merge arrays found in state instead of overwriting them ([#117](https://github.com/frontity/frontity/issues/117)) ([45dcacb](https://github.com/frontity/frontity/commit/45dcacb))
- **core:** refactor entry-points for new modes and files ([#98](https://github.com/frontity/frontity/issues/98)) ([1713522](https://github.com/frontity/frontity/commit/1713522))
- **core:** rename 'initial' to 'initialLink' and convert to a string ([b7bac1e](https://github.com/frontity/frontity/commit/b7bac1e))

### BREAKING CHANGES

- **core:** Arrays found in state are merged instead of overwritten
- **core:** 'initial' is now 'initialLink' and it's an string instead of an object.

## [0.4.1](https://github.com/frontity/frontity/compare/@frontity/core@0.4.0...@frontity/core@0.4.1) (2019-05-29)

### Bug Fixes

- **core:** deep clone state on each SSR to avoid bugs ([#104](https://github.com/frontity/frontity/issues/104)) ([0059eab](https://github.com/frontity/frontity/commit/0059eab)), closes [#101](https://github.com/frontity/frontity/issues/101)

# [0.4.0](https://github.com/frontity/frontity/compare/@frontity/core@0.3.7...@frontity/core@0.4.0) (2019-05-27)

### Features

- **webpack:** add support for images (png, jpg, gif and svg) ([fadbe29](https://github.com/frontity/frontity/commit/fadbe29))

## [0.3.7](https://github.com/frontity/frontity/compare/@frontity/core@0.3.6...@frontity/core@0.3.7) (2019-05-17)

**Note:** Version bump only for package @frontity/core

## [0.3.6](https://github.com/frontity/frontity/compare/@frontity/core@0.3.5...@frontity/core@0.3.6) (2019-05-17)

### Bug Fixes

- **core:** fix wrong public path in scripts ([a1f328b](https://github.com/frontity/frontity/commit/a1f328b))

## [0.3.5](https://github.com/frontity/frontity/compare/@frontity/core@0.3.4...@frontity/core@0.3.5) (2019-05-16)

**Note:** Version bump only for package @frontity/core

## [0.3.4](https://github.com/frontity/frontity/compare/@frontity/core@0.3.3...@frontity/core@0.3.4) (2019-05-16)

### Bug Fixes

- **initial-state:** fix merge of package state ([262c75e](https://github.com/frontity/frontity/commit/262c75e))
- **initial-state:** fix merge of package state ([#71](https://github.com/frontity/frontity/issues/71)) ([8c9771e](https://github.com/frontity/frontity/commit/8c9771e))
- **initial-state:** overwrite arrays instead of merge ([31db03c](https://github.com/frontity/frontity/commit/31db03c))
- **merge-packages:** don't clone to allow complex objects ([b1b127a](https://github.com/frontity/frontity/commit/b1b127a))
- **webpack:** fix bug with publicPath and dynamic imports ([#63](https://github.com/frontity/frontity/issues/63)) ([c6e99f5](https://github.com/frontity/frontity/commit/c6e99f5))

## [0.3.3](https://github.com/frontity/frontity/compare/@frontity/core@0.3.2...@frontity/core@0.3.3) (2019-05-16)

### Bug Fixes

- **core-scripts:** fixes texts and core dependencies ([faf8761](https://github.com/frontity/frontity/commit/faf8761))

## [0.3.2](https://github.com/frontity/frontity/compare/@frontity/core@0.3.1...@frontity/core@0.3.2) (2019-05-15)

**Note:** Version bump only for package @frontity/core

## [0.3.1](https://github.com/frontity/frontity/compare/@frontity/core@0.3.0...@frontity/core@0.3.1) (2019-05-15)

**Note:** Version bump only for package @frontity/core

# [0.3.0](https://github.com/frontity/frontity/compare/@frontity/core@0.2.0...@frontity/core@0.3.0) (2019-05-15)

### Bug Fixes

- **client:** do not load scripts if Proxy is not present ([55e4ca8](https://github.com/frontity/frontity/commit/55e4ca8))
- **tsconfig-build:** set 'allowJs' and 'isoltatedModules' to false ([cd8a26d](https://github.com/frontity/frontity/commit/cd8a26d))

### Features

- **client:** run init and beforeCSR actions on client ([#50](https://github.com/frontity/frontity/issues/50)) ([5b69984](https://github.com/frontity/frontity/commit/5b69984))

# [0.2.0](https://github.com/frontity/frontity/compare/@frontity/core@0.1.2...@frontity/core@0.2.0) (2019-03-27)

### Bug Fixes

- **lerna:** execute bootstrap with --hoist after prepare ([e85cdee](https://github.com/frontity/frontity/commit/e85cdee))

### Features

- **basic-typescript:** example folders work ([cc5b0bf](https://github.com/frontity/frontity/commit/cc5b0bf))
- **core:** add build script ([1d4b19c](https://github.com/frontity/frontity/commit/1d4b19c))
- **core:** add server script ([f8d46bc](https://github.com/frontity/frontity/commit/f8d46bc))
- **core:** fix hot-server-middleware to make bundle severless ready ([34d25ee](https://github.com/frontity/frontity/commit/34d25ee))
- **core:** serve static files from Koa ([e57706d](https://github.com/frontity/frontity/commit/e57706d))

## [0.1.2](https://github.com/frontity/frontity/compare/@frontity/core@0.1.1...@frontity/core@0.1.2) (2019-02-27)

### Bug Fixes

- **core:** use the corrent character ([1f0830e](https://github.com/frontity/frontity/commit/1f0830e))

## 0.1.1 (2019-02-27)

**Note:** Version bump only for package @frontity/core
