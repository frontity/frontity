import { Package } from "frontity/types";

interface Html2React extends Package {
  name: "@frontity/html2react";
  libraries: {
    html2react: {
      add?: Function;
      parse: Function;
      processors?: Function;
      Component: React.FunctionComponent<{ html: string }>;
    };
  };
}

export default Html2React;
