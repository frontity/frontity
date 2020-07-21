const execa = require("execa");

// The name of the WP instance will be available as an env variable
const { WP_INSTANCE } = process.env;

/**
 * Install a plugin in the WP instance.
 *
 * @param name - Name of the plugin.
 */
async function installPlugin(name) {
  // Install plugins.
  // https://github.com/docker-library/wordpress/issues/417#issuecomment-514360301
  await execa.command(
    `docker run -i --rm --user 33 \
    --volumes-from ${WP_INSTANCE}_wp_1 \
    --network container:${WP_INSTANCE}_wp_1 \
    wordpress:cli wp plugin install ${name} --activate`,
    { stdio: "inherit" }
  );
}

module.exports = { installPlugin };
