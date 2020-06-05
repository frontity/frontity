import { createStore } from "frontity";
import analytics from "../src";

describe("analytics.pageview", () => {
  test("runs all 'pageview' from other analytics packages", () => {
    const pkg1SendPageview = jest.fn();
    const pkg2SendPageview = jest.fn();
    const pkg3SendPageview = jest.fn();

    const mergedPackages = {
      state: {
        analytics: {
          pageviews: {
            pkg1Analytics: true,
            pkg2Analytics: true,
            pkg3Analytics: false,
          },
        },
      },
      actions: {
        ...analytics.actions,
        pkg1Analytics: {
          pageview: () => pkg1SendPageview,
        },
        pkg2Analytics: {
          pageview: () => pkg2SendPageview,
        },
        pkg3Analytics: {
          pageview: () => pkg3SendPageview,
        },
      },
    };

    const { actions } = createStore(mergedPackages);

    const pageview = {
      page: "/some/page",
      title: "Some Title - My Site",
    };

    actions.analytics.pageview(pageview);

    expect(pkg1SendPageview).toHaveBeenCalledWith(pageview);
    expect(pkg1SendPageview).toHaveBeenCalledTimes(1);
    expect(pkg2SendPageview).toHaveBeenCalledWith(pageview);
    expect(pkg2SendPageview).toHaveBeenCalledTimes(1);
    expect(pkg3SendPageview).not.toHaveBeenCalled();
  });
});

describe("analytics.event", () => {
  test("runs all 'event' from other analytics packages", () => {
    const pkg1Event = jest.fn();
    const pkg2Event = jest.fn();
    const pkg3Event = jest.fn();

    const mergedPackages = {
      state: {
        analytics: {
          events: {
            pkg1Analytics: true,
            pkg2Analytics: true,
            pkg3Analytics: false,
          },
        },
      },
      actions: {
        ...analytics.actions,
        pkg1Analytics: {
          event: () => pkg1Event,
        },
        pkg2Analytics: {
          event: () => pkg2Event,
        },
        pkg3Analytics: {
          event: () => pkg3Event,
        },
      },
    };

    const { actions } = createStore(mergedPackages);

    const event = {
      name: "some event",
      payload: {
        category: "post",
        action: "scroll",
      },
    };

    actions.analytics.event(event);

    expect(pkg1Event).toHaveBeenCalledWith(event);
    expect(pkg1Event).toHaveBeenCalledTimes(1);
    expect(pkg2Event).toHaveBeenCalledWith(event);
    expect(pkg2Event).toHaveBeenCalledTimes(1);
    expect(pkg3Event).not.toHaveBeenCalled();
  });
});
