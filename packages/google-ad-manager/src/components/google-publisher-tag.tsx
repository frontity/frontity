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
}) => {
  // Setup unit once the component has been mounted.
  React.useEffect(() => {
    window.googletag.cmd.push(function () {
      // Define the slot with the give properties.
      const slot = window.googletag
        .defineSlot(unit, size, id)
        .addService(window.googletag.pubads());

      // Set targeting values if specified.
      Object.entries(targeting).forEach(([key, value]) =>
        slot.setTargeting(key, value)
      );

      // Show the unit.
      window.googletag.display(id);
    });
  }, []);

  // Render the ad container.
  return <div id={id} />;
};

export default GooglePublisherTag;
