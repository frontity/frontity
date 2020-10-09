import React, { useEffect } from "react";
import { css, connect, useConnect } from "frontity";
import SmartAdserver, { SmartAdProps } from "../../types";

/**
 * Params for the {@link styles} function.
 */
interface StylesParams {
  /**
   * CallType: "std" | "iframe".
   */
  callType: string;
  /**
   * Width of the ad. Used with callType 'iframe'.
   */
  width: number;
  /**
   * Height of the ad. Used with callType 'iframe'.
   */
  height: number;
  /**
   * Minimum height of the container for the ad. Used with callType 'std'.
   */
  minHeight: number;
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
const styles = ({ callType, width, height, minHeight }: StylesParams) =>
  callType === "iframe"
    ? css`
        width: ${width}px;
        height: ${height}px;
      `
    : minHeight &&
      css`
        min-height: ${minHeight}px;
      `;

/**
 * Component which makes the ad call for a particular ad and renders it.
 *
 * @param props - Defined in {@link CallOptions}.
 *
 * @returns The component which renders an ad.
 */
const SmartAd: React.FC<SmartAdProps> = ({
  callType,
  siteId,
  pageId,
  formatId,
  tagId,
  target,
  width,
  height,
  minHeight,
  css: styling,
  ...props
}) => {
  const { state } = useConnect<SmartAdserver>();
  const { isLoaded } = state.smartAdserver;

  // If the tagId was not passed as a prop, we fall back to the default used by
  // Smart Adserver.
  if (!tagId) {
    tagId = `sas_${formatId}`;
  }

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
  }, [
    isLoaded,
    callType,
    siteId,
    pageId,
    formatId,
    tagId,
    target,
    width,
    height,
  ]);

  return (
    <div
      id={tagId}
      css={[styles({ callType, width, height, minHeight }), styling]}
      {...props}
    />
  );
};

export default connect(SmartAd, { injectProps: false });
