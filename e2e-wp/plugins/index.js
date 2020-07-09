/* eslint-disable */

module.exports = (on, config) => {
  on("task", {
    replaceDb() {
      console.log("replacing db");
    },
  });
};
