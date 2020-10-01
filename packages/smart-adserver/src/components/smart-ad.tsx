import React, { useEffect } from "react";
import { css, connect } from "frontity";
import SmartAdserver, { CallOptions } from "../../types";
import { Connect } from "frontity/types";

/**
 *
 * Component which makes the call for a particular ad and renders it.
 *
 * @param props - Defined in {@link CallOptions}.
 *
 * @returns The component which renders an ad.
 */
const SmartAd: React.FC<Connect<SmartAdserver> & CallOptions> = ({
  siteId,
  pageId,
  formatId,
  tagId,
  target,
  width,
  height,
  state,
}) => {
  const { sas } = state.smartAdserver;

  useEffect(() => {
    if (sas) {
      window.sas.cmd.push(function () {
        window.sas.call("std", {
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
