/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
import { connect, Head } from "frontity";
import { Connect, Package } from "frontity/types";
import { useInView } from "react-intersection-observer";

const noJsStyles = `
  :non(noscript) > .frontity-lazy-iframe {
    display: none;
  }
`;

const noProxyScript = `
  if (typeof window !== "undefined" && (!("Proxy" in window) || !("IntersectionObserver" in window))) {
    document.addEventListener("DOMContentLoaded", function() {
      var iframes = document.querySelectorAll("iframe.frontity-lazy-iframe");
      for (i = 0; i < iframes.length; ++i) {
        var iframe = iframes[i];
        iframe.setAttribute("src", iframe.getAttribute("data-src"));
        iframe.removeAttribute("data-src");
        iframe.removeAttribute("style");
      }
    });
  }
`;

interface Props {
  title: string;
  src?: string;
  width?: number;
  height?: number;
  className?: string;
  rootMargin?: string;
  loading?: "lazy" | "eager";
}

type Component = React.FC<Connect<Package, Props>>;

interface Attributes extends Props {
  "data-src"?: string;
  style?: { visibility: "hidden" };
}

type NoScriptIframe = React.FC<Attributes>;

interface ChangeAttributes {
  (attrs: Attributes): Attributes;
}

const changeAttributes: ChangeAttributes = attrs => {
  const attributes = { ...attrs };

  attributes.src = attributes["data-src"];

  delete attributes["data-src"];
  delete attributes["style"];

  return attributes;
};

const NoScriptIframe: NoScriptIframe = props => {
  const attributes = { ...props };

  return (
    <noscript>
      <iframe {...attributes} />
    </noscript>
  );
};

const Iframe: Component = ({
  state,
  src,
  title,
  width,
  height,
  className,
  loading = "lazy",
  rootMargin
}) => {
  const lazyAttributes: Attributes = {
    "data-src": src,
    className: "frontity-lazy-iframe".concat(className ? ` ${className}` : ""),
    loading,
    style: { visibility: "hidden" },
    height,
    width,
    title
  };
  const eagerAttributes = changeAttributes(lazyAttributes);

  if (loading === "eager") return <iframe {...eagerAttributes} />;

  if (typeof window !== "undefined") {
    if (
      typeof IntersectionObserver !== "undefined" &&
      !("loading" in HTMLIFrameElement.prototype && height > 0)
    ) {
      const [ref, inView] = useInView({
        rootMargin,
        triggerOnce: true
      });

      return (
        <>
          <NoScriptIframe {...eagerAttributes} />
          <iframe ref={ref} {...(inView ? eagerAttributes : lazyAttributes)} />
        </>
      );
    }

    return (
      <>
        <NoScriptIframe {...eagerAttributes} />
        <iframe
          {...(state.frontity.rendering === "csr"
            ? eagerAttributes
            : lazyAttributes)}
        />
      </>
    );
  }

  return (
    <>
      <Head
        script={[
          {
            id: "frontity-no-proxy-iframe",
            type: "text/javascript",
            innerHTML: noProxyScript
          }
        ]}
        noscript={[
          {
            innerHTML: `<style id="frontity-no-js-iframes" type="text/css">${noJsStyles}</style>`
          }
        ]}
      />
      <NoScriptIframe {...eagerAttributes} />
      <iframe {...lazyAttributes} />
    </>
  );
};

export default connect(Iframe);
