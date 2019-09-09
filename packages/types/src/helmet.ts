// Helmet types, from "react-helmet".
// We lost access to the types when we switched to react-helmet-async.
interface HelmetDatum {
  toString(): string;
  toComponent(): React.Component<any>;
}
interface HelmetHTMLBodyDatum {
  toString(): string;
  toComponent(): React.HTMLAttributes<HTMLBodyElement>;
}
interface HelmetHTMLElementDatum {
  toString(): string;
  toComponent(): React.HTMLAttributes<HTMLElement>;
}
export interface HelmetData {
  base: HelmetDatum;
  bodyAttributes: HelmetHTMLBodyDatum;
  htmlAttributes: HelmetHTMLElementDatum;
  link: HelmetDatum;
  meta: HelmetDatum;
  noscript: HelmetDatum;
  script: HelmetDatum;
  style: HelmetDatum;
  title: HelmetDatum;
  titleAttributes: HelmetDatum;
}

export interface HelmetContext {
  helmet?: HelmetData;
}
