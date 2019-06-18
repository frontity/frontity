import React from "react";
import { connect, Head } from "frontity";
import { Connect, Package } from "frontity/types";
import useInView from "../hooks/in-view";

// Hides any image rendered by this component that is not
// inside a <noscript> when JS is disabled.
const noJsStyles = `
  :not(noscript) > .frontity-lazy-image {
    display: none;
  }
`;

// Finds all the images rendered by this component and maps
// their `data-src` and `data-srcset` attributes to `src` and `srcset`
// when the browser doesn't support Proxy or IntersectionObserver.
const noProxyScript = `
  if (typeof window !== "undefined" && (!("Proxy" in window) || !("IntersectionObserver" in window))) {
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

interface ChangeAttributes {
  (props: Attributes);
}

const changeAttributes: ChangeAttributes = attributes => {
  attributes.src = attributes["data-src"];
  attributes.srcSet = attributes["data-srcset"];
  delete attributes["data-src"];
  delete attributes["data-srcset"];
  delete attributes["style"];
};

const NoScriptImage: NoScriptImage = props => {
  const attributes = { ...props };

  changeAttributes(attributes);

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

  if (typeof window !== "undefined") {
    if (typeof (HTMLImageElement as any).prototype.loading !== "undefined") {
      changeAttributes(attributes);
      return <img {...attributes} />;
    }

    if (typeof IntersectionObserver !== "undefined") {
      const [onScreen, ref] = useInView({ onlyOnce: true });
      if (onScreen) changeAttributes(attributes);
      return (
        <>
          <NoScriptImage {...attributes} />
          <img ref={ref} {...attributes} />
        </>
      );
    }
  }

  return (
    <>
      <Head
        script={[
          {
            id: "frontity-no-proxy-images",
            type: "text/javascript",
            innerHTML: noProxyScript
          }
        ]}
        noscript={[
          {
            innerHTML: `<style id="frontity-no-js-images" type="text/css">${noJsStyles}</style>`
          }
        ]}
      />
      <NoScriptImage {...attributes} />
      <img {...attributes} suppressHydrationWarning={true} />
    </>
  );
};

export default connect(Image);
