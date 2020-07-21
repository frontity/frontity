const execa = require("execa");

/**
 * Install a plugin in the WP instance.
 *
 * @param name - Name of the plugin.
 *
 * @returns Promise that resolves when the plugin is installed.
 */
async function installPlugin(name) {
  // Install plugins.
  // https://github.com/docker-library/wordpress/issues/417#issuecomment-514360301
  return execa.command(
    `docker-compose run --rm wpcli wp plugin install ${name} --activate`,
    { stdio: "inherit" }
  );
}

module.exports = { installPlugin };
