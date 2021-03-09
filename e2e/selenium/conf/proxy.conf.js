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
exports.config = {
  user: userName,
  key: accessKey,
  updateJob: false,
  specs: ["./selenium/tests/specs/module/*.spec.js"],
  exclude: ["./selenium/tests/specs/module/use-in-view.spec.js"],
  maxInstances: 1,
  commonCapabilities: {
    "browserstack.local": true,
    "browserstack.localIdentifier": "SeleniumLocalhost",
    "browserstack.use_w3c": true,
    "bstack:options": {
      buildName: "Proxy-tests",
      debug: true,
    },
  },
  capabilities: [
    //Chrome - Between 49 and 60
    {
      os: "Windows",
      os_version: "10",
      browserName: "Chrome",
      browser_version: "54.0",
    },
    {
      os: "Windows",
      os_version: "XP",
      browserName: "Chrome",
      browser_version: "49.0",
    },
    {
      os: "OS X",
      os_version: "Catalina",
      browserName: "Chrome",
      browser_version: "60.0",
    },
    {
      os: "OS X",
      os_version: "Snow Leopard",
      browserName: "Chrome",
      browser_version: "49.0",
    },
    // Firefox - Between 18 and 59
    {
      os: "Windows",
      os_version: "10",
      browserName: "Firefox",
      browser_version: "51.0",
    },
    {
      os: "Windows",
      os_version: "XP",
      browserName: "Firefox",
      browser_version: "18.0",
    },
    {
      os: "OS X",
      os_version: "Catalina",
      browserName: "Firefox",
      browser_version: "59.0",
    },
    {
      os: "OS X",
      os_version: "Snow Leopard",
      browserName: "Firefox",
      browser_version: "18.0",
    },
    // Edge - Between 12 and 15
    {
      os: "Windows",
      os_version: "10",
      browserName: "Edge",
      browser_version: "15.0",
    },
  ],
  logLevel: "warn",
  coloredLogs: true,
  screenshotPath: "./errorShots/",
  baseUrl: "",
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  host: "hub.browserstack.com",
  before: (capabilities) => {
    driver = new Builder()
      .usingServer(browserstackURL)
      .withCapabilities(capabilities)
      .build();
    global.expect = driver;
  },
  beforeSession: (config, capabilities, specs) => {
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
// Code to support common capabilities
exports.config.capabilities.forEach(function (caps) {
  Object.assign(caps, exports.config.commonCapabilities);
});
