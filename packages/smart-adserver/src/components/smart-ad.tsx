import React from "react";
import { css } from "frontity";
import { CallOptions } from "../../types";

/**
 *
 */
interface SmartAdProps extends CallOptions {
  /**
   *
   */
  target: string;
}

/**
 *
 * @param props - Defined in {@link SmartAdProps}.
 *
 * @returns A placeholder for an ad.
 */
const SmartAd: React.FC<SmartAdProps> = ({
  siteId,
  pageId,
  formatId,
  tagId,
  target,
  width,
  height,
}) => {
  React.useEffect(() => {
    const sas = window.sas || (window.sas = { cmd: [] });
    sas.cmd.push(function () {
      sas.call("std", {
        siteId,
        pageId,
        formatId,
        target,
        width,
        height,
        tagId,
      });
    });
  }, []);

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

export default SmartAd;
