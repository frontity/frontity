# Change Log

## 1.11.7

### Patch Changes

- [`f7afe02e`](https://github.com/frontity/frontity/commit/f7afe02eefd23dd5b1e1cb145aca6bc79d238505) [#878](https://github.com/frontity/frontity/pull/878) Thanks [@nicholasio](https://github.com/nicholasio)! - Fix a bug where post previews of published posts would break if `state.source.params.per_page` is manually set.

* [`64a52a03`](https://github.com/frontity/frontity/commit/64a52a0335979e9bb31bea97773b4053f6c5d69a) [#880](https://github.com/frontity/frontity/pull/880) Thanks [@markusilmer](https://github.com/markusilmer)! - Add source params to taxonomy and author api calls [#864](https://github.com/frontity/frontity/pull/864)

## 1.11.6

### Patch Changes

- [`e0f290c8`](https://github.com/frontity/frontity/commit/e0f290c86859fc83e1a50c0f3d0240c1c762a1b4) [#866](https://github.com/frontity/frontity/pull/866) Thanks [@nicholasio](https://github.com/nicholasio)! - Fix a bug where frontity could not fetch a page or child page with the same slug as the parent/child.

* [`e84cca77`](https://github.com/frontity/frontity/commit/e84cca770384fc16ee4575a24e8ef82fd103e8ea) [#870](https://github.com/frontity/frontity/pull/870) Thanks [@luisherranz](https://github.com/luisherranz)! - Pin `node-fetch` version until they solve [the import problem](https://github.com/node-fetch/node-fetch/pull/1303) introduced in v2.6.3. Thanks to @robrecord for the catch.

* Updated dependencies [[`e84cca77`](https://github.com/frontity/frontity/commit/e84cca770384fc16ee4575a24e8ef82fd103e8ea)]:
  - frontity@1.17.1

## 1.11.5

### Patch Changes

- [`0abc237f`](https://github.com/frontity/frontity/commit/0abc237f5ebd740b3fbef5f7a91431a712b0a434) [#819](https://github.com/frontity/frontity/pull/819) Thanks [@DAreRodz](https://github.com/DAreRodz)! - Remove the internal utility `verboseRegExp` as comment for verbose regexp were leaking into the bundle without being deleted. Verbose regexps are documented now with TSDocs.

- Updated dependencies [[`4d652ea2`](https://github.com/frontity/frontity/commit/4d652ea27ff70a05fff089a2f6ca3c5c72c2974c)]:
  - frontity@1.16.0

## 1.11.4

### Patch Changes

- [`3108535b`](https://github.com/frontity/frontity/commit/3108535b47030e6a693562076d6d9a6b0c53d59a) [#810](https://github.com/frontity/frontity/pull/810) Thanks [@DAreRodz](https://github.com/DAreRodz)! - Remove a negative lookbehind in the `verboseRegExp` function.

* [`df7d6c42`](https://github.com/frontity/frontity/commit/df7d6c4225d833a53159f1b3d1f90bb7e6d63655) [#806](https://github.com/frontity/frontity/pull/806) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Fix an incorrect regular expression which matches the link with internal redirections when a `homepage` is defined in `state.source`.

## 1.11.3

### Patch Changes

- [`eb41d982`](https://github.com/frontity/frontity/commit/eb41d982552c8f542437cbedaee4335d23b7a483) [#771](https://github.com/frontity/frontity/pull/771) Thanks [@cristianbote](https://github.com/cristianbote)! - Bail out of redirection if frontity is running into embedded mode.

* [`876256d8`](https://github.com/frontity/frontity/commit/876256d8b923508a94b1bfc1818045edc0f1b613) [#767](https://github.com/frontity/frontity/pull/767) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Fix a bug which caused an infinite loop if the 3xx redirection was "internal"
  (meaning redirecting to the WP or Frontity domain) and the `location` of the
  redirection matched the link as discussed in https://community.frontity.org/t/301-redirects-stored-in-wordpress-database/3032/28.

- [`4f12c5ee`](https://github.com/frontity/frontity/commit/4f12c5ee37f3cd3cc4df963d7285e2bc458a4cb9) [#793](https://github.com/frontity/frontity/pull/793) Thanks [@DAreRodz](https://github.com/DAreRodz)! - Fix the pattern of the internal redirection when `state.source.homepage` is defined, making links with a search param (`?s=some+term`) to keep using the post archive handler.

* [`8083bd0a`](https://github.com/frontity/frontity/commit/8083bd0a07c8d61ece4f669bd8088912b91a4ab2) [#795](https://github.com/frontity/frontity/pull/795) Thanks [@DAreRodz](https://github.com/DAreRodz)! - Add different schemas for categories and tags to avoid ID collisions inside `libraries.source.populate()`.

* Updated dependencies [[`62e60216`](https://github.com/frontity/frontity/commit/62e60216198111626d82566507f7f208323ffeee), [`77e0a286`](https://github.com/frontity/frontity/commit/77e0a286ceb8274efb6a473c01c8f60d78b70225)]:
  - frontity@1.15.0

## 1.11.2

### Patch Changes

- [`7e701d57`](https://github.com/frontity/frontity/commit/7e701d577c916e675557d0d93413176bb96166d7) [#717](https://github.com/frontity/frontity/pull/717) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Update the value of `link` in actions.fetch if there's an internal redirection.

* [`32c03d58`](https://github.com/frontity/frontity/commit/32c03d58fd40889e98997a8715704b58c994c34b) [#533](https://github.com/frontity/frontity/pull/533) Thanks [@orballo](https://github.com/orballo)! - Fix an array check by using `Array.isArray` instead of `instanceof Array`.

- [`804f19fe`](https://github.com/frontity/frontity/commit/804f19fe323d7555172a9eef0f81681e0d2d11cd) [#686](https://github.com/frontity/frontity/pull/686) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Change how `libraries.source.normalize|parse|stringify` used inside of actions.source.fetch(). From now on, they are not imported from their module but received from the `libraries` parameter of `actions.source.fetch`.

- Updated dependencies [[`7c3f0769`](https://github.com/frontity/frontity/commit/7c3f076999d243de4f7dee631f40d2e71d47337d), [`49020718`](https://github.com/frontity/frontity/commit/49020718c569de081391c114a5684d092fd9769d), [`15e8f1d8`](https://github.com/frontity/frontity/commit/15e8f1d8cf66394d20034370df171a0c19ad51d3), [`7992fb85`](https://github.com/frontity/frontity/commit/7992fb854ec563b0781f375ebcdd2d83f5a6a562)]:
  - frontity@1.14.2

## 1.11.1

### Patch Changes

- [`b41175d0`](https://github.com/frontity/frontity/commit/b41175d0f5df9ca95fc449ca1a0eca6649f1bccf) [#683](https://github.com/frontity/frontity/pull/683) Thanks [@cristianbote](https://github.com/cristianbote)! - Reverts the preinstall hook added for development workflows.

- Updated dependencies [[`b41175d0`](https://github.com/frontity/frontity/commit/b41175d0f5df9ca95fc449ca1a0eca6649f1bccf)]:
  - frontity@1.14.1
  - @frontity/source@1.5.1

## 1.11.0

### Minor Changes

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

- [`681caef1`](https://github.com/frontity/frontity/commit/681caef16c1660152e13c62afd0740071e968428) [#635](https://github.com/frontity/frontity/pull/635) Thanks [@DAreRodz](https://github.com/DAreRodz)! - Fix how the value of `state.source.api` is generated when `state.source.url` is set to a free WordPress.com site URL.

* [`367700eb`](https://github.com/frontity/frontity/commit/367700ebcad8dd6b87728c526de63a9c19f2df32) [#676](https://github.com/frontity/frontity/pull/676) Thanks [@cristianbote](https://github.com/cristianbote)! - Fix the incorrectly matched patterns when a query string was present. The getMatch function now has a separate codepath for regex based patterns.

- [`0ca83cd5`](https://github.com/frontity/frontity/commit/0ca83cd5c068c4a0b759a277c8d819cdbc5c88db) [#626](https://github.com/frontity/frontity/pull/626) Thanks [@luisherranz](https://github.com/luisherranz)! - Batch the `actions.source.fetch()` updates of the data object

* [`5f329dab`](https://github.com/frontity/frontity/commit/5f329dabe9d67d0b3664938865491674ef798433) [#655](https://github.com/frontity/frontity/pull/655) Thanks [@mburridge](https://github.com/mburridge)! - Fix broken links in README files.

- [`d38040d3`](https://github.com/frontity/frontity/commit/d38040d3986d3d1cdf3af45eafe7d9a868920d02) [#649](https://github.com/frontity/frontity/pull/649) Thanks [@luisherranz](https://github.com/luisherranz)! - Add support for [hierarchical](https://developer.wordpress.org/reference/functions/register_post_type/#hierarchical) custom post types.

- Updated dependencies [[`a5520f56`](https://github.com/frontity/frontity/commit/a5520f5605cfda2323e0c9ea4a553658a021fd15), [`01880c34`](https://github.com/frontity/frontity/commit/01880c34c111f55c23169adb7365ea9262e6cca8), [`3ced7fdf`](https://github.com/frontity/frontity/commit/3ced7fdfd93004c210bb47692ffae265874828e7), [`898cde32`](https://github.com/frontity/frontity/commit/898cde32b78992807fa0c7ffb76cd32c5545a6ad), [`5f329dab`](https://github.com/frontity/frontity/commit/5f329dabe9d67d0b3664938865491674ef798433), [`09f07484`](https://github.com/frontity/frontity/commit/09f07484c920e99d46290986d7a64b8f3c20e53c), [`e4221d4b`](https://github.com/frontity/frontity/commit/e4221d4b451268b5c951197a08b4021d50394c1b), [`9346f560`](https://github.com/frontity/frontity/commit/9346f560c4806483b914aa3fb7a37e373f48f712), [`5f329dab`](https://github.com/frontity/frontity/commit/5f329dabe9d67d0b3664938865491674ef798433), [`c5b0b8f7`](https://github.com/frontity/frontity/commit/c5b0b8f7e5ebfdf02f40ded7d7347a1d28039c2d), [`4f4b7f81`](https://github.com/frontity/frontity/commit/4f4b7f81d8eacb19e3d06eba72dcc199f556d7e4)]:
  - frontity@1.14.0
  - @frontity/source@1.5.0

## 1.10.1-infinite-scroll-beta.0

### Patch Changes

- Release a new beta version in the infinite scroll tag.

## 1.10.0

### Minor Changes

- [`3dfa3c48`](https://github.com/frontity/frontity/commit/3dfa3c4809d3b00528db8c1c8c530cf311901553) [#610](https://github.com/frontity/frontity/pull/610) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Add the `state.source.url` setting to source according to
  https://community.frontity.org/t/make-the-backend-url-a-global-setting/2381.
  The types are in `@frontity/source` and the implementation is in
  `@frontity/wp-source`.

### Patch Changes

- [`d7b4b429`](https://github.com/frontity/frontity/commit/d7b4b429f1f23dfae74b9781ea1b1de00aed763c) [#616](https://github.com/frontity/frontity/pull/616) Thanks [@luisherranz](https://github.com/luisherranz)! - Stop using `instanceof Array` in favor of `Array.isArray()`.

* [`252c89d2`](https://github.com/frontity/frontity/commit/252c89d226b9575f8f30e9f102ed97de598061e6) [#616](https://github.com/frontity/frontity/pull/616) Thanks [@luisherranz](https://github.com/luisherranz)! - Fix a couple of unnecessary rerenderings when transitioning from one data object to another.

- [`362b02f1`](https://github.com/frontity/frontity/commit/362b02f1beb100ffb178a1d4e775e89b84b99ccc) [#449](https://github.com/frontity/frontity/pull/449) Thanks [@luisherranz](https://github.com/luisherranz)! - Adapt packages to changes in `@frontity/source`.

* [`2c69da57`](https://github.com/frontity/frontity/commit/2c69da577ebd93d3335a2e50f8fb38c3eba1d7f7) [#606](https://github.com/frontity/frontity/pull/606) Thanks [@nandotess](https://github.com/nandotess)! - Make `libraries.source.normalize()` to lowercase the pathname of links. This fixes a bug when links with uppercase letters are visited.

- [`3dfa3c48`](https://github.com/frontity/frontity/commit/3dfa3c4809d3b00528db8c1c8c530cf311901553) [#610](https://github.com/frontity/frontity/pull/610) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Update `state.source.api` to be a derived state.

- Updated dependencies [[`362b02f1`](https://github.com/frontity/frontity/commit/362b02f1beb100ffb178a1d4e775e89b84b99ccc), [`362b02f1`](https://github.com/frontity/frontity/commit/362b02f1beb100ffb178a1d4e775e89b84b99ccc), [`362b02f1`](https://github.com/frontity/frontity/commit/362b02f1beb100ffb178a1d4e775e89b84b99ccc), [`3dfa3c48`](https://github.com/frontity/frontity/commit/3dfa3c4809d3b00528db8c1c8c530cf311901553), [`6b4bf82b`](https://github.com/frontity/frontity/commit/6b4bf82b5eee698f7ea8ea3b0bfd69a989caaba3), [`44f44e3f`](https://github.com/frontity/frontity/commit/44f44e3f2ba436236b65518ddac30cd4af57ea18), [`3dfa3c48`](https://github.com/frontity/frontity/commit/3dfa3c4809d3b00528db8c1c8c530cf311901553)]:
  - @frontity/source@1.4.0
  - frontity@1.13.0

## 1.9.1

### Patch Changes

- [`81edef5d`](https://github.com/frontity/frontity/commit/81edef5d903a9583437bb498096985625a8d6597) [#599](https://github.com/frontity/frontity/pull/599) Thanks [@DAreRodz](https://github.com/DAreRodz)! - Fix `data.isHome` when the `state.source.homepage` option is set.

## 1.9.0

### Minor Changes

- [`63fc4559`](https://github.com/frontity/frontity/commit/63fc45592f678bcc7503ea7fef01186a408a5396) [#564](https://github.com/frontity/frontity/pull/564) Thanks [@luisherranz](https://github.com/luisherranz)! - New post type handlers for plain query permalinks:

  - `/?p=ID` for posts and custom post types.
  - `/?page_id=ID` for pages.

* [`5553daf4`](https://github.com/frontity/frontity/commit/5553daf451e22747f62539c33dfe85566d723fe2) [#568](https://github.com/frontity/frontity/pull/568) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Add support for adding auth headers to the source packages by setting `state.source.auth`. This will allow users to e.g. pass Basic Auth header in all requests. Feature Discussion: https://community.frontity.org/t/support-for-custom-headers-in-source-packages/2678

- [`63fc4559`](https://github.com/frontity/frontity/commit/63fc45592f678bcc7503ea7fef01186a408a5396) [#564](https://github.com/frontity/frontity/pull/564) Thanks [@luisherranz](https://github.com/luisherranz)! - Sort the link query alphabetically. For example, `?k1=v1&k2=v2` is now the same than `?k2=v2&k1=v1`.

* [`63fc4559`](https://github.com/frontity/frontity/commit/63fc45592f678bcc7503ea7fef01186a408a5396) [#564](https://github.com/frontity/frontity/pull/564) Thanks [@luisherranz](https://github.com/luisherranz)! - Support the `preview=true` query in the PostType and PostTypeWithQuery handlers.

  If that query is present, the handlers will do an additional request to get
  the latest revision and they will substitute the `title`, `content` and
  `excerpt` with the last one.

- [`63fc4559`](https://github.com/frontity/frontity/commit/63fc45592f678bcc7503ea7fef01186a408a5396) [#564](https://github.com/frontity/frontity/pull/564) Thanks [@luisherranz](https://github.com/luisherranz)! - Add `queryString` to the list of link params we get/set using
  `libraries.source.parse` and `libraries.source.stringify`.

* [`63fc4559`](https://github.com/frontity/frontity/commit/63fc45592f678bcc7503ea7fef01186a408a5396) [#564](https://github.com/frontity/frontity/pull/564) Thanks [@luisherranz](https://github.com/luisherranz)! - Support regular expression patterns to match queries in the URLs, like
  "RegExp:(\\?|&)preview=true".

### Patch Changes

- [`63fc4559`](https://github.com/frontity/frontity/commit/63fc45592f678bcc7503ea7fef01186a408a5396) [#564](https://github.com/frontity/frontity/pull/564) Thanks [@luisherranz](https://github.com/luisherranz)! - Do not set `isHome` to true `when` `isSearch` is `true`.

* [`f57af435`](https://github.com/frontity/frontity/commit/f57af43594cbced7fb3a27cc0a10a978e7307355) [#579](https://github.com/frontity/frontity/pull/579) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Fix the issue where the `{ force: true }` option was not respected in the postType handler.

* Updated dependencies [[`e2c193f2`](https://github.com/frontity/frontity/commit/e2c193f2ad8353886a8eb27ea74838383f6d2e4b), [`63fc4559`](https://github.com/frontity/frontity/commit/63fc45592f678bcc7503ea7fef01186a408a5396)]:
  - frontity@1.12.0
  - @frontity/source@1.3.1

## 1.8.4

### Patch Changes

- [`b8d187b3`](https://github.com/frontity/frontity/commit/b8d187b3e8b8893f604727b66f88acef6e846a0c) [#571](https://github.com/frontity/frontity/pull/571) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Revert a change introduced in https://github.com/frontity/frontity/pull/542. Keep setting `query`, `link` and `route` on all entities (including non-URL entities) in source.data

## 1.8.4-infinite-scroll-beta.0

### Patch Changes

- Release stable changes on the beta branch.

## 1.8.3

### Patch Changes

- [`5eaf92cc`](https://github.com/frontity/frontity/commit/5eaf92cca957e4444c47db22d6c739a9d4c64f3b) [#548](https://github.com/frontity/frontity/pull/548) Thanks [@DAreRodz](https://github.com/DAreRodz)! - Add a derived prop in `state.source` called `entity` that returns the entity pointed by a given link.

* [`958fe49f`](https://github.com/frontity/frontity/commit/958fe49f043ca43ae2b1b982059c78e921785d71) [#542](https://github.com/frontity/frontity/pull/542) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Add support for non-URL resources e.g. WordPress comments.

* Updated dependencies [[`870e4ba5`](https://github.com/frontity/frontity/commit/870e4ba5ab6afd216d9f2c5f15383fb8028d471c), [`5eaf92cc`](https://github.com/frontity/frontity/commit/5eaf92cca957e4444c47db22d6c739a9d4c64f3b)]:
  - @frontity/source@1.3.0

## 1.8.2

### Patch Changes

- [`10a3a977`](https://github.com/frontity/frontity/commit/10a3a9779b594e39618b4cd24d5f48f42ecc54af) [#566](https://github.com/frontity/frontity/pull/566) Thanks [@luisherranz](https://github.com/luisherranz)! - Do not import `URL` from `frontity` anymore.

- Updated dependencies [[`10a3a977`](https://github.com/frontity/frontity/commit/10a3a9779b594e39618b4cd24d5f48f42ecc54af)]:
  - frontity@1.11.1

## 1.8.2-infinite-scroll-beta.0

### Patch Changes

- [`32c03d58`](https://github.com/frontity/frontity/commit/32c03d58fd40889e98997a8715704b58c994c34b) [#533](https://github.com/frontity/frontity/pull/533) Thanks [@orballo](https://github.com/orballo)! - Fix an array check by using `Array.isArray` instead of `instanceof Array`.

## 1.8.1

### Patch Changes

- [`2a28af19`](https://github.com/frontity/frontity/commit/2a28af19ef6cd2d148c8418895387943c7c8a95f) [#513](https://github.com/frontity/frontity/pull/513) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Fix a bug where requesting posts for a date that is outside of the calendar range causes a 500 error instead of a 404.

* [`769a7bfd`](https://github.com/frontity/frontity/commit/769a7bfd047d388053e45b13d75ca84510afa02d) [#506](https://github.com/frontity/frontity/pull/506) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Fix the bug that causes a server crash and 500 errors to be returned if a URL contained a partly known entity. E.g. `/undefined/2020/some-interesting-post`.

* Updated dependencies [[`17f539bf`](https://github.com/frontity/frontity/commit/17f539bfb547105bd4565735c5491f2400c3c8fe)]:
  - frontity@1.10.1

## 1.8.0

### Minor Changes

- [`b53817d1`](https://github.com/frontity/frontity/commit/b53817d10eb52f4cd1bf159edb06dd21169eb70a) [#488](https://github.com/frontity/frontity/pull/488) Thanks [@juanmaguitar](https://github.com/juanmaguitar)! - README created.

### Patch Changes

- Updated dependencies [[`ba13f70a`](https://github.com/frontity/frontity/commit/ba13f70ae2a4360ca21c77aed1c920c02e9d45b8), [`62fce1e5`](https://github.com/frontity/frontity/commit/62fce1e5c117faeb5902dc0ddae3b13d95cd925b), [`3f61f711`](https://github.com/frontity/frontity/commit/3f61f71197d33b478427d1b74882c31258861e92)]:
  - frontity@1.9.0
  - @frontity/source@1.2.2

## 1.7.2-infinite-scroll-beta.0

### Patch Changes

- Updated dependencies []:
  - frontity@1.8.1-infinite-scroll-beta.0
  - @frontity/source@1.2.2-infinite-scroll-beta.0

## 1.7.1

### Patch Changes

- [`1c247126`](https://github.com/frontity/frontity/commit/1c24712651c481bf44a388567c93ab9f8e0e51c6) [#389](https://github.com/frontity/frontity/pull/389) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Bugfixes:

  - When using actions.source.fetch("/some-link", { force: true }), the data object property isReady should never be reset to false.
  - The data object custom properties (like items, isCategory...) should not be removed from the data.
  - The entities I get from the new fetch should overwrite the old ones.
  - When calling actions.source.fetch, it should populate data with link, route, page and query, even if data already exists.

- [`75343be3`](https://github.com/frontity/frontity/commit/75343be3154dda5b587a3065b225161af96f0488) [#433](https://github.com/frontity/frontity/pull/433) Thanks [@SantosGuillamot](https://github.com/SantosGuillamot)! - Change urls to point to test.frontity.org instead of test.frontity.io.
- Updated dependencies [[`996865a2`](https://github.com/frontity/frontity/commit/996865a27690d5b89d2ef110f5b1bf3fb91da6f5), [`661ac083`](https://github.com/frontity/frontity/commit/661ac08316f44172166e79b05b47f0c15a837a9a), [`75343be3`](https://github.com/frontity/frontity/commit/75343be3154dda5b587a3065b225161af96f0488)]:
  - @frontity/connect@1.1.0
  - frontity@1.7.0
  - @frontity/source@1.2.1

## 1.7.0

### Minor Changes

- [`9b7858ba`](https://github.com/frontity/frontity/commit/9b7858ba283c1780037eb7519f459b01363cca54) [#382](https://github.com/frontity/frontity/pull/382) Thanks [@DAreRodz](https://github.com/DAreRodz)! - Add an option called `authorBase` to change the base of author links. Useful when a custom structure for permalinks is set in the WordPress site connected with the `@frontity/wp-source` package.

## 1.6.3

### Patch Changes

- [`ad275b2e`](https://github.com/frontity/frontity/commit/ad275b2ee1a5bb5f365599d21ab41e4d456a9492) [#369](https://github.com/frontity/frontity/pull/369) Thanks [@luisherranz](https://github.com/luisherranz)! - `data.isHome` is now available when `data.isReady` turns true.
- Updated dependencies [[`34b37ec8`](https://github.com/frontity/frontity/commit/34b37ec84bc4c387754f241ea56fd5eb8b13b14d), [`7854971e`](https://github.com/frontity/frontity/commit/7854971eaefa665dc5d77b0b91129c1495b0dab4)]:
  - @frontity/connect@1.0.5
  - frontity@1.5.3

## 1.6.2

### Patch Changes

- [`e6f48dd9`](https://github.com/frontity/frontity/commit/e6f48dd96184eed68cf48456e56352c1be5fce56) [#339](https://github.com/frontity/frontity/pull/339) Thanks [@luisherranz](https://github.com/luisherranz)! - - Add a fallback to 0 in case `default` (second param) is missing in both `getTotal` and `getTotalPages`.
  - Add backward compatibility to handlers receiving the `route` param instead of the `link` one.

## 1.6.1

### Patch Changes

- [`cdc84d57`](https://github.com/frontity/frontity/commit/cdc84d5700213e579d4fe1a3b586e9d6a5687718) [#335](https://github.com/frontity/frontity/pull/335) Thanks [@luisherranz](https://github.com/luisherranz)! - Fix `isFetching` not turning to true when `data` exists. It may happen in cases where we are fetching that `data` in the embed of others. Like for example, taxonomies in posts.

## 1.6.0

### Minor Changes

- [`e8210ee9`](https://github.com/frontity/frontity/commit/e8210ee97c25555a122dc63f114fb4188ea0b7af) [#253](https://github.com/frontity/frontity/pull/253) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - We have made easier to work with searches and pagination by adding this new properties to the data object returned by `state.source.get(someLink)`:

  In all entities:

  - `data.link`: the link (short for permalink).
  - `data.page`: the page number.
  - `data.route`: the link without the pagination part.

  In archives:

  - `data.next`: the link of the next page in an archive.
  - `data.previous`: the link of the previous page in an archive.

  In searches:

  - `data.isSearch`: true for links that are searches.
  - `data.searchQuery`: the value of the search.

### Patch Changes

- [`b3225692`](https://github.com/frontity/frontity/commit/b32256929351b66647f64900cc59862ee7c702a7) [#329](https://github.com/frontity/frontity/pull/329) Thanks [@luisherranz](https://github.com/luisherranz)! - Remove `@frontity/connect` from dependencies to avoid multiple imports and fix the problem people is having when they are updating Frontity.
- Updated dependencies [[`b3225692`](https://github.com/frontity/frontity/commit/b32256929351b66647f64900cc59862ee7c702a7), [`e8210ee9`](https://github.com/frontity/frontity/commit/e8210ee97c25555a122dc63f114fb4188ea0b7af), [`b3225692`](https://github.com/frontity/frontity/commit/b32256929351b66647f64900cc59862ee7c702a7), [`f7418071`](https://github.com/frontity/frontity/commit/f741807197c4cda5df2e43f5496a121428d309bf)]:
  - frontity@1.5.2
  - @frontity/source@1.2.0

## 1.5.0

### Minor Changes

- [`fb412d2a`](https://github.com/frontity/frontity/commit/fb412d2af2e9f7cbd5683ea2eb4f961a620edcfc) [#291](https://github.com/frontity/frontity/pull/291) Thanks [@michalczaplinski](https://github.com/michalczaplinski)! - Add status codes and error messages when fetch response is 4xx or 5xx

### Patch Changes

- [`c3d4340a`](https://github.com/frontity/frontity/commit/c3d4340a2ca3088ecda29d2e113d06d8faeb7a0e) [#303](https://github.com/frontity/frontity/pull/303) Thanks [@DAreRodz](https://github.com/DAreRodz)! - Add `force` param to `actions.source.fetch` and `libraries.source.populate`.

  Also, change the default behavior of `populate` to not overwrite entities in the state.- Updated dependencies [[`417f2b0f`](https://github.com/frontity/frontity/commit/417f2b0f0b6f5626be253eb3f1be2daf257b71ef), [`495771f8`](https://github.com/frontity/frontity/commit/495771f83951f192f92d3162221cedc9b791e399), [`696dec11`](https://github.com/frontity/frontity/commit/696dec11bb8d32f0821cca3f5ce39e27c42d60b6), [`80c1aa3a`](https://github.com/frontity/frontity/commit/80c1aa3aee6cf04f46d6fa1a409abfcae2c511cc)]:

  - frontity@1.5.0
  - @frontity/connect@1.0.4

## 1.5.0

### Minor Changes

- [`6ac389b`](https://github.com/frontity/frontity/commit/6ac389b1e406ae32ccb58c7e92c2be84fa4223b8) [#242](https://github.com/frontity/frontity/pull/242) Thanks [@DAreRodz](https://github.com/DAreRodz)! - Add a schema for post types and refactor populate. Use also the new types that come from `@frontity/source`.

### Patch Changes

- Updated dependencies [[`e887fa1`](https://github.com/frontity/frontity/commit/e887fa1d28449cd9189861fe5a4be92fa4acbe33)]:
  - @frontity/source@1.1.0

## [1.4.3](https://github.com/frontity/frontity/compare/@frontity/wp-source@1.4.2...@frontity/wp-source@1.4.3) (2019-12-10)

**Note:** Version bump only for package @frontity/wp-source

## [1.4.2](https://github.com/frontity/frontity/compare/@frontity/wp-source@1.4.1...@frontity/wp-source@1.4.2) (2019-11-04)

### Bug Fixes

- **post-type:** fix handler if a query is present ([0c36a7c](https://github.com/frontity/frontity/commit/0c36a7c))

## [1.4.1](https://github.com/frontity/frontity/compare/@frontity/wp-source@1.4.0...@frontity/wp-source@1.4.1) (2019-10-10)

**Note:** Version bump only for package @frontity/wp-source

# [1.4.0](https://github.com/frontity/frontity/compare/@frontity/wp-source@1.3.1...@frontity/wp-source@1.4.0) (2019-10-02)

### Bug Fixes

- **typescript:** update to latest version ([a89b11c](https://github.com/frontity/frontity/commit/a89b11c))

### Features

- **wp-source:** add postTypes and taxonomies arrays to state ([8f8fce3](https://github.com/frontity/frontity/commit/8f8fce3))

## [1.3.1](https://github.com/frontity/frontity/compare/@frontity/wp-source@1.3.0...@frontity/wp-source@1.3.1) (2019-09-10)

### Bug Fixes

- **wp-source:** move clone-deep from code to tests ([4cd6787](https://github.com/frontity/frontity/commit/4cd6787))

# [1.3.0](https://github.com/frontity/frontity/compare/@frontity/wp-source@1.2.0...@frontity/wp-source@1.3.0) (2019-09-10)

### Bug Fixes

- **wp-source:** allow arrays inside params in api.get ([50fcd63](https://github.com/frontity/frontity/commit/50fcd63))
- **wp-source:** fix handlers, refactor them and improve tests ([#193](https://github.com/frontity/frontity/issues/193)) ([c7e2bfe](https://github.com/frontity/frontity/commit/c7e2bfe))
- **wp-source:** properly populate custom post types and taxonomies ([857f803](https://github.com/frontity/frontity/commit/857f803))

### Features

- **wp-source:** add `postEndpoint` and `params` props to state ([d921b33](https://github.com/frontity/frontity/commit/d921b33))

# [1.2.0](https://github.com/frontity/frontity/compare/@frontity/wp-source@1.1.8...@frontity/wp-source@1.2.0) (2019-08-12)

### Bug Fixes

- **wp-source:** do not set `isHome` in `postArchive` handler ([#179](https://github.com/frontity/frontity/issues/179)) ([13e5c1e](https://github.com/frontity/frontity/commit/13e5c1e))

### Features

- **frontity:** expose fetch and URL from frontity package ([#168](https://github.com/frontity/frontity/issues/168)) ([235c465](https://github.com/frontity/frontity/commit/235c465))

## [1.1.8](https://github.com/frontity/frontity/compare/@frontity/wp-source@1.1.7...@frontity/wp-source@1.1.8) (2019-07-12)

### Bug Fixes

- **source:** set isHome value for the home data object ([9af88b4](https://github.com/frontity/frontity/commit/9af88b4))

## [1.1.7](https://github.com/frontity/frontity/compare/@frontity/wp-source@1.1.6...@frontity/wp-source@1.1.7) (2019-07-04)

**Note:** Version bump only for package @frontity/wp-source

## [1.1.6](https://github.com/frontity/frontity/compare/@frontity/wp-source@1.1.5...@frontity/wp-source@1.1.6) (2019-07-04)

### Bug Fixes

- **babel:** use workaround for a bug in babel 7.5.0 ([3c489ae](https://github.com/frontity/frontity/commit/3c489ae))

## [1.1.5](https://github.com/frontity/frontity/compare/@frontity/wp-source@1.1.4...@frontity/wp-source@1.1.5) (2019-07-01)

**Note:** Version bump only for package @frontity/wp-source

## [1.1.4](https://github.com/frontity/frontity/compare/@frontity/wp-source@1.1.3...@frontity/wp-source@1.1.4) (2019-06-20)

**Note:** Version bump only for package @frontity/wp-source

## [1.1.3](https://github.com/frontity/frontity/compare/@frontity/wp-source@1.1.2...@frontity/wp-source@1.1.3) (2019-06-20)

**Note:** Version bump only for package @frontity/wp-source

## [1.1.2](https://github.com/frontity/frontity/compare/@frontity/wp-source@1.1.1...@frontity/wp-source@1.1.2) (2019-06-20)

**Note:** Version bump only for package @frontity/wp-source

## [1.1.1](https://github.com/frontity/frontity/compare/@frontity/wp-source@1.1.0...@frontity/wp-source@1.1.1) (2019-06-19)

**Note:** Version bump only for package @frontity/wp-source

# [1.1.0](https://github.com/frontity/frontity/compare/@frontity/wp-source@1.0.3...@frontity/wp-source@1.1.0) (2019-06-19)

### Features

- **wp-source:** add support for subdirectory, redirections, pages as home, category and tag base ([#131](https://github.com/frontity/frontity/issues/131)) ([0b877b2](https://github.com/frontity/frontity/commit/0b877b2))

## [1.0.3](https://github.com/frontity/frontity/compare/@frontity/wp-source@1.0.2...@frontity/wp-source@1.0.3) (2019-06-19)

### Bug Fixes

- **source-get:** make isFetching and isReady properties to be always present ([#122](https://github.com/frontity/frontity/issues/122)) ([6d2e485](https://github.com/frontity/frontity/commit/6d2e485))

## [1.0.2](https://github.com/frontity/frontity/compare/@frontity/wp-source@1.0.1...@frontity/wp-source@1.0.2) (2019-06-05)

### Bug Fixes

- **source:** fix wrong import in source tests ([209cdfd](https://github.com/frontity/frontity/commit/209cdfd))

## [1.0.1](https://github.com/frontity/frontity/compare/@frontity/wp-source@1.0.0...@frontity/wp-source@1.0.1) (2019-06-05)

### Bug Fixes

- **all:** update typscript and fix some keywords ([1fe5fec](https://github.com/frontity/frontity/commit/1fe5fec))
- **wp-source:** change apiUrl for api ([26947e7](https://github.com/frontity/frontity/commit/26947e7))

# [1.0.0](https://github.com/frontity/frontity/compare/@frontity/wp-source@0.1.7...@frontity/wp-source@1.0.0) (2019-06-05)

### Bug Fixes

- **route-utils:** support custom names in routes ([1b0994b](https://github.com/frontity/frontity/commit/1b0994b))
- **source:** change routeUtils functions to "getParams" and "getRoute" ([e385d3c](https://github.com/frontity/frontity/commit/e385d3c))
- **wp-source:** fix archive handlers ([c09736f](https://github.com/frontity/frontity/commit/c09736f))
- **wp-source:** fix searches in taxonomies ([8b9257f](https://github.com/frontity/frontity/commit/8b9257f))
- **wp-source:** remove domains from links ([f111b8c](https://github.com/frontity/frontity/commit/f111b8c))
- **wp-source:** transform WpSource into a function ([abd7034](https://github.com/frontity/frontity/commit/abd7034))

### Features

- **source:** accept only strings in 'source.get' and 'source.fetch' ([2e9ae62](https://github.com/frontity/frontity/commit/2e9ae62))
- **source:** add 'normalize' to libraries ([9e0e9e3](https://github.com/frontity/frontity/commit/9e0e9e3))
- **source:** change 'data' to 'get' and 'dataMap' to 'data' ([f32be1a](https://github.com/frontity/frontity/commit/f32be1a))
- **source:** move list pages to their own data ([148bc0a](https://github.com/frontity/frontity/commit/148bc0a))
- **source:** rename route libraries to 'stringify' and 'parse' ([f230f86](https://github.com/frontity/frontity/commit/f230f86))
- **wp-source:** add library 'routeUtils' ([0a31246](https://github.com/frontity/frontity/commit/0a31246))
- **wp-source:** remove domain from links ([ff1752b](https://github.com/frontity/frontity/commit/ff1752b))

### BREAKING CHANGES

- **source:** objects cannot be passed as arguments in 'source.get' and 'source.set'
- **source:** route libraries have new names
- **source:** "data.pages" doesn't exist anymore, use "data.items" instead. Each "route" represents now an archive's page (if "route" points to an archive).
- **source:** changes source API ("data" by "get")

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

- **jest-config:** transform js files with ts-jest ([943b3e4](https://github.com/frontity/frontity/commit/943b3e4))
