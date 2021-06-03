import * as React from "react";
import { connect, useConnect } from "frontity";
import { Frontity } from "frontity/types";

/**
 * Props for the {@link Image} component.
 */
export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * CSS class(es).
   */
  className?: string;

  /**
   * The `rootMargin` of useInView.
   *
   * @deprecated This property was used in the previous version of the Image
   * component and has no effect anymore as the Image component relies only on
   * native lazy-loading.
   */
  rootMargin?: number;
}

/**
 * The Image component.
 *
 * @param props - Defined in {@link ImageProps}.
 * @returns A React component.
 */
const Image: React.FC<ImageProps> = ({
  loading = "lazy",
  className,
  width,
  height,
  alt,
  ...props
}) => {
  const { state } = useConnect<Frontity>();
  if (state.frontity.mode === "amp") {
    let layout = "fill";
    if (height && width) {
      layout = "responsive";
    }

    return (
      <amp-img
        alt={alt}
        class={className}
        width={width}
        height={height}
        layout={layout}
        {...props}
      />
    );
  }

  return (
    <img
      alt={alt}
      className={"frontity-lazy-image".concat(className ? ` ${className}` : "")}
      loading={loading}
      width={width}
      height={height}
      {...props}
    />
  );
};

export default connect(Image, { injectProps: false });
