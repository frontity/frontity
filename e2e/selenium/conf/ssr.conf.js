import { commonConfig } from "./common.conf.js";

const { ...rest } = commonConfig;

exports.config = {
  ...rest,
  specs: ["./selenium/tests/specs/ssr/*.spec.js"],
  exclude: [],
  maxInstances: 1,
  commonCapabilities: {
    "browserstack.local": true,
    "browserstack.localIdentifier":
      process.env.BROWSERSTACK_LOCAL_IDENTIFIER || "SeleniumLocalhost",
    "browserstack.video": false,
    build:
      "Selenium-ssr- " +
      (process.env.BROWSERSTACK_BUILD_NAME ||
        "localhost-" + new Date().toISOString()),
  },
  capabilities: [
    //Safari - Smaller than 9.1
    {
      os: "OS X",
      os_version: "El Capitan",
      browserName: "Safari",
      browser_version: "9.1",
    },
    {
      os: "OS X",
      os_version: "Snow Leopard",
      browserName: "Safari",
      browser_version: "5.1",
    },
    //Chrome - Smaller than 48
    {
      os: "Windows",
      os_version: "10",
      browserName: "Chrome",
      browser_version: "48.0",
    },
    {
      os: "Windows",
      os_version: "XP",
      browserName: "Chrome",
      browser_version: "14.0",
    },
    {
      os: "OS X",
      os_version: "Catalina",
      browserName: "Chrome",
      browser_version: "48.0",
    },
    {
      os: "OS X",
      os_version: "Snow Leopard",
      browserName: "Chrome",
      browser_version: "14.0",
    },
    //Firefox - Smaller than 17
    {
      os: "Windows",
      os_version: "8.1",
      browserName: "Firefox",
      browser_version: "17.0",
    },
    {
      os: "Windows",
      os_version: "XP",
      browserName: "Firefox",
      browser_version: "4.0",
    },
    {
      os: "OS X",
      os_version: "Catalina",
      browserName: "Firefox",
      browser_version: "17.0",
    },
    {
      os: "OS X",
      os_version: "Snow Leopard",
      browserName: "Firefox",
      browser_version: "4.0",
    },
    //Internet Explorer - IE9 - IE11
    {
      os: "Windows",
      os_version: "10",
      browserName: "IE",
      browser_version: "11.0",
    },
    {
      os: "Windows",
      os_version: "7",
      browserName: "IE",
      browser_version: "9.0",
    },
  ],
};
// Code to support common capabilities
exports.config.capabilities.forEach(function (caps) {
  Object.assign(caps, exports.config.commonCapabilities);
});
