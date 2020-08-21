#!/usr/bin/env node
const execa = require("execa");

(async () => {
  await execa.command(
    "docker-compose exec -T db mysqldump -uroot -ppassword wordpress",
    { stdio: "inherit" }
  );
})();
