/* eslint-disable */
const execa = require("execa");

module.exports = (on, config) => {
  on("task", {
    replaceDB(WP_INSTANCE) {
      (async () => {
        try {
          const command = `docker-compose -f ./${WP_INSTANCE}/docker-compose.yml exec -T db sh -c "mysql -u root -p password wordpress < ./${WP_INSTANCE}/data/dump.sql"`;

          await execa.command(command, { stdio: "inherit" });
        } catch (e) {
          console.error(e);
          process.exit(1);
        }
      })();

      // The cypress task HAS to return null or return a promise that resolves to null
      // otherwise it will fail
      return null;
    },
  });
};
