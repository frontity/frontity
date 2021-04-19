import { commonConfig } from "./common.conf.js";

const { ...rest } = commonConfig;

exports.config = {
  ...rest,
  specs: ["./selenium/tests/specs/module/*.spec.js"],
  exclude: [
    "./selenium/tests/specs/module/use-in-view.spec.js",
    "./selenium/tests/specs/module/smart-adserver.spec.js",
  ],
  maxInstances: 1,
  commonCapabilities: {
    build:
      "Selenium Proxy Browsers - : " +
      (process.env.BROWSERSTACK_BUILD_NAME ||
        "Localhost - " + new Date().toISOString()),
    "browserstack.local": true,
    "browserstack.video": false,
    "browserstack.localIdentifier":
      process.env.BROWSERSTACK_LOCAL_IDENTIFIER || "Selenium-Local",
  },
  capabilities: [
    // Chrome - Between 49 and 60
    {
      os: "Windows",
      os_version: "10",
      browserName: "Chrome",
      browser_version: "60.0",
    },
    {
      os: "Windows",
      os_version: "XP",
      browserName: "Chrome",
      browser_version: "49.0",
    },
    {
      os: "OS X",
      os_version: "Mojave",
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
      browser_version: "40.0",
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
      browser_version: "40.0",
    },
    // Edge - Between 12 and 15
    {
      os: "Windows",
      os_version: "10",
      browserName: "Edge",
      browser_version: "15.0",
    },
  ],
};
// Code to support common capabilities
exports.config.capabilities.forEach(function (caps) {
  Object.assign(caps, exports.config.commonCapabilities);
});
