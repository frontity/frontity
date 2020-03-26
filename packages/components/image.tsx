/* eslint-disable jsx-a11y/alt-text */

import React from "react";
import { Head, connect } from "frontity";
import { Connect, Package } from "frontity/types";
import { useInView } from "react-intersection-observer";

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

export interface Props {
  src?: string;
  srcSet?: string;
  sizes?: string;
  alt?: string;
  className?: string;
  rootMargin?: string;
  loading?: "lazy" | "eager";
  height?: number;
}

type Image = React.FC<Connect<Package, Props>>;

interface Attributes extends Props {
  "data-src"?: string;
  "data-srcset"?: string;
  style?: { visibility: "hidden" };
}

type NoScriptImage = React.FC<Attributes>;

interface ChangeAttributes {
  (attrs: Attributes): Attributes;
}

const changeAttributes: ChangeAttributes = (attrs) => {
  const attributes = { ...attrs };

  attributes.src = attributes["data-src"];
  attributes.srcSet = attributes["data-srcset"];
  delete attributes["data-src"];
  delete attributes["data-srcset"];
  delete attributes["style"];

  return attributes;
};

const NoScriptImage: NoScriptImage = (props) => {
  const attributes = { ...props };

  return (
    <noscript>
      <img {...attributes} />
    </noscript>
  );
};

const Image: Image = ({
  state,
  alt,
  src,
  srcSet,
  sizes,
  className,
  loading = "lazy",
  rootMargin,
  height,
}) => {
  // These are the attributes for the image when it's waiting to be loaded.
  const lazyAttributes: Attributes = {
    alt,
    "data-src": src,
    "data-srcset": srcSet,
    sizes,
    className: "frontity-lazy-image".concat(className ? ` ${className}` : ""),
    loading,
    style: { visibility: "hidden" },
    height,
  };
  // These are the attributes for the image when it's loaded.
  const eagerAttributes = changeAttributes(lazyAttributes);

  // Renders a simple image, either in server or client, without
  // lazyload, if the loading attribute is set to `eager`.
  if (loading === "eager") {
    return <img {...eagerAttributes} />;
  }

  // Delete the loading attribute if loading is "lazy"
  // but there is no height specified (see https://crbug.com/954323)
  if (loading === "lazy" && !(height > 0)) {
    delete eagerAttributes.loading;
    delete lazyAttributes.loading;
  }

  if (typeof window !== "undefined") {
    // Renders an image in client that will use IntersectionObserver to lazy load
    // if the native lazy load is not available,
    // or `height` prop is not provided.
    if (
      typeof IntersectionObserver !== "undefined" &&
      !("loading" in HTMLImageElement.prototype && height > 0)
    ) {
      const [ref, onScreen] = useInView({
        rootMargin: rootMargin,
        triggerOnce: true,
      });

      return (
        <>
          <NoScriptImage {...eagerAttributes} />
          <img ref={ref} {...(onScreen ? eagerAttributes : lazyAttributes)} />
        </>
      );
    }

    // Renders an image in client that will lazy load only if the native
    // lazy load is available, or load without lazy load otherwise.
    return (
      <>
        <NoScriptImage {...eagerAttributes} />
        <img
          {...(state.frontity.rendering === "csr"
            ? eagerAttributes
            : lazyAttributes)}
        />
      </>
    );
  }

  // Renders an image in the server ready to work without JS,
  // without IntersectionObserver or without Proxy.
  return (
    <>
      <Head
        script={[
          {
            id: "frontity-no-proxy-images",
            type: "text/javascript",
            innerHTML: noProxyScript,
          },
        ]}
        noscript={[
          {
            innerHTML: `<style id="frontity-no-js-images" type="text/css">${noJsStyles}</style>`,
          },
        ]}
      />
      <NoScriptImage {...eagerAttributes} />
      <img {...lazyAttributes} />
    </>
  );
};

export default connect(Image);
