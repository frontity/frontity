import { commonConfig } from "./common.conf.js";
const { ...rest } = commonConfig;

exports.config = {
  ...rest,
  specs: ["./selenium/tests/specs/module/*.spec.js"],
  exclude: ["./selenium/tests/specs/module/smart-adserver.spec.js"],
  maxInstances: 1,
  commonCapabilities: {
    build:
      "Selenium-module-" +
      (process.env.BROWSERSTACK_BUILD_NAME ||
        "localhost-" + new Date().toISOString()),
    "browserstack.video": false,
    "browserstack.local": true,
    "browserstack.localIdentifier":
      process.env.BROWSERSTACK_LOCAL_IDENTIFIER || "SeleniumLocalhost",
  },
  capabilities: [
    //Safari - Bigger than 10.1
    {
      browserName: "iPhone",
      device: "iPhone 12",
      os_version: "14",
      real_mobile: "true",
    },
    {
      os: "OS X",
      os_version: "Catalina",
      browserName: "Safari",
      browser_version: "13.1",
    },
    {
      os: "OS X",
      os_version: "High Sierra",
      browserName: "Safari",
      browser_version: "11.1",
      //We have to exclude use-in-view because interSectionObserver is not supported
      //until Safari 12.1
      exclude: [
        "./selenium/tests/specs/module/use-in-view.spec.js",
        "./selenium/tests/specs/module/smart-adserver.spec.js",
      ],
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
    // //Firefox - Bigger than 60
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
    // //Edge - Bigger than 16
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
  for (var i in exports.config.commonCapabilities)
    caps[i] = caps[i] || exports.config.commonCapabilities[i];
});
