import React from "react";
import { Head } from "frontity";
import useInView from "@frontity/hooks/use-in-view";

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
    document.addEventListener("DOMContentLoaded", function() {
      var images = document.querySelectorAll("img.frontity-lazy-image");
      for (i = 0; i < images.length; ++i) {
        var image = images[i];
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
  sizes?: string;
  alt?: string;
  className?: string;
  rootMargin?: string;
  loading?: "auto" | "lazy" | "eager";
}

type Image = React.FC<Props>;

interface Attributes extends Props {
  "data-src"?: string;
  "data-srcset"?: string;
  style?: { visibility: "hidden" };
}

type NoScriptImage = React.FC<Attributes>;

interface ChangeAttributes {
  (attributes: Attributes);
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

const Image: Image = props => {
  const attributes: Attributes = {
    alt: props.alt,
    "data-src": props.src,
    "data-srcset": props.srcSet,
    sizes: props.sizes,
    className: "frontity-lazy-image".concat(
      props.className ? ` ${props.className}` : ""
    ),
    loading: props.loading || "auto",
    style: { visibility: "hidden" }
  };

  if (props.loading === "eager") {
    changeAttributes(attributes);
    return <img {...attributes} />;
  }

  if (typeof window !== "undefined") {
    if (typeof (HTMLImageElement as any).prototype.loading !== "undefined") {
      changeAttributes(attributes);
      return <img {...attributes} />;
    }

    if (typeof IntersectionObserver !== "undefined") {
      const [onScreen, ref] = useInView({ rootMargin: props.rootMargin, onlyOnce: true });
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

export default Image;
