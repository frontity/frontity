/* eslint-disable jsx-a11y/iframe-has-title */
import * as React from "react";
import { useConnect, connect, Head } from "frontity";
import { Connect, Package } from "frontity/types";
import useInView from "@frontity/hooks/use-in-view";
import { Packages } from "../amp/types";

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

/**
 * The iframe type definitions.
 */
interface Props {
  /**
   * The iframe title.
   */
  title: string;

  /**
   * The iframe src.
   */
  src?: string;

  /**
   * The iframe width.
   */
  width?: number;

  /**
   * The iframe height.
   */
  height?: number;

  /**
   * The iframe classname.
   */
  className?: string;

  /**
   * The iframe rootMargin.
   */
  rootMargin?: string;

  /**
   * The iframe loading attribute.
   */
  loading?: "lazy" | "eager";
}

/**
 *  The type for the iframe component.
 */
type Component = React.FC<Connect<Package, Props>>;

/**
 * The Attributes types.
 */
interface Attributes extends Props {
  /**
   * The data-src attribute.
   */
  "data-src"?: string;

  /**
   * The optional style prop.
   */
  style?: {
    /**
     * The visibility attribute.
     */
    visibility: "hidden";
  };
}

/**
 * The NoScriptIframe component definition.
 */
type NoScriptIframe = React.FC<Attributes>;

/**
 * Interface for the ChangeAttributes function.
 */
interface ChangeAttributes {
  (attrs: Attributes): Attributes;
}

/**
 * Changes the iframe attributes for eager loading.
 *
 * @param attrs - Defined by {@link Attributes}.
 *
 * @returns The transformed attributes.
 */
const changeAttributes: ChangeAttributes = (attrs) => {
  const attributes = { ...attrs };

  attributes.src = attributes["data-src"];

  delete attributes["data-src"];
  delete attributes["style"];

  return attributes;
};

/**
 * Returns a iframe wrapped in noscript.
 *
 * @param props - Iframe props.
 *
 * @returns Noscript html element.
 */
const NoScriptIframe: NoScriptIframe = (props) => {
  const attributes = { ...props };

  return (
    <noscript>
      <iframe {...attributes} />
    </noscript>
  );
};

/**
 * The Iframe component used by the iframe processor.
 *
 * Under the hood, this component implements supports for the loaading attribute ("lazy" and "eager").
 *
 * @param props - Defined by {@link Props}.
 *
 * @returns An iframe element.
 */
const Iframe: Component = ({
  src,
  title,
  width,
  height,
  className,
  loading = "lazy",
  rootMargin,
  ...rest
}) => {
  const { state } = useConnect<Packages>();
  const lazyAttributes: Attributes = {
    "data-src": src,
    className: "frontity-lazy-iframe".concat(className ? ` ${className}` : ""),
    loading,
    style: { visibility: "hidden" },
    height,
    width,
    title,
    ...rest,
  };

  const eagerAttributes = changeAttributes(lazyAttributes);

  const { ref, inView, supported } = useInView({
    rootMargin,
    triggerOnce: true,
  });

  if (loading === "eager") return <iframe {...eagerAttributes} />;

  if (typeof window !== "undefined") {
    if (
      supported &&
      !("loading" in HTMLIFrameElement.prototype && height > 0)
    ) {
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
            innerHTML: noProxyScript,
          },
        ]}
        noscript={[
          {
            innerHTML: `<style id="frontity-no-js-iframes" type="text/css">${noJsStyles}</style>`,
          },
        ]}
      />
      <NoScriptIframe {...eagerAttributes} />
      <iframe {...lazyAttributes} />
    </>
  );
};

export default connect(Iframe, { injectProps: false });
