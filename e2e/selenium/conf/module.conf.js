import { commonConfig } from "./common.conf.js";

const { ...rest } = commonConfig;

exports.config = {
  ...rest,
  specs: ["./selenium/tests/specs/module/*.spec.js"],
  exclude: [],
  commonCapabilities: {
    "browserstack.local": true,
    "browserstack.localIdentifier": "SeleniumLocalhost",
    "browserstack.use_w3c": true,
    "bstack:options": {
      buildName:
        "Selenium-module- " +
        (process.env.BROWSERSTACK_BUILD_NAME
          ? process.env.BROWSERSTACK_BUILD_NAME
          : "localhost" + new Date().toISOString()),
      debug: true,
    },
  },
  capabilities: [
    //Safari - Bigger than 10.1
    {
      device: "iPhone 12",
      os_version: "14",
      real_mobile: "true",
      browserName: "iPhone",
    },
    {
      os: "OS X",
      os_version: "Catalina",
      browserName: "Safari",
      browser_version: "13.1",
    },
    {
      os: "OS X",
      os_version: "Sierra",
      browserName: "Safari",
      browser_version: "10.1",
    },
    //Chrome - Bigger than 61
    {
      device: "Google Pixel 4",
      os_version: "11.0",
      real_mobile: true,
      browserName: "Android",
    },
    {
      os: "Windows",
      os_version: "10",
      browserName: "Chrome",
      browser_version: "latest-beta",
    },
    {
      os: "Windows",
      os_version: "7",
      browserName: "Chrome",
      browser_version: "61.0",
    },
    {
      os: "OS X",
      os_version: "Catalina",
      browserName: "Chrome",
      browser_version: "latest-beta",
    },
    {
      os: "OS X",
      os_version: "Mavericks",
      browserName: "Chrome",
      browser_version: "61.0",
    },
    //Firefox - Bigger than 60
    {
      os: "Windows",
      os_version: "10",
      browserName: "Firefox",
      browser_version: "latest-beta",
    },
    {
      os: "Windows",
      os_version: "7",
      browserName: "Firefox",
      browser_version: "60.0",
    },
    {
      os: "OS X",
      os_version: "Catalina",
      browserName: "Firefox",
      browser_version: "latest-beta",
    },
    {
      os: "OS X",
      os_version: "Mavericks",
      browserName: "Firefox",
      browser_version: "60.0",
    },
    //Edge - Bigger than 16
    {
      os: "Windows",
      os_version: "10",
      browserName: "Edge",
      browser_version: "latest-beta",
    },
    {
      os: "Windows",
      os_version: "10",
      browserName: "Edge",
      browser_version: "16.0",
    },
    {
      os: "OS X",
      os_version: "Catalina",
      browserName: "Edge",
      browser_version: "latest-beta",
    },
    {
      os: "OS X",
      os_version: "Sierra",
      browserName: "Edge",
      browser_version: "80.0",
    },
  ],
};
// Code to support common capabilities
exports.config.capabilities.forEach(function (caps) {
  Object.assign(caps, exports.config.commonCapabilities);
});
