import React, { useEffect } from "react";
import { connect } from "frontity";
import { Connect, Package } from "frontity/types";

type ScriptType = React.FC<
  Connect<Package, { src?: string; code?: string; id?: string }>
>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Script: ScriptType = ({ state, ...props }) => {
  let script = null;
  const { src, code, id } = props;

  useEffect(() => {
    if (code) {
      return eval(code);
    }

    script = window.document.createElement("script");

    if (src) script.src = src;
    if (id) script.id = id;
    script.async = true;

    window.document.body.appendChild(script);

    return () => {
      if (script) window.document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default connect(Script);
