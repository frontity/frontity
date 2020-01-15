import { sendPageview, sendEvent, afterCSR } from "@frontity/analytics";
import { Analytics } from "@frontity/analytics/types";

const googleAnalytics: Analytics = {
  actions: {
    analytics: {
      sendPageview,
      sendEvent,
      afterCSR
    }
  },
  libraries: {
    analytics: {
      ga: {
        sendPageview: pageview => {
          // Do something with that pageview.
          console.log(pageview);
        },
        sendEvent: event => {
          // Do something with that event.
          console.log(event);
        }
      }
    }
  }
};

export default googleAnalytics;
