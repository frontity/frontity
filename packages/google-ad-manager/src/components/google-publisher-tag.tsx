import React from "react";
import GoogleAdManager from "../../types";

/**
 * Documented at {@link GoogleAdManager.libraries.googleAdManager.GooglePublisherTag}.
 *
 * @param props - Documented at {@link GoogleAdManager.libraries.googleAdManager.GooglePublisherTag}.
 * @returns React element.
 */
const GooglePublisherTag: GoogleAdManager["libraries"]["googleAdManager"]["GooglePublisherTag"] = ({
  unit,
  size,
  id,
  targeting = {},
  data,
}) => {
  // Generate the div ID.
  let divId = `${id}-${unit}`;

  /**
   * Append link if data is specified.
   *
   * This allows the same units to be rendered in the same slots but in
   * different pages showed at the same time, like in an infinite-scroll
   * layout, without conflicts.
   */
  if (data) divId = `${divId}-${data.link}`;

  // Set up the ad unit once the component has been mounted.
  React.useEffect(() => {
    window.googletag.cmd.push(function () {
      // Define the slot with the give properties.
      const slot = window.googletag
        .defineSlot(unit, size, divId)
        .addService(window.googletag.pubads());

      // Set targeting values if specified.
      Object.entries(targeting).forEach(([key, value]) =>
        slot.setTargeting(key, value)
      );

      // Show the ad unit.
      window.googletag.display(divId);
    });
  }, []);

  // Render the ad container.
  return <div id={divId} />;
};

export default GooglePublisherTag;
