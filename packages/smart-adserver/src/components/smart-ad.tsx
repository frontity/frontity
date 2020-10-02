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
 * Create styles for the iframe ad.
 *
 * @param callType - Type of call: "iframe" | "std".
 * @param width - Width in px.
 * @param height - Height in px.
 *
 * @returns The styles.
 */
const styles = (callType, width, height) =>
  callType === "iframe"
    ? css`
        width: ${width}px;
        height: ${height}px;
      `
    : css``;

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
  const { isLoaded } = state.smartAdserver;

  useEffect(() => {
    // If true, it means that `setup()` of the SmartAdserver has been called.
    if (isLoaded) {
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
  }, [isLoaded]);

  return <div id={tagId} css={styles(callType, width, height)} />;
};

export default connect(SmartAd);
