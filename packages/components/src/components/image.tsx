import React from "react";
import { connect, Head } from "frontity";
import { Connect, Package } from "frontity/types";
import useInView from "../hooks/in-view";

// Removes the .no-js class from <html> when JS is enabled.
const noJsScript = `
  document.documentElement.classList.remove("no-js");
  if (!document.documentElement.classList.length) {
    document.documentElement.removeAttribute("class");
  }
`;

// Hides any image rendered by this component that is not
// inside a <noscript> when JS is disabled.
const noJsStyles = `
  .no-js :not(noscript) > .frontity-lazy-image {
    display: none;
  }
`;

// Finds all the images rendered by this component and maps
// their `data-src` and `data-srcset` attributes to `src` and `srcset`
// when the browser doesn't support Proxy.
const noProxyScript = `
  if (typeof window !== "undefined" && !("Proxy" in window)) {
    document.addEventListener("DOMContentLoaded", () => {
      const images = document.querySelectorAll("img.frontity-lazy-image");
      for (image of images) {
        image.setAttribute("src", image.getAttribute("data-src"));
        image.setAttribute("srcset", image.getAttribute("data-srcset"));
        image.removeAttribute("data-src");
        image.removeAttribute("data-srcset");
        image.removeAttribute("style");
      }
    });
  }
`;

interface Props {
  src?: string;
  srcSet?: string;
  alt?: string;
  className?: string;
  loading?: "auto" | "lazy" | "eager";
}
type Image = React.FC<Connect<Package, Props>>;

interface Attributes extends Props {
  "data-src"?: string;
  "data-srcset"?: string;
  style?: { visibility: "hidden" };
}

type NoScriptImage = React.FC<Attributes>;

const NoScriptImage: NoScriptImage = props => {
  const attributes = { ...props };

  attributes.src = attributes["data-src"];
  attributes.srcSet = attributes["data-srcset"];
  delete attributes["data-src"];
  delete attributes["data-srcset"];
  delete attributes.style;

  return (
    <noscript>
      <img {...attributes} />
    </noscript>
  );
};

const Image: Image = ({ src, srcSet, alt, loading, className }) => {
  const attributes: Attributes = {
    alt,
    "data-src": src,
    "data-srcset": srcSet,
    className: "frontity-lazy-image".concat(className ? ` ${className}` : ""),
    loading: loading || "auto",
    style: { visibility: "hidden" }
  };

  if (typeof window !== "undefined" && "loading" in HTMLImageElement.prototype)
    return <img {...attributes} />;

  if (typeof window !== "undefined" && "IntersectionObserver" in window) {
    const [onScreen, ref] = useInView({ onlyOnce: true });

    if (onScreen) {
      attributes.src = attributes["data-src"];
      delete attributes["data-src"];
      attributes.srcSet = attributes["data-srcset"];
      delete attributes["data-srcset"];
      delete attributes.style;
    }

    return (
      <>
        <NoScriptImage {...attributes} />
        <img ref={ref} {...attributes} />
      </>
    );
  }

  return (
    <>
      <Head
        htmlAttributes={{ class: "no-js" }}
        script={[
          {
            id: "frontity-no-js-images-script",
            type: "text/javascript",
            innerHTML: noJsScript
          },
          {
            id: "frontity-no-proxy-images",
            type: "text/javascript",
            innerHTML: noProxyScript
          }
        ]}
        style={[
          {
            id: "frontity-no-js-images-styles",
            type: "text/css",
            cssText: noJsStyles
          }
        ]}
      />
      <NoScriptImage {...attributes} />
      <img {...attributes} />
    </>
  );
};

export default connect(Image);
