#!/usr/bin/env node
const execa = require("execa");
const argv = require("minimist")(process.argv.slice(2));

(async () => {
  // We have to make sure that we are runnng inside of the e2e directory The
  // script assumes that files are relative to this location.
  process.chdir(__dirname);

  // The path specified in the command invocation.
  const [path] = argv._;

  // Throw an error if the path is not provided.
  if (!path)
    throw new Error(
      "Please specify a path: 'node export-db.js ./folder/filename.sql'"
    );

  console.log(`\nExporting database to the "${path}" file.\n`);

  await execa.command(
    `docker-compose -f docker-compose.yml exec -T db sh -c exec mysqldump -uroot -ppassword wordpress"  > "${path}"`,
    {
      stdio: "inherit",
      shell: true,
    }
  );
})();
