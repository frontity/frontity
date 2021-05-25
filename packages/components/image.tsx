import * as React from "react";
import { connect, useConnect } from "frontity";
import { Frontity, Connect } from "frontity/types";

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
   * @deprecated This property was used.
   */
  rootMargin?: number;
}

/**
 * The Image component.
 *
 * @param props - Defined in {@link ImageProps}.
 * @returns A React component.
 */
const Image: React.FC<Connect<Frontity, ImageProps>> = ({
  loading = "lazy",
  className,
  alt,
  ...props
}) => {
  const { state } = useConnect<Frontity>();

  if (state.frontity.mode === "amp") {
    return <amp-img {...props} />;
  }

  return (
    <img
      alt={alt}
      className={"frontity-lazy-image".concat(className ? ` ${className}` : "")}
      loading={loading}
      {...props}
    />
  );
};

export default connect(Image, { injectProps: false });
