const { spawn } = require("child-process-promise");

(async () => {
  try {
    await spawn("docker-compose", ["up", "-d"], {
      stdio: "inherit",
    });

    // Wait until server is ready.
    await spawn("npx", ["wait-on", "http-get://localhost:8080"], {
      stdio: "inherit",
    });

    await spawn(
      "docker-compose",
      [
        "run",
        "wpcli",
        "wp", // this is the reference to the volume (we have wp, wpcli, and msql)
        "core",
        "install",
        "--url=example.com",
        "--title=Example",
        "--admin_user=admin",
        "--admin_password=password",
        "--admin_email=info@example.com",
      ],
      {
        stdio: "inherit",
      }
    );

    // Change permissions to the wp-content folder so that we can install plugins and load content
    await spawn(
      "docker-compose",
      [
        "run",
        "wp", // this is the reference to the volume (we have wp, wpcli, and msql)
        "/bin/bash",
        "-c",
        "chown -R www-data:www-data /var/www/html/wp-content/plugins/ && \
         chown -R www-data:www-data /var/www/html/wp-content/uploads && \
         chown -R www-data:www-data /var/www/html/wp-content/ && \
         chmod 775 /var/www/html/wp-content/plugins && \
         chmod 775 /var/www/html/wp-content/uploads && \
         chmod 775 /var/www/html/wp-content/",
      ],
      { stdio: "inherit" }
    );

    // Install plugins.
    await spawn(
      "docker-compose",
      [
        "run",
        "--user", // https://hub.docker.com/_/wordpress/ See: "Running as arbitrary user"
        "33:33",
        "wpcli", // this is the reference to the volume (we have wp, wpcli, and msql)
        "wp",
        "plugin",
        "install",
        "all-in-one-seo-pack",
        "--activate",
      ],
      {
        stdio: "inherit",
      }
    );
  } catch (err) {
    console.error(err);

    // We need to return the exit code so that the github action returns a fail
    process.exit(1);
  }
})();
