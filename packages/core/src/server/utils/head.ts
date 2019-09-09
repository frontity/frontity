import { HelmetData } from "@frontity/types";
import { HeadTags } from "../../../types";

export default (helmet: HelmetData): HeadTags => {
  return {
    base: helmet.base.toString(),
    bodyAttributes: helmet.bodyAttributes.toString(),
    htmlAttributes: helmet.htmlAttributes.toString(),
    link: helmet.link.toString(),
    meta: helmet.meta.toString(),
    noscript: helmet.noscript.toString(),
    script: helmet.script.toString(),
    style: helmet.style.toString(),
    title: helmet.title.toString()
  };
};
