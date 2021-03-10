const rootConfig = require("../../jest.config.js");
module.exports = {
  ...rootConfig,
  snapshotSerializers: ["@emotion/jest/serializer"],
};
