import React, { useEffect } from "react";
import { css, connect } from "frontity";
import SmartAdserver, { CallOptions } from "../../types";
import { Connect } from "frontity/types";

/**
 * Props for the {@link SmartAd} component.
 */
interface SmartAdProps extends CallOptions {
  /**
   * The type of the ad call.
   */
  callType: "iframe" | "std";
}

/**
 *
 * Component which makes the call for a particular ad and renders it.
 *
 * @param props - Defined in {@link CallOptions}.
 *
 * @returns The component which renders an ad.
 */
const SmartAd: React.FC<Connect<SmartAdserver> & SmartAdProps> = ({
  callType,
  siteId,
  pageId,
  formatId,
  tagId,
  target,
  width,
  height,
  state,
}) => {
  // Get the reference to window.sas
  const { sas } = state.smartAdserver;

  useEffect(() => {
    // If it exists, it means that `setup()` of the SmartAdserver has been called.
    if (sas) {
      window.sas.cmd.push(function () {
        window.sas.call(callType, {
          siteId,
          pageId,
          formatId,
          target,
          width,
          height,
          tagId,
        });
      });
    }
  }, [sas]);

  return (
    <div
      id={tagId}
      css={css`
        width: ${width}px;
        height: ${height}px;
      `}
    />
  );
};

export default connect(SmartAd);
