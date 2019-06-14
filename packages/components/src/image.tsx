import React from "react";
import { connect } from "frontity";
import { Connect, Package } from "frontity/types";
import useInView from "./hooks/inview";

interface Props {
  id?: number;
  alt?: string;
  src?: string;
  srcSet?: string;
  className?: string;
  loading?: "auto" | "lazy" | "eager";
}

type Image = React.FC<Connect<Package, Props>>;

const Image: Image = ({ id, alt, src, srcSet, loading, className, state }) => {
  const props: {
    alt?: string;
    src?: string;
    srcSet?: string;
    "data-src"?: string;
    "data-srcset"?: string;
    className?: string;
    loading?: "auto" | "lazy" | "eager";
    style?: { visibility: "hidden" };
  } = {
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
    const [onScreen, ref] = useInView();

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

// if (id) {
//   const media = state.source.attachment[id];

//   if (media) {
//     props.alt = media.title.rendered;
//     props.src = media.source_url;
//     props.srcSet = Object.values(media.media_details.sizes)
//       // Get the url and width of each size.
//       .map((item: { source_url: string; width: number }) => [
//         item.source_url,
//         item.width
//       ])
//       // Recude them to a string with the format required by `srcset`.
//       .reduce(
//         (final, current, index, array) =>
//           final.concat(
//             `${current.join(" ")}w${index !== array.length - 1 ? ", " : ""}`
//           ),
//         ""
//       );
//   }
// }
