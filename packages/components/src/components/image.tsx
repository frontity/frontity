import React from "react";
import { connect } from "frontity";
import { Connect, Package } from "frontity/types";
import useInView from "../hooks/in-view";

type Image = React.FC<
  Connect<
    Package,
    {
      src?: string;
      srcSet?: string;
      alt?: string;
      className?: string;
      loading?: "auto" | "lazy" | "eager";
    }
  >
>;

interface Props {
  alt?: string;
  src?: string;
  srcSet?: string;
  "data-src"?: string;
  "data-srcset"?: string;
  className?: string;
  loading?: "auto" | "lazy" | "eager";
  style?: { visibility: "hidden" };
}

const Image: Image = ({ src, srcSet, alt, loading, className }) => {
  const props: Props = {
    alt,
    "data-src": src,
    "data-srcset": srcSet,
    className,
    loading: loading || "auto",
    style: { visibility: "hidden" }
  };

  if (typeof window !== "undefined" && "loading" in HTMLImageElement.prototype)
    return <img {...props} />;

  if (typeof window !== "undefined" && "IntersectionObserver" in window) {
    const [onScreen, ref] = useInView({ onlyOnce: true });

    if (onScreen) {
      props.src = props["data-src"];
      delete props["data-src"];
      props.srcSet = props["data-srcset"];
      delete props["data-srcset"];
      delete props.style;
    }

    return <img ref={ref} {...props} />;
  }

  return <img {...props} />;
};

export default connect(Image);
