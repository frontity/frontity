const lintStaged = require("lint-staged");

/**
 * Run lint-staged programatically to catch the errors because we don't want
 * eslint errors to prevent the commit. Eslint will be checked again using a
 * GitHub action once the code is pushed.
 *
 * We use two separate lint-staged executions to prevent lint-staged from
 * reverting the prettier changes if eslint fails.
 */
(async () => {
  try {
    await lintStaged({
      allowEmpty: true,
      config: {
        "*.{js,jsx,ts,tsx}": ["prettier --write", "git add"],
      },
    });
    await lintStaged({
      allowEmpty: true,
      config: {
        "*.{js,jsx,ts,tsx}": ["eslint --fix", "git add"],
      },
    });
  } catch (e) {
    // Failed to load configuration.
    console.error(e);
  }
})();
