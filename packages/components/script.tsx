import React from 'react';
import { connect } from 'frontity';
import { Connect, Package } from 'frontity/types';

type ScriptType = React.FC<Connect<Package, object>>;

const Script: ScriptType  = ({ state, actions, libraries, ...props }) => {
  if (state.frontity.rendering === "csr") {
    const script = window.document.createElement('script');
    script.src = props.src;
    script.async = true;
    script.charset = 'utf-8';


    window.document.body.appendChild(script)
  }
  
  return <script async {...props} />
};

export default connect(Script);