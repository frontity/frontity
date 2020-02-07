import { Decode } from "../../types";

const decode: Decode = text => {
  // We find all the leading whitespace
  const whitespaceMatch = text.match(/^[ \t]+/);
  const whitespace = whitespaceMatch ? whitespaceMatch[0] : "";
  const doc = new DOMParser().parseFromString(text, "text/html");

  // And restore it in the result, because DOMParser will strip it out
  return whitespace + doc.documentElement.textContent;
};

export default decode;
