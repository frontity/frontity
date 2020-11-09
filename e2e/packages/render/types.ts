import { Package } from "frontity/types";
import Router from "@frontity/router/types";
import Source from "@frontity/source/types";

interface Render extends Package {
  roots: {
    render: React.ElementType;
  };
}

export type Packages = Render & Router & Source;

export default Render;
