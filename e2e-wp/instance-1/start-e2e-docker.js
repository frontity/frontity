#!/usr/bin/env node
const { spawn } = require("child-process-promise");
var waitOn = require("wait-on");

(async () => {
  try {
    await spawn("docker-compose", ["up", "-d"], {
      stdio: "inherit",
    });

    await waitOn({ resources: ["http-get://localhost:8080"], interval: 1000 });

    // Change permissions to the wp-content folder so that we can install plugins and load content
    await spawn(
      "docker-compose",
      [
        "exec",
        "-T", // Disable pseudo-tty allocation https://stackoverflow.com/a/57565119/2638310
        "wp", // this is the reference to the volume (we have wp, wpcli, and msql)
        "/bin/bash",
        "-c",
        "chown -R www-data:www-data /var/www/html/wp-content/plugins/ && \
         chown -R www-data:www-data /var/www/html/wp-content/uploads && \
         chown -R www-data:www-data /var/www/html/wp-content/ && \
         chmod -R 775 /var/www/html/wp-content/",
      ],
      { stdio: "inherit" }
    );

    await spawn(
      "docker-compose",
      [
        "run",
        "--user", // https://hub.docker.com/_/wordpress/ See: "Running as arbitrary user"
        "33:33",
        "wpcli", // this is the reference to the service (we have wp, wpcli, and msql)
        "wp",
        "core",
        "install",
        "--url=localhost:8080",
        "--title=Example",
        "--admin_user=admin",
        "--admin_password=password",
        "--admin_email=info@example.com",
      ],
      {
        stdio: "inherit",
      }
    );

    // Install plugins.
    await spawn(
      "docker-compose",
      [
        "run", // needs to be "run" and not "exec"
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
