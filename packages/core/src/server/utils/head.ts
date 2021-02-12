import { FilledContext } from "react-helmet-async";
import { HeadTags } from "../../../types";

export default (helmet: FilledContext["helmet"]): HeadTags => {
  return {
    bodyAttributes: helmet.bodyAttributes.toString(),
    htmlAttributes: helmet.htmlAttributes.toString(),
    head: [
      helmet.base.toString(),
      helmet.link.toString(),
      helmet.meta.toString(),
      helmet.noscript.toString(),
      helmet.script.toString(),
      helmet.style.toString(),
      helmet.title.toString(),
    ],
  };
};
