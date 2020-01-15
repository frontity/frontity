import React, { useRef, useEffect } from "react";
import { connect } from "frontity";
import { Connect, Package } from "frontity/types";

type ScriptType = React.FC<Connect<Package, { src: string }>>;

const generateId = () => Math.trunc(Math.random() * 9999999).toString();

const Script: ScriptType = ({ state, ...props }) => {
  const scriptId = useRef(generateId());
  const { src } = props;

  useEffect(() => {
    if (state.frontity.rendering === "csr") {
      const script = window.document.createElement("script");

      script.src = src;
      script.id = scriptId.current;
      script.async = true;
      script.charset = "utf-8";

      window.document.body.appendChild(script);
    }

    return () => {
      const script = document.getElementById(scriptId.current);
      window.document.body.removeChild(script);
    };
  }, []);

  return <script async src={src} charSet="utf-8" />;
};

export default connect(Script);
