import TestRenderer, { act } from "react-test-renderer";
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

  test("Should render the SmartAd component", async () => {
    const state = getState();

    let smartAd: any;
    await act(() => {
      smartAd = TestRenderer.create(
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
      );
    });

    expect(smartAd).toMatchInlineSnapshot(`
      <div
        className="css-12102i0-SmartAd"
        id="test-smartad"
      />
    `);
  });
});
