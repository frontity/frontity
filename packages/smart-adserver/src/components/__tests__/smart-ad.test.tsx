import TestRenderer from "react-test-renderer";
import SmartAd from "../smart-ad";
import SmartAdserver from "../../../types";
import { State } from "frontity/types";
import { Provider as ConnectProvider } from "@frontity/connect";

describe("SmartAdserver", () => {
  const getState = (): State<SmartAdserver> => ({
    smartAdserver: {
      isLoaded: true,
    },
    fills: {
      smartAdserver: {},
    },
  });

  test("Should render the SmartAd component", () => {
    const state = getState();

    const smartAd = TestRenderer.create(
      <ConnectProvider value={{ state }}>
        <SmartAd
          callType="std"
          siteId={1}
          pageId={1}
          formatId={1}
          tagId="test-smartad"
          minHeight={200}
        />
      </ConnectProvider>
    ).toJSON();

    expect(smartAd).toMatchInlineSnapshot(`
      <div
        className="css-i4g53b"
        id="test-smartad"
      />
    `);
  });
});
