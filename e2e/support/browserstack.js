/**
 * Fix a problem running Jest's `expect` in Browserstack.
 *
 * Related issue: https://github.com/isaacs/node-graceful-fs/issues/204.
 */
const originalSetPrototypeOf = Object.setPrototypeOf;
Object.setPrototypeOf = function () {
  try {
    return originalSetPrototypeOf.apply(null, arguments);
  } catch (_error) {
    return console.error(_error);
  }
};
