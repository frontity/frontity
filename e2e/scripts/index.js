const { spawn } = require("child-process-promise");

(async () => {
  try {
    await spawn("docker-compose", ["up", "-d"]);

    // Wait until server is ready.
    await spawn("npx", ["wait-on", "http-get://localhost:8080"]);

    // Change permissions to the wp-content folder because volumes have root
    // permissions by default.
    await spawn("docker-compose", [
      "run",
      "wp",
      "/bin/bash",
      "-c",
      "chown -R www-data:www-data /var/www/html/wp-content/",
    ]);

    // Install plugins.
    await spawn("docker-compose", [
      "run",
      "--user",
      "33:33",
      "--rm",
      "wpcli",
      "plugin",
      "install",
      "wordpress-seo --version=12.6",
      "all-in-one-seo-pack",
    ]);
  } catch (err) {
    console.error(err);

    // We need to return the exit code so that the github action returns a fail
    process.exit(1);
  }
})();
