import React from "react";
import { css } from "frontity";
import { Connect } from "frontity/types";
import GoogleAdManager, { GooglePublisherTagProps, Size } from "../../types";

/**
 * Documented at {@link GoogleAdManager.libraries.googleAdManager.GooglePublisherTag}.
 *
 * @param props - Documented at {@link GoogleAdManager.libraries.googleAdManager.GooglePublisherTag}.
 * @returns React element.
 */
const GooglePublisherTag: React.FC<Connect<
  GoogleAdManager,
  GooglePublisherTagProps
>> = ({ unit, size, id, targeting = {}, data }) => {
  /**
   * Append link if data is specified.
   *
   * This allows the same units to be rendered in the same slots but in
   * different pages showed at the same time, like in an infinite-scroll
   * layout, without conflicts.
   */
  if (data) id = `${id}-${data.link.replace(/[^\w]/g, "-")}`;

  // Set up the ad unit once the component has been mounted.
  React.useEffect(() => {
    window.googletag = window.googletag || { cmd: [] };

    window.googletag.cmd.push(function () {
      // Define the slot with the give properties.
      const slot = window.googletag
        .defineSlot(unit, size, id)
        .addService(window.googletag.pubads());

      // Set targeting values if specified.
      Object.entries(targeting).forEach(([key, value]) =>
        slot.setTargeting(key, value)
      );

      // Enables all GPT services.
      window.googletag.enableServices();

      // Show the ad unit.
      window.googletag.display(id);
    });
  }, []);

  /*
   * Get `minWidth` and `minHeight` from `size` prop to render the container
   * with minimum dimensions.
   */
  let minWidth: number, minHeight: number;
  if (typeof size[0] === "number") {
    [minWidth, minHeight] = size as Size;
  } else {
    minWidth = Math.min(...(size as Size[]).map(([width]) => width));
    minHeight = Math.min(...(size as Size[]).map(([_, height]) => height));
  }

  // Render the ad container.
  return (
    <div
      id={id}
      css={css`
        min-height: ${minWidth};
        min-width: ${minHeight};
      `}
    />
  );
};

export default GooglePublisherTag;
