import React, { useEffect } from "react";
import { connect } from "frontity";
import { Connect, Package } from "frontity/types";

type ScriptType = React.FC<Connect<Package, { src: string }>>;

const Script: ScriptType = ({ state, ...props }) => {
  let script = null;
  const { src } = props;

  useEffect(() => {
    if (state.frontity.rendering === "csr") {
      script = window.document.createElement("script");

      script.src = src;
      script.async = true;
      script.charset = "utf-8";

      window.document.body.appendChild(script);
    }

    return () => {
      if (script) window.document.body.removeChild(script);
    };
  }, []);

  return <script async src={src} charSet="utf-8" />;
};

export default connect(Script);
