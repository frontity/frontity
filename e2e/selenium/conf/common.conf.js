require("dotenv").config();
const { Builder } = require("selenium-webdriver");

var userName = process.env.BROWSERSTACK_USERNAME;
var accessKey = process.env.BROWSERSTACK_ACCESS_KEY;
var browserstackURL =
  "https://" +
  userName +
  ":" +
  accessKey +
  "@hub-cloud.browserstack.com/wd/hub";
var baseUrl = "http://localhost:3000";

export const commonConfig = {
  user: userName,
  key: accessKey,
  updateJob: false,
  maxInstancesPerCapability: 1,
  logLevel: "warn",
  coloredLogs: true,
  screenshotPath: "./errorShots/",
  baseUrl: baseUrl,
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  specFileRetries: 3,
  host: "hub.browserstack.com",
  before: (capabilities) => {
    driver = new Builder()
      .usingServer(browserstackURL)
      .withCapabilities(capabilities)
      .build();
    global.expect = driver;
  },
  beforeSession: (config, capabilities) => {
    capabilities.browserName === "iPhone"
      ? (global.baseUrl = "http://bs-local.com:3000")
      : (global.baseUrl = "http://localhost:3000");
  },
  afterTest: async (test, context, result) => {
    let { passed, error } = result;
    !passed &&
      (await driver.executeScript(
        `browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "${
          error.name + ": " + error.message.replace(/\n/g, "")
        }"}}`
      ));
  },
  after: () => {
    driver.quit();
  },
  framework: "mocha",
  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },
};
