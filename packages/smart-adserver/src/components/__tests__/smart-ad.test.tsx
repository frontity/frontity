import React from "react";
import TestRenderer from "react-test-renderer";
import { SmartAd } from "../smart-ad";
import SmartAdserver from "../../../types";
import { State } from "frontity/types";

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
      <SmartAd
        state={state}
        libraries={{
          fills: {
            smartAdserver: {
              SmartAd: function smartAd() {
                return <div> smart ad </div>;
              },
            },
          },
        }}
        actions={null}
        callType="std"
        siteId={1}
        pageId={1}
        formatId={1}
        tagId="test-smartad"
      />
    ).toJSON();

    expect(smartAd).toMatchInlineSnapshot(`
      <div
        css={
          Object {
            "map": undefined,
            "name": "0",
            "next": undefined,
            "styles": "",
            "toString": [Function],
          }
        }
        id="test-smartad"
      />
    `);
  });
});
