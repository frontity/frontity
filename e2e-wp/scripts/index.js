const execa = require("execa");
const { resolve } = require("path");

/**
 * Install a plugin in the WP instance.
 *
 * @param WP_INSTANCE - The name of the WP instance.
 * @param name - Name of the plugin.
 * @returns Promise that resolves when the plugin is installed.
 */
async function installPlugin(WP_INSTANCE, name) {
  const composeFilePath = resolve(
    __dirname,
    "..",
    WP_INSTANCE,
    "docker-compose.yml"
  );

  // Install plugins.
  // https://github.com/docker-library/wordpress/issues/417#issuecomment-514360301
  return execa.command(
    `docker-compose -f ${composeFilePath} run --rm wpcli wp plugin install ${name} --activate`,
    { stdio: "inherit" }
  );
}

module.exports = { installPlugin };
