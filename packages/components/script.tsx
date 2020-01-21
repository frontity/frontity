import React, { useEffect } from "react";
import { connect } from "frontity";
import { Connect, Package } from "frontity/types";

type ScriptType = React.FC<
  Connect<Package, { src?: string; code?: string; dataId?: string }>
>;

const Script: ScriptType = ({ state, ...props }) => {
  let script = null;
  const { src, code, dataId } = props;

  useEffect(() => {
    if (state.frontity.rendering === "csr") {
      script = window.document.createElement("script");

      if (src) script.src = src;
      if (code) eval(code);
      if (dataId) script.id = dataId;

      script.async = true;
      script.charset = "utf-8";

      window.document.body.appendChild(script);
    }

    return () => {
      if (script) window.document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default connect(Script);
