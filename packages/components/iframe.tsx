import React from "react";
import { connect } from "frontity";
import { Connect, Package } from "frontity/types";

interface Props {
  src?: string;
  title?: string;
  width?: string;
  height?: string;
  id?: string;
}

type Component = React.FC<Connect<Package, Props>>;

// WIP
const Iframe: Component = ({ state, ...props }) => {
  const { src, title, width, height, id } = props;

  return (
    <iframe src={src} title={title} width={width} height={height} id={id} />
  );
};

export default connect(Iframe);
