#!/usr/bin/env node
const execa = require("execa");

(async () => {
  // We have to make sure that we are runnng inside of the e2e directory The
  // script assumes that files are relative to this location.
  process.chdir(__dirname);

  console.log(`\nResetting the database.\n`);

  await execa.command(
    "docker-compose exec -T db mysql -uroot -ppassword wordpress < ./data/default-db.sql",
    {
      stdio: "inherit",
      shell: true,
    }
  );
})();
