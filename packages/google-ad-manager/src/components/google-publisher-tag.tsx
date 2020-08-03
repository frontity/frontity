import React from "react";
import { css, connect } from "frontity";
import { Connect } from "frontity/types";
import { Packages, GooglePublisherTagProps, Size } from "../../types";

/**
 * Documented at {@link GoogleAdManager.libraries.googleAdManager.GooglePublisherTag}.
 *
 * @param props - Documented at {@link GoogleAdManager.libraries.googleAdManager.GooglePublisherTag}.
 * @returns React element.
 */
const GooglePublisherTag: React.FC<Connect<
  Packages,
  GooglePublisherTagProps
>> = ({ unit, size, id, targeting = {}, data, state }) => {
  /**
   * Append link if data is specified.
   *
   * This allows the same units to be rendered in the same slots but in
   * different pages showed at the same time, like in an infinite-scroll
   * layout, without conflicts.
   */
  if (data) {
    const { pathname } = new URL(data.link, "http://example.org");
    id = `${id}${pathname.replace(/\//g, "_").replace(/_?$/, "")}`;
  }

  // Create a ref to store the slot.
  const slot = React.useRef<googletag.Slot>(null);

  // Set up the ad unit once the component has been mounted.
  React.useEffect(() => {
    window.googletag =
      window.googletag || (({ cmd: [] } as unknown) as googletag.Googletag);

    window.googletag.cmd.push(() => {
      // Remove slot if already defined.
      if (slot.current) window.googletag.destroySlots([slot.current]);

      // Define the slot with the give properties.
      slot.current = window.googletag
        .defineSlot(unit, size, id)
        .addService(window.googletag.pubads());

      // Set targeting values if specified.
      Object.entries(targeting).forEach(([key, value]) =>
        slot.current.setTargeting(key, value)
      );

      // Enables all GPT services.
      window.googletag.enableServices();

      // Show the ad unit.
      window.googletag.display(id);
    });

    // Return cleanup function.
    return () => {
      // Destroy the slot created.
      if (slot.current)
        window.googletag.cmd.push(() => {
          window.googletag.destroySlots([slot.current]);
        });
    };
  }, [state.router.link]);

  // // Refresh the slot each time the link changes.
  // React.useEffect(() => {
  //   if (slot.current)
  //     window.googletag.cmd.push(() => {
  //       window.googletag.pubads().refresh([slot.current]);
  //     });
  // }, [state.router.link]);

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
        min-width: ${minWidth}px;
        min-height: ${minHeight}px;
      `}
    />
  );
};

export default connect(GooglePublisherTag);
