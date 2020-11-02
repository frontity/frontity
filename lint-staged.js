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
    
/**
     * This script adds a linebreak before each TSDocs comment. Unnecessary
     * linebreaks and double linebreaks will be removed by prettier in the next
     * step.
     */
    await lintStaged({
      allowEmpty: true,
      config: {
        "*.{js,jsx,ts,tsx}": [
          'replace-in-files --string="
/**" --replacement="\n
/**"',
          "git add",
        ],
      },
    });

    
/**
     * Prettier.
     */
    await lintStaged({
      allowEmpty: true,
      config: {
        "*.{js,jsx,ts,tsx}": ["prettier --write", "git add"],
      },
    });

    
/**
     * Eslint.
     */
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
