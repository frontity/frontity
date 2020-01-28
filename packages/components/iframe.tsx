import React from "react";
import { connect, Head } from "frontity";
import { Connect, Package } from "frontity/types";
import { useInView } from "react-intersection-observer";

// TODO: Review and Refactor;

const noJsStyles = `
  :non(noscript) > .frontity-lazy-iframe {
    display: none;
  }
`;

// No Proxy === No Frontity
const noProxyScript = `
  if (!("Proxy" in window) || !("IntersectionObserver" in window)) {
    document.addEventListener("DOMContentLoaded", () => {
      let iframes = document.querySelectorAll("img.frontity-lazy-iframe");

      iframes.forEach(iframe => {
         iframe.setAttribute("src", iframe.getAttribute("data-src"));

        iframe.removeAttribute("data-src");
        iframe.removeAttribute("style");
      });
    });
  }
`;

interface Props {
  src: string;
  title: string;
  width?: number;
  height?: number;
  id?: string;
  className?: string;
  rootMargin?: string;
  loading?: "auto" | "lazy" | "eager";
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

  console.log("Condition 1");

  return (
    <noscript>
      <iframe {...attributes} />
    </noscript>
  );
};

// WIP
const Iframe: Component = ({ state, ...props }) => {
  const {
    src,
    title,
    width,
    height,
    id,
    className,
    loading = "lazy",
    rootMargin
  } = props;

  const lazyAttributes: Attributes = {
    "data-src": src,
    className: "frontity-lazy-iframe".concat(className ? `${className}` : ""),
    loading,
    style: { visibility: "hidden" },
    height,
    width,
    title,
    id
  };
  const eagerAttributes = changeAttributes(lazyAttributes);

  if (loading === "eager") {
    console.log("Condition 2");
    return <img {...eagerAttributes} />;
  }

  if (typeof window !== undefined) {
    if (
      typeof IntersectionObserver !== "undefined" &&
      !("loading" in HTMLIFrameElement.prototype)
    ) {
      const [ref, inView] = useInView({
        rootMargin: rootMargin,
        triggerOnce: true
      });

      console.log("Condition 3");

      return (
        <>
          <NoScriptIframe {...eagerAttributes} />
          <iframe ref={ref} {...(inView ? eagerAttributes : lazyAttributes)} />
        </>
      );
    }

    console.log("Condition 4");

    return (
      <>
        <NoScriptIframe {...eagerAttributes} />
        <iframe
          {...(state.frontity.rendering === "csr"
            ? eagerAttributes
            : lazyAttributes)}
          suppressHydrationWarning
        />
      </>
    );
  }

  console.log("Condition 5");

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
      <img {...lazyAttributes} />
    </>
  );
};

export default connect(Iframe);
