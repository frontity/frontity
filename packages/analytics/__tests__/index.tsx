import { createStore } from "frontity";
import analytics from "../src";

describe("analytics.sendPageview", () => {
  test("runs all 'sendPageview' from other analytics packages", () => {
    const pkg1SendPageview = jest.fn();
    const pkg2SendPageview = jest.fn();

    const mergedPackages = {
      state: {
        analytics: {
          namespaces: ["pkg1Analytics", "pkg2Analytics"]
        }
      },
      actions: {
        ...analytics.actions,
        pkg1Analytics: {
          sendPageview: () => pkg1SendPageview
        },
        pkg2Analytics: {
          sendPageview: () => pkg2SendPageview
        }
      }
    };

    const { actions } = createStore(mergedPackages);

    const pageview = {
      page: "/some/page",
      title: "Some Title - My Site"
    };

    actions.analytics.sendPageview(pageview);

    expect(pkg1SendPageview).toHaveBeenCalledWith(pageview);
    expect(pkg1SendPageview).toHaveBeenCalledTimes(1);
    expect(pkg2SendPageview).toHaveBeenCalledWith(pageview);
    expect(pkg2SendPageview).toHaveBeenCalledTimes(1);
  });
});

describe("analytics.sendEvent", () => {
  test("runs all 'sendEvent' from other analytics packages", () => {
    const pkg1Event = jest.fn();
    const pkg2Event = jest.fn();

    const mergedPackages = {
      state: {
        analytics: {
          namespaces: ["pkg1Analytics", "pkg2Analytics"]
        }
      },
      actions: {
        ...analytics.actions,
        pkg1Analytics: {
          sendEvent: () => pkg1Event
        },
        pkg2Analytics: {
          sendEvent: () => pkg2Event
        }
      }
    };

    const { actions } = createStore(mergedPackages);

    const event = {
      category: "post",
      action: "scroll"
    };

    actions.analytics.sendEvent(event);

    expect(pkg1Event).toHaveBeenCalledWith(event);
    expect(pkg1Event).toHaveBeenCalledTimes(1);
    expect(pkg2Event).toHaveBeenCalledWith(event);
    expect(pkg2Event).toHaveBeenCalledTimes(1);
  });
});
